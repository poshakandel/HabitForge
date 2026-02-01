import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Analytics from '../components/Analytics';
import api from '../api/axios';

const AnalyticsPage = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        fetchHabits();
    }, []);

    if (loading) return <div className="text-center py-20 animate-pulse text-text-muted">Loading Analytics...</div>;

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Analytics Overview</h1>
                <p className="text-text-muted">Deep dive into your performance and consistency.</p>
            </header>

            {habits.length > 0 ? (
                <div className="space-y-8">
                    <Analytics habits={habits} />

                    {/* Additional insights placeholder */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="modern-card p-6">
                            <h3 className="text-sm font-semibold mb-4 text-text-muted uppercase tracking-wider">Top Performing Habit</h3>
                            <div className="text-xl font-bold text-white">
                                {habits.sort((a, b) => b.streak - a.streak)[0]?.title || "N/A"}
                            </div>
                            <div className="text-sm text-text-muted mt-1">
                                Current best streak
                            </div>
                        </div>
                        <div className="modern-card p-6">
                            <h3 className="text-sm font-semibold mb-4 text-text-muted uppercase tracking-wider">Total Habits tracked</h3>
                            <div className="text-4xl font-bold text-white">{habits.length}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl">
                    <p className="text-text-muted">No data to analyze yet.</p>
                </div>
            )}
        </div>
    );
};

export default AnalyticsPage;
