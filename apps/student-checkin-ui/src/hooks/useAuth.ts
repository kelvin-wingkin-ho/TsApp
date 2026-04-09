import { createContext, useContext } from "react";

// Define the shape of the context
export interface AuthContextType {
    token: string | null;
    login: (newToken: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

// Initialize with undefined to catch usage outside of Provider
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext<AuthContextType | undefined>(AuthContext)       
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}