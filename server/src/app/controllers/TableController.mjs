import Orders from '../models/Orders.mjs';
import Tables from '../models/Tables.mjs';
//---------------------------------------------------

class TableControler {
  async getAllTables(req, res) {
    try {
      const tables = await Tables.find({}).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: 'Retrieve products data successfully!',
        tables,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getSingleTable(req, res) {
    try {
      const table = await Tables.findById(req.params._id);
      if (!table) {
        return res
          .status(404)
          .json({ success: false, message: 'Table not found' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'Table found', table });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async createTable(req, res) {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res
          .status(400)
          .json({ success: false, message: 'Require fields missing' });
      } else {
        const table = new Tables({ name, description });
        await table.save();
        return res
          .status(200)
          .json({ success: true, message: 'Create table successful', table });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateTable(req, res) {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res
          .status(400)
          .json({ success: false, message: 'Require fields missing' });
      } else {
        const table = await Tables.findByIdAndUpdate(req.params._id, {
          name: name,
          description: description,
        });
        await table.save();
        return res
          .status(200)
          .json({ success: true, message: 'Updated successful', table });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async deleteTable(req, res) {
    try {
      const deletedTable = await Tables.findByIdAndDelete(req.params._id);
      if (!deletedTable) {
        return res
          .status(404)
          .json({ success: false, error: 'Table not found' });
      }
      return res.status(201).json({
        success: true,
        message: 'Table deleted successfully!',
        table: deletedTable,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
}

export default new TableControler();
