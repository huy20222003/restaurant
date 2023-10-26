import dotenv from 'dotenv';
dotenv.config();
import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import cloudinary from '../../config/cloudinary/index.mjs';
import jwt from 'jsonwebtoken';

const Users = new Schema(
  {
    fullName: {
      type: String,
      default: '',
      maxLength: 200,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      default: '',
      maxLength: 100,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      default: '',
      required: true,
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      default: null,
      trim: true,
    },
    shipAddress: {
      type: String,
      default: '',
      maxLength: 3000,
    },
    address: {
      type: String,
      default: '',
      maxLength: 3000,
    },
    password: {
      type: String,
      default: '$2a$10$ZD/EROx56XOvcutCg9jHxeXrz.iqMstXUCksTyvBb8gfD8SPPm7uW',
      required: true,
      trim: true,
      minLength: 7,
    },
    avatar: {
      type: String,
      default:
        'https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg',
    },
    status: {
      type: String,
      default: 'Verified',
      required: true,
    },
    roles: {
      type: Schema.Types.ObjectId,
      ref: 'roles',
    },
  },
  {
    timestamps: true,
  }
);

Users.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 10);
  }
  next();
});

Users.statics.uploadFileToCloudinary = async function (file) {
  try {
    if (!file) {
      return {
        status: false,
        message: 'Missing information',
      };
    } else {
      const result = await cloudinary.uploader.upload(file, {
        upload_preset: process.env.UPLOAD_PRESET,
      });
      return {
        status: true,
        message: 'Upload successful',
        imageUrl: result.secure_url,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'Error uploading image',
    };
  }
};

Users.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id, roles: this.roles }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

Users.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id, roles: this.roles }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '365d',
  });
};

export default model('users', Users);
