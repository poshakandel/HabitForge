import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaChartBar, FaCog, FaSignOutAlt, FaRocket } from 'react-icons/fa';

const SidebarLink = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 font-medium transition-all duration-200 border-l-2 ${isActive
                ? 'text-white border-primary bg-white/5'
                : 'text-text-muted border-transparent hover:text-white hover:bg-white/5'
            }`
        }
    >
        <Icon size={18} />
        <span>{label}</span>
    </NavLink>
);

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar - Desktop */}
            <aside className="w-64 hidden md:flex flex-col border-r border-white/10 bg-surface">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <FaRocket size={16} />
                    </div>
                    <span className="font-bold text-xl tracking-wide text-white">HabitForge</span>
                </div>

                <nav className="flex-1 mt-6">
                    <div className="px-6 mb-2 text-xs font-bold text-text-muted uppercase tracking-widest opacity-60">Menu</div>
                    <SidebarLink to="/dashboard" icon={FaHome} label="Overview" />
                    <SidebarLink to="/analytics" icon={FaChartBar} label="Analytics" />

                    <div className="px-6 mt-8 mb-2 text-xs font-bold text-text-muted uppercase tracking-widest opacity-60">System</div>
                    <SidebarLink to="/settings" icon={FaCog} label="Settings" />
                </nav>

                <div className="p-6 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xs font-bold text-white border border-white/20">
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-medium text-sm text-white truncate">{user?.name}</p>
                            <p className="text-xs text-text-muted truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 text-xs font-bold text-text-muted hover:text-white py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative bg-background">
                <div className="max-w-6xl mx-auto p-6 md:p-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
