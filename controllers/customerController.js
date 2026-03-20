import asyncHandler from 'express-async-handler';
import Customer from '../models/Customer.js';

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({}).sort({ createdAt: -1 });
  res.json(customers);
});

// @desc    Get customer by ID
// @route   GET /api/customers/:id
// @access  Private
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private
const createCustomer = asyncHandler(async (req, res) => {
  const { name, phone, email, notes } = req.body;

  const customer = await Customer.create({
    name,
    phone,
    email,
    notes,
  });

  res.status(201).json(customer);
});

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = asyncHandler(async (req, res) => {
  const { name, phone, email, notes } = req.body;

  const customer = await Customer.findById(req.params.id);

  if (customer) {
    customer.name = name || customer.name;
    customer.phone = phone || customer.phone;
    customer.email = email || customer.email;
    customer.notes = notes || customer.notes;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc    Add service history to customer
// @route   POST /api/customers/:id/services
// @access  Private
const addServiceHistory = asyncHandler(async (req, res) => {
  const { service, price, date } = req.body;

  const customer = await Customer.findById(req.params.id);

  if (customer) {
    const newService = {
      service,
      price: Number(price),
      date: date ? new Date(date) : Date.now(),
      staff: req.user._id,
    };

    customer.servicesHistory.push(newService);
    customer.lastVisit = newService.date;

    await customer.save();
    res.status(201).json({ message: 'Service added successfully', servicesHistory: customer.servicesHistory });
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc    Update service history
// @route   PUT /api/customers/:id/services/:serviceId
// @access  Private
const updateServiceHistory = asyncHandler(async (req, res) => {
  const { service, price, date } = req.body;

  const customer = await Customer.findById(req.params.id);

  if (customer) {
    const serviceIndex = customer.servicesHistory.findIndex(
      (s) => s._id.toString() === req.params.serviceId
    );

    if (serviceIndex !== -1) {
      customer.servicesHistory[serviceIndex].service = service || customer.servicesHistory[serviceIndex].service;
      customer.servicesHistory[serviceIndex].price = price !== undefined ? Number(price) : customer.servicesHistory[serviceIndex].price;
      customer.servicesHistory[serviceIndex].date = date ? new Date(date) : customer.servicesHistory[serviceIndex].date;

      await customer.save();
      res.json({ message: 'Service updated successfully', servicesHistory: customer.servicesHistory });
    } else {
      res.status(404);
      throw new Error('Service record not found');
    }
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc    Delete service history
// @route   DELETE /api/customers/:id/services/:serviceId
// @access  Private
const deleteServiceHistory = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    const initialLength = customer.servicesHistory.length;
    customer.servicesHistory = customer.servicesHistory.filter(
      (s) => s._id.toString() !== req.params.serviceId
    );

    if (customer.servicesHistory.length < initialLength) {
      await customer.save();
      res.json({ message: 'Service record removed', servicesHistory: customer.servicesHistory });
    } else {
      res.status(404);
      throw new Error('Service record not found');
    }
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private/Admin
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    await Customer.deleteOne({ _id: customer._id });
    res.json({ message: 'Customer removed' });
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

export {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  addServiceHistory,
  updateServiceHistory,
  deleteServiceHistory,
  deleteCustomer,
};
