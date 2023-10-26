import Orders from '../models/Orders.mjs';
import Products from '../models/Products.mjs';
import Carts from '../models/Carts.mjs';
//---------------------------------------------------

class OrdersController {
  async getAllOrders(req, res) {
    try {
      const orders = await Orders.find({}).sort({createdAt: -1});

      return res.status(200).json({
        success: true,
        message: 'Retrieve products data successfully!',
        orders,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getAllOrdersById(req, res) {
    try {
      const orders = await Orders.find({ userOrder: req.user._id });

      return res.status(200).json({
        success: true,
        message: 'Retrieve products data successfully!',
        orders,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getSingleOrder(req, res) {
    try {
      const order = await Orders.findById(req.params._id);
      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: 'Order not found' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'Order found', order });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async createOrder(req, res) {
    try {
      const {
        fullName,
        phoneNumber,
        shipAddress,
        items: orderItems, // Đổi tên biến để tránh xung đột với biến Cart
        totalPrices,
        status,
        shippingUnit,
        paymentMethod,
        shippingFee,
      } = req.body;

      // Kiểm tra các trường bắt buộc
      const requiredFields = [
        'fullName',
        'phoneNumber',
        'shipAddress',
        'items',
        'totalPrices',
        'status',
        'shippingUnit',
        'paymentMethod',
        'shippingFee',
      ];

      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Required fields missing!',
          missingFields: missingFields,
        });
      }

      const newOrder = new Orders({
        fullName,
        phoneNumber,
        shipAddress,
        items: orderItems, // Sử dụng danh sách mục của đơn hàng
        totalPrices,
        status: ['ordered'],
        shippingFee,
        shippingUnit,
        paymentMethod,
        userOrder: req.user._id,
      });

      await newOrder.save();
      
      const userCart = await Carts.findOne({ userCart: req.user._id });
      if (userCart) {
        const updatedCartItems = userCart.items.filter((cartItem) => {
          const existsInOrder = orderItems.some((orderItem) =>
            cartItem.product._id.equals(orderItem.product._id)
          );

          return !existsInOrder;
        });

        userCart.items = updatedCartItems;
        await userCart.save();
      }

      return res.status(200).json({
        success: true,
        message: 'Create order successful!',
        order: newOrder,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async filterOrderByStatus(req, res) {
    try {
      const { status } = req.query;
      if (!status) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid status.' });
      } else {
        const orders = await Orders.find({ status: status });
        if (!orders) {
          return res
            .status(404)
            .json({ success: false, message: 'No matching order found.' });
        } else {
          return res.status(200).json({
            success: true,
            message: 'Found a suitable order.',
            orders,
          });
        }
      }
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
      const { status } = req.body;

      const validStatusValues = [
        'ordered',
        'confirm',
        'delivering',
        'delivered',
        'cancelled',
        'return',
      ];
      if (!validStatusValues.includes(status)) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid status' });
      }

      const updatedOrder = await Orders.findOneAndUpdate(
        { _id: req.params._id },
        { $push: { status: status } },
        { new: true }
      );

      if (!updatedOrder) {
        return res
          .status(404)
          .json({ success: false, message: 'Order not found' });
      }

      res
        .status(200)
        .json({ success: true, message: 'Updated order', order: updatedOrder });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
}

export default new OrdersController();
