import Employees from '../models/Employees.mjs';
import Roles from '../models/Roles.mjs';
import bcryptjs from 'bcryptjs';
import Users from '../models/Users.mjs';

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const employees = await Employees.find({});
      return res.status(200).json({
        success: true,
        message: 'Retrieve employee data successfully!',
        employees,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getSingleEmployee(req, res) {
    try {
      const employee = await Employees.findById(req.params._id);
      return res.status(200).json({
        success: true,
        message: 'Retrieve employee data successfully!',
        employee,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async addEmployee(req, res) {
    try {
      const { fullName, username, email, position, salary, password } =
        req.body;
      if (!fullName || !username || !email || !position || !salary) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      }

      const roles = await Roles.findOne({ name: position });

      if (!roles) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid position' });
      }

      const newEmployee = new Employees({
        fullName,
        username,
        email,
        position,
        salary,
        password,
        roles: roles._id,
      });

      await newEmployee.save();

      return res.status(201).json({
        success: true,
        message: 'Employee added successfully!',
        employee: newEmployee,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateEmployee(req, res) {
    try {
      const updatedEmployee = await Employees.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      if (!updatedEmployee) {
        return res
          .status(404)
          .json({ success: false, message: 'Employee not found' });
      }

      if (
        !updatedEmployee.fullName ||
        !updatedEmployee.email ||
        !updatedEmployee.position ||
        !updatedEmployee.salary ||
        !updatedEmployee.password
      ) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      } else {
        return res.json({
          success: true,
          message: 'Employee updated successfully!',
          employee: updatedEmployee,
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

  async deleteEmployee(req, res) {
    try {
      const deletedEmployee = await Employees.findByIdAndDelete(req.params._id);
      if (!deletedEmployee) {
        return res
          .status(404)
          .json({ success: false, message: 'Employee not found' });
      }
      return res.json({
        success: true,
        message: 'Employee deleted successfully!',
        data: deletedEmployee,
      });
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

      const employee = await Employees.findByIdAndUpdate(req.user._id, {
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

  async updateAvatar(req, res) {
    try {
      const { avatarUpdate } = req.body;
      const employee = await Employees.findById(req.user._id);
      if (!employee) {
        return res
          .status(404)
          .json({ success: false, message: 'Employee not found' });
      } else {
        const uploadResult = await Employees.uploadFileToCloudinary(avatarUpdate);
        if (!uploadResult.status) {
          return res
            .status(500)
            .json({ success: false, message: 'Error uploading image_url' });
        } else {
          employee.avatar = uploadResult.imageUrl;
          await employee.save();
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
      const { fullName, username, email, phoneNumber, address } =
        req.body;
      const employee = await Employees.findById(req.user._id);
      if (!employee) {
        res.status(404).json({ success: false, message: 'employee not found' });
      } else {
        employee.fullName = fullName;
        employee.username =username;
        employee.email = email;
        employee.phoneNumber = phoneNumber;
        employee.address = address;
        await employee.save();
        return res
          .status(200)
          .json({ success: true, message: 'Update employee successfull', employee });
      }
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
        const employee = await Employees.findById(id);
        const role = await Roles.findById(roleId);
        if (!employee) {
          return res
            .status(400)
            .json({ success: false, message: 'Employee not found' });
        } else {
          const user = new Users({
            fullName: employee.fullName,
            username: employee.username,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            address: employee.address,
            shipAddress: employee.address,
            avatar: employee.avatar,
            password: employee.password,
            roles: roleId,
            status: 'Verified',
          });
          await user.save();
          await Employees.deleteOne({ _id: id });
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

export default new EmployeeController();
