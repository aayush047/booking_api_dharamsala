const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get bookings for owner
router.get('/', async (req, res) => {
    const { ownerId } = req.query;
    if (!ownerId) return res.status(400).json({ message: "ownerId required" });
    const bookings = await Booking.find({ ownerId });
    res.json(bookings);
});

// Add booking
router.post('/', async (req, res) => {
    try {
        const { ownerId, name, event, date } = req.body;
        if (!ownerId || !name || !event || !date) return res.status(400).json({ message: "All fields required" });
        const booking = new Booking({ ownerId, name, event, date });
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update booking status
router.put('/:id', async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    Object.assign(booking, req.body);
    await booking.save();
    res.json(booking);
});

// Delete booking
router.delete('/:id', async (req, res) => {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Deleted" });
});

module.exports = router;
