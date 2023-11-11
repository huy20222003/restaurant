import Reviews from '../models/Reviews.mjs';
import Products from '../models/Products.mjs';
import Orders from '../models/Orders.mjs';
import dotenv from 'dotenv';

dotenv.config();

class ReviewsController {
  async getAllReviewsByProduct(req, res) {
    try {
      const reviews = await Reviews.find({ productId: req.params._id }).sort({
        createdAt: -1,
      });
      return res
        .status(200)
        .json({ success: true, message: 'Retrieve data successfull', reviews });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async createReview(req, res) {
    try {
      const { productId, review, rate, orderId } = req.body;
  
      if (!productId || !review || !rate || !orderId) {
        return res.status(400).json({ success: false, message: 'Required field(s) missing' });
      }
  
      const newReview = new Reviews({ productId, review, rate, userId: req.user._id, orderId });
      await newReview.save();
  
      const reviews = await Reviews.find({ productId });
  
      const totalRate = reviews.reduce((total, current) => total + current.rate, 0);
      const rateAvg = (totalRate / reviews.length).toFixed(1);
  
      await Products.findByIdAndUpdate(productId, { rate: rateAvg }, {new: true});
  
      await Orders.findByIdAndUpdate(orderId, { isReview: true });
  
      return res.status(200).json({
        success: true,
        message: 'Review added successfully',
        review: newReview,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateOrder(req, res) {
    try {
      const { orderId, productId } = req.body;
      
      const updatedOrder = await Orders.findOneAndUpdate(
        { _id: orderId, 'items.product._id': productId },
        { $set: { 'items.$.isReview': true } },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(400).json({ success: false, message: 'Order not found' });
      }
  
      return res.status(200).json({ success: true, message: 'Update order success', order: updatedOrder });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }  
  
}

export default new ReviewsController();
