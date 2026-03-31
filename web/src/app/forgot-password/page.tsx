'use client';

import { auth } from "../../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await sendPasswordResetEmail(auth, email);
            setSent(true);
        } catch (err: any) {
            console.error("Password reset error:", err);
            switch (err.code) {
                case 'auth/user-not-found':
                    // Don't reveal whether user exists
                    setSent(true);
                    break;
                case 'auth/invalid-email':
                    setError('Bitte gib eine gültige E-Mail-Adresse ein.');
                    break;
                case 'auth/too-many-requests':
                    setError('Zu viele Anfragen. Bitte versuche es später erneut.');
                    break;
                default:
                    setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-100 dark:border-gray-700">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight">
                    Passwort zurücksetzen
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-base leading-relaxed">
                    Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen.
                </p>

                {sent ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl text-sm font-medium border border-green-100 dark:border-green-900/30">
                            Falls ein Konto mit dieser E-Mail existiert, haben wir dir einen Link zum Zurücksetzen gesendet. Überprüfe auch deinen Spam-Ordner.
                        </div>
                        <Link
                            href="/sign-in"
                            className="inline-block mt-4 text-primary font-semibold hover:underline text-sm"
                        >
                            Zurück zur Anmeldung
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="E-Mail-Adresse"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-primary/20"
                        >
                            {loading ? 'Wird gesendet...' : 'Link senden'}
                        </button>

                        {error && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/30">
                                {error}
                            </div>
                        )}

                        <Link
                            href="/sign-in"
                            className="text-sm text-gray-500 hover:text-primary font-medium mt-2"
                        >
                            Zurück zur Anmeldung
                        </Link>
                    </form>
                )}
            </div>
        </div>
    );
}
