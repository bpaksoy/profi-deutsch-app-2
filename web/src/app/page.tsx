'use client';

import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Page() { 
   const { isSignedIn, isLoaded } = useAuth();

   const startHref = isLoaded && isSignedIn ? "/dashboard" : "/sign-in";
   const signUpHref = isLoaded && isSignedIn ? "/dashboard" : "/sign-up";

   return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 pt-20">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                Sprich sicher <span className="text-primary">Deutsch</span> mit Flo.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
                Deine persönliche KI-Trainerin für den Beruf. Verbessere deine Aussprache und lerne die wichtigsten Redemittel für deinen Erfolg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
                <Link href={startHref} className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all">
                    Jetzt starten
                </Link>
                {!isSignedIn && (
                    <Link href={signUpHref} className="px-8 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transition-colors">
                        Kostenlos anmelden
                    </Link>
                )}
            </div>
        </div>
    );
}