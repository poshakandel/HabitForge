import React, { useState } from 'react';
import api from '../api/axios';
import { FaPlus, FaRocket } from 'react-icons/fa';

const HabitForm = ({ onHabitAdded }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            const { data } = await api.post('/habits', { title });
            onHabitAdded(data);
            setTitle('');
        } catch (error) {
            console.error('Error creating habit:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modern-card p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FaRocket size={16} />
                </div>
                <h3 className="font-semibold text-lg text-white">Create New Habit</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Read 30 mins, Gym, Deep Work..."
                    className="flex-1 modern-input p-4 font-medium placeholder-text-muted/50"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary px-8 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaPlus size={14} />
                    <span className="font-bold">Add</span>
                </button>
            </form>
        </div>
    );
};

export default HabitForm;
