import express from 'express';
const router = express.Router();
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  addServiceHistory,
  updateServiceHistory,
  deleteServiceHistory,
  deleteCustomer,
  getReminders,
  updateLastContacted,
} from '../controllers/customerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getCustomers).post(protect, createCustomer);
router.get('/reminders', protect, getReminders);
router.put('/:id/contacted', protect, updateLastContacted);

router
  .route('/:id')
  .get(protect, getCustomerById)
  .put(protect, updateCustomer)
  .delete(protect, admin, deleteCustomer);

router.route('/:id/services').post(protect, addServiceHistory);
router.route('/:id/services/:serviceId').put(protect, updateServiceHistory).delete(protect, deleteServiceHistory);

export default router;
