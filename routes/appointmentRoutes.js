import express from 'express';
const router = express.Router();
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createAppointment).get(protect, getAppointments);
router.route('/:id').put(protect, updateAppointmentStatus).delete(protect, deleteAppointment);

export default router;
