const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String,
        required: [true, 'Please add specialization']
    },
    experienceYears: {
        type: Number,
        required: [true, 'Please add experience years']
    },
    clinicName: {
        type: String,
        required: [true, 'Please add clinic name']
    },
    city: {
        type: String,
        required: [true, 'Please add city']
    },
    address: {
        type: String,
        required: [true, 'Please add address']
    },
    fees: {
        type: Number,
        required: [true, 'Please add consultation fees']
    },
    profileImage: {
        type: String,
        default: ''
    },
    certificates: [String],
    approved: {
        type: Boolean,
        default: false // Admin must approve
    },
    availability: [{
        date: {
            type: String, // Format: YYYY-MM-DD
            required: true
        },
        slots: [String] // Array of time strings like "10:00"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
