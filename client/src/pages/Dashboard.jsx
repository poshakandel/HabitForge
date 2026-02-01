import React, { useState, useEffect } from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import Analytics from '../components/Analytics';
import api from '../api/axios';

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            const { data } = await api.get('/habits');
            setHabits(data);
        } catch (error) {
            console.log('Error fetching habits');
        } finally {
            setLoading(false);
        }
    };

    const handleHabitAdded = (newHabit) => {
        setHabits([...habits, newHabit]);
    };

    const handleHabitUpdated = (updatedHabit) => {
        setHabits(habits.map(h => h._id === updatedHabit._id ? updatedHabit : h));
    };

    const handleHabitDeleted = (id) => {
        setHabits(habits.filter(h => h._id !== id));
    };

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Dashboard</h1>
                <p className="text-text-muted">Track your progress and build consistency.</p>
            </header>

            {habits.length > 0 && <Analytics habits={habits} />}

            <HabitForm onHabitAdded={handleHabitAdded} />

            {loading ? (
                <div className="text-center py-20 text-text-muted animate-pulse">
                    Loading your habits...
                </div>
            ) : (
                <HabitList
                    habits={habits}
                    onHabitUpdated={handleHabitUpdated}
                    onHabitDeleted={handleHabitDeleted}
                />
            )}
        </div>
    );
};

export default Dashboard;
