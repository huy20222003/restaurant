import Reservation from '../models/Reservation.mjs';

class ReservationsController {
  async getAllReservations(req, res) {
    try {
      const today = new Date();

      const startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);
      let type = 'lunch';

      if (today.getHours() > 22 && today.getHours() <=12) {
        type = 'lunch';
      } else if (today.getHours() > 12 && today.getHours() <=22) {
        type = 'dinner';
      }

      const reservations = await Reservation.find({
        reservationDate: {
          $gte: startDate,
          $lte: endDate,
        },
        type: type,
      });

      return res.status(200).json({
        success: true,
        message: 'Retrive data successfully',
        reservations,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getAllReservationsById(req, res) {
    try {

      const reservations = await Reservation.find({
        userId: req.user._id
      });

      return res.status(200).json({
        success: true,
        message: 'Retrive data successfully',
        reservations,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async createReservation(req, res) {
    try {
      const { fullName, tableId, reservationDate, note } = req.body;
      if (!fullName || !tableId || !reservationDate) {
        return res.status(400).json({
          success: false,
          message: 'Required fields missing',
        });
      } else {
        let type = 'lunch';
        const date = new Date(reservationDate);
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        if (date.getHours() >= 8 && date.getHours() <= 12) {
          type = 'lunch';
        } else if (date.getHours() >= 14 && date.getHours() <= 22) {
          type = 'dinner';
        }
        const reservation = await Reservation.findOne({
          type: type,
          tableId: tableId,
          reservationDate: {
            $gte: startDate,
            $lte: endDate,
          },
        });
        if (reservation) {
          return res
            .status(400)
            .json({ success: false, message: 'The table has been booked' });
        } else {
          const newReservation = new Reservation({
            fullName,
            tableId,
            userId: req.user._id,
            note,
            reservationDate,
            type: type,
          });
          await newReservation.save();
          return res.status(200).json({
            success: true,
            message: 'Retrive data successfully',
            reservation: newReservation,
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

  async filterReservation(req, res) {
    try {
      const { type, reservationDate } = req.body;
      const date = new Date(reservationDate);
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      const reservations = await Reservation.find({
        type: type,
        reservationDate: {
          $gte: startDate,
          $lte: endDate,
        },
      });
      return res
        .status(200)
        .json({
          success: true,
          message: 'Retrive data successful',
          reservations,
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

export default new ReservationsController();
