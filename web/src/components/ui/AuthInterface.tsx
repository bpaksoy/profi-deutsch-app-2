'use client';

import { auth } from "../../lib/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export const AuthInterface = ({ mode }: { mode: 'signin' | 'signup' }) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError("");
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Firebase Login Error:", err);
            setError(getErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (mode === 'signup') {
                const cred = await createUserWithEmailAndPassword(auth, email, password);
                if (name.trim()) {
                    await updateProfile(cred.user, { displayName: name.trim() });
                }
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Firebase Auth Error:", err);
            setError(getErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    const title = mode === 'signin' ? 'Willkommen zurück!' : 'Werde Teil von Sigsag';
    const subtitle = mode === 'signin'
        ? 'Melde dich an, um weiter Deutsch zu lernen.'
        : 'Lerne Deutsch mit Flo, der persönlichen KI-Trainerin.';

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-100 dark:border-gray-700">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight">{title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-base leading-relaxed">{subtitle}</p>

            {/* Google Sign-In */}
            <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-white text-gray-900 font-bold py-3.5 px-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-100 transition-all shadow-md active:scale-95 disabled:opacity-50 ring-1 ring-gray-200"
            >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                {loading ? 'Wird angemeldet...' : 'Mit Google fortfahren'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-xs text-gray-400 font-medium uppercase">oder</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3 text-left">
                {mode === 'signup' && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    />
                )}
                <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                />

                {mode === 'signin' && (
                    <div className="text-right">
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                            Passwort vergessen?
                        </Link>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-primary/20"
                >
                    {loading
                        ? 'Wird geladen...'
                        : mode === 'signin'
                            ? 'Anmelden'
                            : 'Konto erstellen'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/30">
                    {error}
                </div>
            )}

            {/* Toggle sign-in / sign-up */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                {mode === 'signin' ? (
                    <>Noch kein Konto? <Link href="/sign-up" className="text-primary font-semibold hover:underline">Jetzt registrieren</Link></>
                ) : (
                    <>Bereits ein Konto? <Link href="/sign-in" className="text-primary font-semibold hover:underline">Anmelden</Link></>
                )}
            </p>

            <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                Durch die Anmeldung stimmst du unseren <a href="/datenschutz" className="underline text-gray-500 dark:text-gray-300">Nutzungsbedingungen</a> zu.
            </p>
        </div>
    );
};

function getErrorMessage(code: string): string {
    switch (code) {
        case 'auth/email-already-in-use':
            return 'Diese E-Mail-Adresse wird bereits verwendet.';
        case 'auth/invalid-email':
            return 'Bitte gib eine gültige E-Mail-Adresse ein.';
        case 'auth/weak-password':
            return 'Das Passwort muss mindestens 6 Zeichen haben.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return 'E-Mail oder Passwort ist falsch.';
        case 'auth/too-many-requests':
            return 'Zu viele Anmeldeversuche. Bitte versuche es später erneut.';
        case 'auth/popup-closed-by-user':
            return 'Anmeldung abgebrochen.';
        default:
            return 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.';
    }
}
