import dotenv from 'dotenv';
import Users from '../models/Users.mjs';
import Roles from '../models/Roles.mjs';
import Employees from '../models/Employees.mjs';
import Carts from '../models/Carts.mjs';
import bcryptjs from 'bcryptjs';

dotenv.config();

class UserController {
  async getAllUser(req, res) {
    try {
      const users = await Users.find({}).select('-password');
      return res
        .status(200)
        .json({ success: true, message: 'GET successful!', users });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getSingleUser(req, res) {
    try {
      const user = await Users.findById(req.params._id).select('-password');
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'user not found' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'user found', user });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async createUser(req, res) {
    const { fullName, username, email, phoneNumber } = req.body;
    if (!username || !fullName || !email || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required information.',
      });
    }
    try {
      const existingUser = await Users.findOne({
        $or: [{ username }, { email }, { phoneNumber }],
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username or email or Phone Number already exists!',
        });
      } else {
        const userRole = await Roles.findOne({ name: 'user' });
        const newUser = new Users({
          fullName,
          username,
          email,
          phoneNumber,
          roles: userRole._id,
        });

        await newUser.save();
        const newCart = new Carts({ userCart: newUser._id });
        await newCart.save();

        return res.status(200).json({
          success: true,
          message: 'Add user successful!',
          user: newUser,
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

  async deleteUserById(req, res) {
    try {
      const user = await Users.findByIdAndDelete(req.params._id);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: 'User not found in system' });
      } else {
        return res
          .status(200)
          .json({ success: true, message: 'Delete user successful!' });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateAvatar(req, res) {
    try {
      const { avatarUpdate } = req.body;
      const user = await Users.findById(req.user._id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found' });
      } else {
        const uploadResult = await Users.uploadFileToCloudinary(avatarUpdate);
        if (!uploadResult.status) {
          return res
            .status(500)
            .json({ success: false, message: 'Error uploading image_url' });
        } else {
          user.avatar = uploadResult.imageUrl;
          await user.save();
          return res
            .status(200)
            .json({ success: true, message: 'Update avatar successfull' });
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

  async updateInfo(req, res) {
    try {
      const { fullName, username, email, phoneNumber, shipAddress, address } =
        req.body;
      const user = await Users.findById(req.user._id);
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
      } else {
        user.fullName = fullName;
        user.username = username;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.shipAddress = shipAddress;
        user.address = address;
        await user.save();
        return res
          .status(200)
          .json({ success: true, message: 'Update user successfull', user });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updatePassword(req, res) {
    try {
      const { newPassword } = req.body;

      if (!newPassword) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid new password!' });
      }

      const hashPassword = await bcryptjs.hash(newPassword, 10);

      const employee = await Users.findByIdAndUpdate(req.user._id, {
        password: hashPassword,
      });

      if (!employee) {
        return res
          .status(404)
          .json({ success: false, message: 'Employee not found!' });
      }

      return res
        .status(200)
        .json({ success: true, message: 'Update password success!' });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateRole(req, res) {
    try {
      const { id, roleId } = req.body;
      if (!roleId) {
        return res
          .status(400)
          .json({ success: false, message: 'Role not found' });
      } else {
        const user = await Users.findById(id);
        const role = await Roles.findById(roleId);
        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: 'User not found' });
        } else {
          const employee = new Employees({
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            avatar: user.avatar,
            password: user.password,
            roles: roleId,
            position: role.name,
            salary: 0,
          });
          await employee.save();
          await Users.deleteOne({ _id: id });
          return res
            .status(200)
            .json({ success: true, message: 'Updated role successful' });
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
}

export default new UserController();
