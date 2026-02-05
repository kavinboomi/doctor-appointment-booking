const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const {
    bookAppointment,
    getPatientAppointments,
    getDoctorAppointments,
    updateAppointment
} = require('../controllers/appointmentController');

router.post('/', protect, restrictTo('patient'), bookAppointment);
router.get('/patient/:id', protect, getPatientAppointments);
router.get('/doctor/:id', protect, restrictTo('doctor'), getDoctorAppointments);
router.put('/:id', protect, updateAppointment);

module.exports = router;
