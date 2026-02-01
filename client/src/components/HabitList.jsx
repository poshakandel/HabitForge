import React from 'react';
import { FaCheck, FaFire, FaTrash } from 'react-icons/fa';
import api from '../api/axios';
import { format } from 'date-fns';

const HabitList = ({ habits, onHabitUpdated, onHabitDeleted }) => {

    const toggleHabit = async (habit) => {
        try {
            const { data } = await api.put(`/habits/${habit._id}/toggle`);
            onHabitUpdated(data);
        } catch (error) {
            console.error('Error toggling habit:', error);
        }
    };

    const deleteHabit = async (id) => {
        if (!window.confirm('Delete this habit?')) return;
        try {
            await api.delete(`/habits/${id}`);
            onHabitDeleted(id);
        } catch (error) {
            console.error('Error deleting habit', error)
        }
    }

    const isCompletedToday = (habit) => {
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        return habit.completedDates.includes(todayStr);
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            {habits.map((habit) => (
                <div
                    key={habit._id}
                    className={`modern-card p-5 flex items-center justify-between group cursor-default ${isCompletedToday(habit) ? 'border-primary/30 bg-primary/5' : ''}`}
                >
                    <div className="flex items-center gap-5">
                        <button
                            onClick={() => toggleHabit(habit)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all duration-200 ${isCompletedToday(habit)
                                    ? 'bg-primary border-primary text-white scale-105'
                                    : 'border-white/20 hover:border-primary text-transparent hover:text-primary/50'
                                }`}
                        >
                            <FaCheck size={12} strokeWidth={4} />
                        </button>

                        <div>
                            <h3 className={`font-semibold text-lg transition-all ${isCompletedToday(habit) ? 'text-text-muted line-through' : 'text-white'}`}>
                                {habit.title}
                            </h3>

                            {habit.streak > 0 && (
                                <div className="flex items-center gap-1.5 mt-1 text-xs font-medium uppercase tracking-wider text-accent">
                                    <FaFire />
                                    <span>{habit.streak} Day Streak</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => deleteHabit(habit._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            ))}
            {habits.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl">
                    <p className="text-text-muted font-medium">No habits forged yet.</p>
                    <p className="text-sm text-text-muted opacity-60 mt-1">Consistency starts with one.</p>
                </div>
            )}
        </div>
    );
};

export default HabitList;
