const Doctor = require('../models/Doctor');

// @desc    Get all doctors (with filters)
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
    try {
        const { query } = req;
        const filters = { approved: true }; // Only show approved doctors

        if (query.specialization) {
            filters.specialization = query.specialization;
        }
        if (query.city) {
            filters.city = query.city;
        }

        const doctors = await Doctor.find(filters).populate('userId', 'name email');
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email');
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private (Doctor/Admin)
const updateDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check ownership or admin
        if (doctor.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this profile' });
        }

        const fieldsToUpdate = [
            'specialization', 'experienceYears', 'clinicName',
            'city', 'address', 'fees', 'profileImage', 'certificates'
        ];

        fieldsToUpdate.forEach(field => {
            if (req.body[field] !== undefined) {
                doctor[field] = req.body[field];
            }
        });

        await doctor.save();
        res.json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Update doctor availability
// @route   PUT /api/doctors/:id/availability
// @access  Private (Doctor)
const updateAvailability = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        if (doctor.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Expecting logic: replace availability or add to it?
        // Project requirement: "Doctor sets slots (date + time)"
        // Let's assume full replacement or specific date update.
        // Simplifying to full replacement for now or appending.

        // Simple implementation: Body contains availability array
        if (req.body.availability) {
            doctor.availability = req.body.availability;
        }

        await doctor.save();
        res.json(doctor.availability);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = { getDoctors, getDoctorById, updateDoctorProfile, updateAvailability };
