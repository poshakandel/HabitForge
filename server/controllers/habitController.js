const Habit = require('../models/Habit');
const { format, subDays, isSameDay, parseISO } = require('date-fns');

// Helper to calculate streak
const calculateStreak = (completedDates) => {
    if (!completedDates || completedDates.length === 0) return 0;

    const sortedDates = [...completedDates].sort((a, b) => new Date(b) - new Date(a));
    const today = new Date();
    const yesterday = subDays(today, 1);

    let streak = 0;
    let currentDate = new Date(sortedDates[0]);

    // Check if the most recent completion is today or yesterday
    if (!isSameDay(currentDate, today) && !isSameDay(currentDate, yesterday)) {
        return 0;
    }

    streak = 1;

    // Iterate backwards checking for consecutiveness
    for (let i = 0; i < sortedDates.length - 1; i++) {
        const current = new Date(sortedDates[i]);
        const prev = new Date(sortedDates[i + 1]);

        const expectedPrev = subDays(current, 1);

        if (isSameDay(prev, expectedPrev)) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
};

// @desc    Get all habits for logged in user
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user._id });

        // Optional: Recalculate streaks on fetch to ensure accuracy if days passed
        // For MVP, we calculate on update, but here we could verify.
        // Let's return them as is.
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new habit
// @route   POST /api/habits
// @access  Private
const createHabit = async (req, res) => {
    const { title, description } = req.body;

    try {
        const habit = await Habit.create({
            user: req.user._id,
            title,
            description,
        });
        res.status(201).json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (habit.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await habit.deleteOne();
        res.json({ message: 'Habit removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle habit completion for today
// @route   PUT /api/habits/:id/toggle
// @access  Private
const toggleHabitCompletion = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (habit.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const todayStr = format(new Date(), 'yyyy-MM-dd');
        const index = habit.completedDates.indexOf(todayStr);

        if (index !== -1) {
            // Undo completion
            habit.completedDates.splice(index, 1);
        } else {
            // Mark as completed
            habit.completedDates.push(todayStr);
        }

        // Recalculate streak
        const newStreak = calculateStreak(habit.completedDates);
        habit.streak = newStreak;
        if (newStreak > habit.longestStreak) {
            habit.longestStreak = newStreak;
        }

        await habit.save();
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getHabits,
    createHabit,
    deleteHabit,
    toggleHabitCompletion,
};
