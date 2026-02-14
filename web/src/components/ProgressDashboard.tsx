import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

interface ProgressData {
    totalXp: number;
    level: number;
    practiceTime: number;
    conversationCount: number;
    wordsMastered: number;
}

export const ProgressDashboard = ({ apiBaseUrl }: { apiBaseUrl: string }) => {
    const { getToken } = useAuth();
    const [progress, setProgress] = useState<ProgressData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`${apiBaseUrl}/progress/stats`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProgress(data);
                } else {
                    // Mock data if not established on backend yet
                    setProgress({
                        totalXp: 120,
                        level: 1,
                        practiceTime: 15,
                        conversationCount: 3,
                        wordsMastered: 42
                    });
                }
            } catch (e) {
                console.error("Failed to fetch progress", e);
                setProgress({
                    totalXp: 120,
                    level: 1,
                    practiceTime: 15,
                    conversationCount: 3,
                    wordsMastered: 42
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, [apiBaseUrl, getToken]);

    if (loading) return <div className="p-4">Lade Fortschritt...</div>;
    if (!progress) return null;

    const nextLevelXp = progress.level * 500;
    const progressPercent = (progress.totalXp % 500) / 500 * 100;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Dein Lern-Fortschritt</h2>

            <div className="flex items-center gap-4 mb-6">
                <div className="relative size-16 flex items-center justify-center bg-primary/10 rounded-full">
                    <span className="text-2xl font-bold text-primary">Lvl {progress.level}</span>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{progress.totalXp} XP</span>
                        <span className="text-gray-400">{nextLevelXp} XP</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress.practiceTime}m</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Geübt</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress.conversationCount}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Gespräche</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress.wordsMastered}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Wörter</div>
                </div>
            </div>
        </div>
    );
};
