import Products from '../models/Products.mjs';

class ProductsController {
  async getAllProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;

      const totalProducts = await Products.countDocuments();
      const totalPages = Math.ceil(totalProducts / pageSize);

      const skip = (page - 1) * pageSize;
      const products = await Products.find({}).skip(skip).limit(pageSize);

      return res.status(200).json({
        success: true,
        message: 'Retrieve products data successfully!',
        products,
        currentPage: page,
        totalPages: totalPages,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getSingleProduct(req, res) {
    try {
      const product = await Products.findById(req.params._id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'Product found', product });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async addProduct(req, res) {
    try {
      const {
        name,
        subDescription,
        description,
        price,
        priceSale,
        status,
        size,
        color,
        quantity,
        category,
        image_url,
      } = req.body;

      if (
        !name ||
        !price ||
        !description ||
        !status ||
        !quantity||
        !image_url ||
        image_url.length === 0
      ) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      } else {
        const uploadedImageUrls = [];

        for (const imageUrl of image_url) {
          const uploadResult = await Products.uploadFileToCloudinary(imageUrl);
          if (!uploadResult.status) {
            return res
              .status(500)
              .json({
                success: false,
                message: 'Error uploading one or more images',
              });
          }
          uploadedImageUrls.push(uploadResult.imageUrl);
        }

        const newProduct = new Products({
          name,
          subDescription,
          description,
          price,
          priceSale,
          status,
          size,
          color,
          quantity,
          category,
          image_url: uploadedImageUrls,
        });
        await newProduct.save();

        return res.status(201).json({
          success: true,
          message: 'Product added successfully!',
          product: newProduct,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const updateProduct = await Products.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      if (!updateProduct) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }

      if (
        !updateProduct.name ||
        !updateProduct.price ||
        !updateProduct.category ||
        !updateProduct.image_url ||
        !updateProduct.status ||
        !updateProduct.description
      ) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      }

      return res.status(201).json({
        success: true,
        message: 'Product updated successfully!',
        product: updateProduct,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const deletedProduct = await Products.findByIdAndDelete(req.params._id);
      if (!deletedProduct) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }
      return res.status(201).json({
        success: true,
        message: 'Product deleted successfully!',
        product: deletedProduct,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async searchProduct(req, res) {
    const q = req.query.q;
    console.log('q', q);

    try {
      const products = await Products.find({
        name: { $regex: q, $options: 'i' },
      });

      return res
        .status(200)
        .json({ success: true, message: 'Products found.', products });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
}

export default new ProductsController();
