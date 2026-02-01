import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-background z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    HabitForge
                </div>
                <div className="flex gap-4">
                    <Link to="/login" className="text-text-muted hover:text-white transition-colors px-4 py-2">
                        Login
                    </Link>
                    <Link to="/register" className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto mt-10 md:mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                        Build Habits That <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Actually Stick.</span>
                    </h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                        Stop relying on willpower. HabitForge gives you the system, visuals, and motivation to build rock-solid consistency in minutes a day.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                        <Link to="/register" className="btn-primary px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 group">
                            Start For Free
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                {/* Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20">
                    {[
                        { icon: FaCheckCircle, title: "Track Simply", desc: "One click to mark habits complete. No clutter." },
                        { icon: FaChartLine, title: "Visualize Growth", desc: "Beautiful streaks and charts to keep you motivated." },
                        { icon: FaShieldAlt, title: "Stay Consistent", desc: "Forgiving streak logic that keeps you moving forward." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            className="glass-panel p-8 rounded-2xl text-left hover:bg-white/5 transition-colors"
                        >
                            <feature.icon className="text-3xl text-secondary mb-4" />
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-text-muted">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Landing;
