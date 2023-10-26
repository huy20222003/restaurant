import dotenv from 'dotenv';
dotenv.config();
import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import cloudinary from '../../config/cloudinary/index.mjs';
import jwt from 'jsonwebtoken';

const Employees = new Schema(
  {
    fullName: {
      type: String,
      maxLength: 200,
      required: true,
    },
    username: {
      type: String,
      maxLength: 100,
      requires: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      default: '',
      maxLength: 2000,
    },
    position: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      default: 0,
    },
    password: {
      type: String,
<<<<<<< HEAD
      default: '$2a$10$ZD/EROx56XOvcutCg9jHxeXrz.iqMstXUCksTyvBb8gfD8SPPm7uW',
=======
      default: '1234567',
>>>>>>> 0f17552f1d934bed96304db852a63f08346ba76d
      required: true,
      trim: true,
      minLength: 7,
    },
    avatar: {
      type: String,
      default:
        'https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg',
    },
    roles: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'roles',
    },
  },
  {
    timestamps: true,
  }
);

Employees.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 10);
  }
  next();
});

Employees.statics.uploadFileToCloudinary = async function (file) {
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

Employees.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id, roles: this.roles }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

Employees.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id, roles: this.roles }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '365d',
  });
};

export default model('employees', Employees);
