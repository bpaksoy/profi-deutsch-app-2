'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, getIdToken, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    getToken: () => Promise<string | null>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    getToken: async () => null,
    logout: async () => {},
});

const PUBLIC_ROUTES = ['/sign-in', '/sign-up', '/forgot-password', '/impressum', '/datenschutz', '/chat', '/pricing', '/tipps', '/dashboard'];

const isPublicRoute = (path: string) => {
    if (path === '/') return true;
    return PUBLIC_ROUTES.some(p => path.startsWith(p));
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!loading && !user && !isPublicRoute(pathname)) {
            router.push('/sign-in');
        }
    }, [loading, user, pathname, router]);

    const getToken = async () => {
        if (!auth.currentUser) return null;
        return await getIdToken(auth.currentUser);
    };

    const logout = async () => {
        await signOut(auth);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, getToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Mock Clerk hooks for backward compatibility
export const useAuth = () => {
    const context = useContext(AuthContext);
    return {
        isSignedIn: !!context.user,
        userId: context.user?.uid || null,
        getToken: context.getToken,
        signOut: context.logout,
        isLoaded: !context.loading,
    };
};

export const useUser = () => {
    const context = useContext(AuthContext);
    return {
        isSignedIn: !!context.user,
        user: context.user ? {
            id: context.user.uid,
            primaryEmailAddress: { emailAddress: context.user.email },
            firstName: context.user.displayName?.split(' ')[0] || '',
            lastName: context.user.displayName?.split(' ').slice(1).join(' ') || '',
            imageUrl: context.user.photoURL,
            // Mock Clerk user methods for settings page compatibility
            update: async (params: any) => {
                console.log('Mock: User update called', params);
                // Optionally: updateProfile(context.user!, { displayName: `${params.firstName} ${params.lastName}` })
            },
            delete: async () => {
                if (auth.currentUser) await auth.currentUser.delete();
            },
            setProfileImage: async (params: any) => {
                console.log('Mock: setProfileImage called', params);
            }
        } : null,
        isLoaded: !context.loading,
    };
};

export const useClerk = () => {
    const context = useContext(AuthContext);
    return {
        signOut: async (_?: any) => await context.logout(),
    };
};
