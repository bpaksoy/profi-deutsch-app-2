'use client';

import { auth } from "../../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AuthInterface = ({ mode }: { mode: 'signin' | 'signup' }) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Firebase Login Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const title = mode === 'signin' ? 'Willkommen zurück!' : 'Werde Teil von Sigsag';
    const subtitle = mode === 'signin' ? 'Melde dich an, um weiter Deutsch zu lernen.' : 'Lerne Deutsch mit Flo, der persönlichen KI-Trainerin.';

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-100 dark:border-gray-700">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">{title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg leading-relaxed">{subtitle}</p>
            
            <button 
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-white text-gray-900 font-bold py-4 px-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-100 transition-all shadow-md active:scale-95 disabled:opacity-50 ring-1 ring-gray-200"
            >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
                {loading ? 'Wird angemeldet...' : 'Sicher mit Google anmelden'}
            </button>

            {error && <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/30">{error}</div>}
            
            <p className="text-xs text-gray-500 mt-10 leading-relaxed font-medium">
                Sicher und verschlüsselt. Durch die Anmeldung stimmst du unseren <a href="/datenschutz" className="underline text-gray-700 dark:text-gray-300">Nutzungsbedingungen</a> zu.
            </p>
        </div>
    );
};
