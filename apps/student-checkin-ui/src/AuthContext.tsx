import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./hooks/useAuth";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(() => {
        // Initialize state directly from localStorage for sync performance
        return localStorage.getItem('token');
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token])

    const login = (newToken: string) => setToken(newToken);
    const logout = () => setToken(null);

    const value: AuthContextType = {
        token,
        login,
        logout,
        isAuthenticated: !!token,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}