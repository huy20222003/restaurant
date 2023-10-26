import dotenv from 'dotenv';
import Users from '../models/Users.mjs';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Roles from '../models/Roles.mjs';
import Carts from '../models/Carts.mjs';
import { validationResult } from 'express-validator';
//---------------------------------------

dotenv.config();

class AuthController {
  async getUserProfile(req, res) {
    try {
      const user = await Users.findById(req.user._id).select('-password');
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found!' });
      }
      return res.status(200).json({
        success: true,
        message: 'User found!',
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async register(req, res) {
    try {
      const { fullName, username, email, password, avatar, phoneNumber } =
        req.body;

      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      // Check if username or email already exists
      const existingUser = await Users.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username or email already exists!',
        });
      }

      const userRole = await Roles.findOne({ name: 'user' });

      const newUser = new Users({
        fullName,
        username,
        email,
        password,
        avatar,
        phoneNumber,
        roles: userRole._id,
      });

      await newUser.save();

      const newCart = new Carts({ userCart: newUser._id });
      await newCart.save();

      const accessToken = newUser.generateAccessToken();
      const refreshToken = newUser.generateRefreshToken();

      return res.status(200).json({
        success: true,
        message: 'Register successful!',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password.',
      });
    }

    try {
      const user = await Users.findOne({ username });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password!',
        });
      }

      const passwordMatch = await bcryptjs.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password!',
        });
      }

      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      return res.status(201).json({
        success: true,
        message: 'Logged in successfully!',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'RefreshToken not found.',
        });
      }

      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        if (!decoded) {
          return res.status(403).json({
            success: false,
            message: 'RefreshToken is invalid.',
          });
        } else {
          const user = await Users.findById(decoded._id);
          const accessToken = user.generateAccessToken();

          return res.status(200).json({
            success: true,
            message: 'New AccessToken generated!',
            accessToken,
          });
        }
      } catch (verifyError) {
        return res.status(403).json({
          success: false,
          message: 'RefreshToken is invalid.',
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
}

export default new AuthController();
