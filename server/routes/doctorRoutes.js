const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const {
    getDoctors,
    getDoctorById,
    updateDoctorProfile,
    updateAvailability
} = require('../controllers/doctorController');

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.put('/:id', protect, restrictTo('doctor', 'admin'), updateDoctorProfile);
router.put('/:id/availability', protect, restrictTo('doctor'), updateAvailability);

module.exports = router;
