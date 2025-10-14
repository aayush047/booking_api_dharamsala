const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    ownerId: { type: String, required: true },
    name: { type: String, required: true },
    event: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
