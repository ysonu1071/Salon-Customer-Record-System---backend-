import asyncHandler from 'express-async-handler';
import Appointment from '../models/Appointment.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = asyncHandler(async (req, res) => {
  const { customerId, customerName, serviceType, service, date, time, phone, priceDiscussed, advanceTaken, appointmentType, location } = req.body;

  const appointment = await Appointment.create({
    user: req.user._id,
    customerId,
    customerName,
    serviceType,
    service,
    date,
    time,
    phone,
    priceDiscussed: priceDiscussed || 0,
    advanceTaken: advanceTaken || 0,
    appointmentType: appointmentType || 'salon',
    location,
  });

  if (appointment) {
    res.status(201).json(appointment);
  } else {
    res.status(400);
    throw new Error('Invalid appointment data');
  }
});

// @desc    Get all appointments for a user
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id }).sort({ date: 1, time: 1 });
  res.json(appointments);
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    if (appointment.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }

    appointment.status = req.body.status || appointment.status;
    appointment.priceDiscussed = req.body.priceDiscussed !== undefined ? req.body.priceDiscussed : appointment.priceDiscussed;
    appointment.advanceTaken = req.body.advanceTaken !== undefined ? req.body.advanceTaken : appointment.advanceTaken;
    appointment.appointmentType = req.body.appointmentType || appointment.appointmentType;
    appointment.location = req.body.location !== undefined ? req.body.location : appointment.location;
    
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    if (appointment.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await appointment.deleteOne();
    res.json({ message: 'Appointment removed' });
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

export {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
};
