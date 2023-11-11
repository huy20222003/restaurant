import Payment from '../models/Payment.mjs';
import Orders from '../models/Orders.mjs';
import Users from '../models/Users.mjs';
import Products from '../models/Products.mjs';
import Carts from '../models/Carts.mjs';
import moment from 'moment';
import dateFormat from 'dateformat';
import qs from 'qs';
import crypto from 'crypto';

class PaymentController {
  async getAllPayments(req, res) {
    try {
      const payments = await Payment.find({}).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: 'Retrieve payment data successfully!',
        payments,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async createPayment(req, res) {
    try {
      const { sender, description, amount, paymentMethod, status } = req.body;

      const newPayment = new Payment({
        sender,
        description,
        amount,
        paymentMethod,
        userPayment: req.user._id,
        status,
      });
      await newPayment.save();
      return res.status(200).json({
        success: true,
        message: 'Create payment successful',
        payment: newPayment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getOnePayment(req, res) {
    try {
      const payment = await Payment.findById(req.params._id);
      if (!payment) {
        return res
          .status(400)
          .json({ success: false, message: 'Payment not found' });
      } else {
        return res
          .status(200)
          .json({ success: true, message: 'Payment found', payment });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async createPaymentVNPay(req, res) {
    var ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var tmnCode = process.env.vnp_TmnCode;
    var secretKey = process.env.vnp_HashSecret;
    var vnpUrl = process.env.vnp_Url;
    var returnUrl = process.env.vnp_ReturnUrl;
    var date = new Date();
    var expireDate = moment(date).add(10, 'minutes').format('YYYYMMDDHHmmss');
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = '';
    var orderInfo = req.body.orderInfo;
    var orderType = 100000;
    var locale = 'vn';
    if (locale === null || locale === '') {
      locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_ExpireDate'] = expireDate;

    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var signData = qs.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

    return res
      .status(200)
      .json({ success: true, message: 'Create url success', url: vnpUrl });

    //   res.writeHead(302, {
    //     Location: ur
    // });
  }

  async vnpayIPN(req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];
    let rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = process.env.vnp_HashSecret;
    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex');
    let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về
    let orderInfo = vnp_Params['vnp_OrderInfo'];
    let data = orderInfo.split('+');
    let orderId = data[3];
    let paymentId = data[6];
    let payment = await Payment.findById(paymentId);
    let order = await Orders.findById(orderId);
    if (secureHash === signed) {
      //kiểm tra checksum
      if (order) {
        if (payment.amount == JSON.parse(vnp_Params['vnp_Amount'] / 100)) {
          if (paymentStatus == '0') {
            //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
            if (rspCode === '00') {
              payment.status = 'success';
              await payment.save();

              const userCart = await Carts.findOne({
                userCart: payment.userPayment,
              });
              if (userCart) {
                const updatedCartItems = userCart.items.filter((cartItem) => {
                  const existsInOrder = order.items.some((orderItem) =>
                    cartItem.product._id.equals(orderItem.product._id)
                  );

                  return !existsInOrder;
                });

                userCart.items = updatedCartItems;
                await userCart.save();
              }

              req.data = {
                paymentId: payment._id,
              };
            } else {
              order.status = 'cancelled';
              await order.save();

              payment.status = 'cancelled';
              await payment.save();

              req.data = {
                paymentId: payment._id,
              };
            }
            next();
          } else {
            res.status(200).json({
              RspCode: '02',
              Message: 'This order has been updated to the payment status',
            });
          }
        } else {
          res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
        }
      } else {
        res.status(200).json({ RspCode: '01', Message: 'Order not found' });
      }
    } else {
      res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
    }
  }

  async vnpayReturn(req, res) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = process.env.vnp_TmnCode;
    let secretKey = process.env.vnp_HashSecret;
    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      return res
        .status(200)
        .json({ success: true, code: vnp_Params['vnp_ResponseCode'] });
    } else {
      res.status(400).json({ success: false, code: '97' });
    }
  }

  async donePayment(req, res) {
    try {
      const { paymentId } = req.data;
      const url = process.env.payment_status;
      return res.redirect(url + '/' + paymentId);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updatePayment(req, res) {
    try {
      const { status, paymentId } = req.body;
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        { status: status },
        { new: true }
      );
      if(!payment) {
        return res.status(400).json({success: false, message: 'Update payment failed'});
      } else {
        return res.status(200).json({success: true, message: 'Updated payment', payment});
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

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}

export default new PaymentController();
