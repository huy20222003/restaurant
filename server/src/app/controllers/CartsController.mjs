import Cart from '../models/Carts.mjs';
import Products from '../models/Products.mjs';

class CartController {
  async getUserCart(req, res) {
    try {
      const userId = req.user._id;
      const userCart = await Cart.findOne({ userCart: userId });

      if (!userCart) {
        return res
          .status(404)
          .json({ success: false, error: 'Cart not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'Retrieve cart data successfully!',
        userCart,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateCart(req, res) {
    try {
      const userId = req.user._id;
      const { productId, quantity, property } = req.body;

      const cart = await Cart.findOne({ userCart: userId });
      const product = await Products.findById(productId);

      if (!cart) {
        return res
          .status(404)
          .json({ success: false, error: 'Cart not found' });
      }

      const existingItem = cart.items.find(
        (item) => item.product._id.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        cart.items.push({
          product: product,
          quantity: quantity,
          property: property,
        });
      }

      await cart.save();

      return res.json({
        success: true,
        message: 'Cart updated successfully!',
        cart,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateQuantity(req, res) {
    const { productId, quantity } = req.body;
  
    try {
      const cart = await Cart.findById(req.user._id);
  
      if (!cart) {
        return res.status(400).json({ success: false, message: 'Cart not found' });
      }
  
      const cartItem = cart.items.find(item => item.product.equals(productId));
  
      if (cartItem) {
        cartItem.quantity += quantity;
      } 
  
      const updatedCart = await cart.save();
  
      return res.status(200).json({
        success: true,
        message: 'Quantity updated successfully',
        cart: updatedCart,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
  

  async deleteProductFromCart(req, res) {
    try {
      const userId = req.user._id;
      const productId = req.params._id;
      const cart = await Cart.findOne({ userCart: userId });

      if (!cart) {
        return res
          .status(404)
          .json({ success: false, error: 'Cart not found' });
      }

      const existingItemIndex = cart.items.findIndex(
        (item) => item.product._id.toString() === productId
      );

      if (existingItemIndex !== -1) {
        cart.items.splice(existingItemIndex, 1);
        await cart.save();

        return res.json({
          success: true,
          message: 'Product removed from cart successfully!',
          cart,
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found in the cart!' });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
}

export default new CartController();
