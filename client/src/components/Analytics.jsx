import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

const Analytics = ({ habits }) => {
    const data = useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), 6 - i);
            return date;
        });

        return last7Days.map(date => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const completedCount = habits.reduce((acc, habit) => {
                return acc + (habit.completedDates.includes(dateStr) ? 1 : 0);
            }, 0);

            return {
                day: format(date, 'EEE'), // Mon
                completed: completedCount,
                date: dateStr
            };
        });
    }, [habits]);

    const totalHabits = habits.length;
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const completedToday = habits.filter(h => h.completedDates.includes(todayStr)).length;
    const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 modern-card p-6">
                <h3 className="text-sm font-semibold mb-6 text-text-muted uppercase tracking-wider">Weekly Velocity</h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="day"
                                stroke="var(--color-text-muted)"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <Tooltip
                                cursor={{ stroke: 'var(--color-text-muted)', strokeWidth: 1, strokeDasharray: '3 3' }}
                                contentStyle={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="completed"
                                stroke="var(--color-primary)"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorCompleted)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="modern-card p-6 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-semibold mb-2 text-text-muted uppercase tracking-wider">Daily Focus</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">{completionRate}%</span>
                        <span className="text-text-muted text-sm">complete</span>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-xs text-text-muted mb-2">
                        <span>Progress</span>
                        <span>{completedToday} / {totalHabits}</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-secondary h-full transition-all duration-1000 ease-out"
                            style={{ width: `${completionRate}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
