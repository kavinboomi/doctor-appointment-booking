const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const { getAllUsers, getAllDoctors, approveDoctor } = require('../controllers/adminController');

router.get('/users', protect, restrictTo('admin'), getAllUsers);
router.get('/doctors', protect, restrictTo('admin'), getAllDoctors);
router.put('/approve-doctor/:id', protect, restrictTo('admin'), approveDoctor);

module.exports = router;
