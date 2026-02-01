const express = require('express');
const {
    getHabits,
    createHabit,
    deleteHabit,
    toggleHabitCompletion,
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getHabits).post(protect, createHabit);
router.route('/:id').delete(protect, deleteHabit);
router.route('/:id/toggle').put(protect, toggleHabitCompletion);

module.exports = router;
