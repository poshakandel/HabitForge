import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaBell, FaShieldAlt, FaSave, FaTimes } from 'react-icons/fa';
import api from '../api/axios';

const Settings = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    // Initialize notifications state from user profile (defaulting to false if undefined)
    const [notifications, setNotifications] = useState(user?.notificationsEnabled || false);
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateProfile({ name, email, password: password || undefined });
        setIsEditing(false);
    };

    const toggleNotifications = async () => {
        const newValue = !notifications;
        setNotifications(newValue);
        // Request browser permission if enabling
        if (newValue && 'Notification' in window) {
            Notification.requestPermission();
        }
        // Save immediately
        await updateProfile({ notificationsEnabled: newValue });
    };

    const updateProfile = async (dataToUpdate) => {
        try {
            const { data } = await api.put('/auth/profile', dataToUpdate);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setMessage('Settings updated successfully!');
            // Small delay to clear message or refresh if needed, but for toggle we just want visual feedback
            setTimeout(() => {
                setMessage('');
                if (dataToUpdate.name || dataToUpdate.email) window.location.reload();
            }, 1000);
        } catch (error) {
            setMessage('Error updating settings');
            // Revert notification state if it was a toggle failure
            if (dataToUpdate.notificationsEnabled !== undefined) {
                setNotifications(!dataToUpdate.notificationsEnabled);
            }
        }
    }

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-text-muted">Manage your account and preferences.</p>
            </header>

            <div className="space-y-6 max-w-2xl">
                {/* Profile Section */}
                <div className="modern-card p-6">
                    {message && <div className="p-3 mb-4 bg-secondary/10 text-secondary rounded-lg text-sm">{message}</div>}

                    {!isEditing ? (
                        <>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-white">
                                    {user?.name?.[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">{user?.name}</h3>
                                    <p className="text-text-muted">{user?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn-primary bg-white/5 hover:bg-white/10 border border-white/10 text-white w-full py-2 shadow-none"
                            >
                                Edit Profile
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase mb-1">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="modern-input w-full p-3"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="modern-input w-full p-3"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase mb-1">New Password (Optional)</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Leave blank to keep current"
                                    className="modern-input w-full p-3"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="btn-primary flex-1 py-3 flex items-center justify-center gap-2">
                                    <FaSave /> Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-3 rounded-xl border border-white/10 text-text-muted hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Preferences */}
                <div className="modern-card p-0 overflow-hidden">
                    <div
                        onClick={toggleNotifications}
                        className="p-4 border-b border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer select-none"
                    >
                        <div className="flex items-center gap-3">
                            <FaBell className="text-text-muted" />
                            <span className="text-white">Notifications</span>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${notifications ? 'bg-primary' : 'bg-white/10'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${notifications ? 'left-7' : 'left-1'}`}></div>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8">
                    <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-text-muted">
                        HabitForge v1.1.0 (Startup Edition)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
