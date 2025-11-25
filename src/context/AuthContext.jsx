import { createContext, useContext, useEffect, useState } from 'react';


const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Placeholder for future auth implementation
    useEffect(() => {
        // Simulate checking for a user
        setLoading(false);
    }, []);

    const signUp = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username || data.email.split('@')[0], // Fallback username
                    email: data.email,
                    password: data.password,
                }),
            });
            const result = await response.json();

            if (response.ok) {
                setUser(result);
                localStorage.setItem('token', result.token);
                return { data: { user: result }, error: null };
            } else {
                return { data: null, error: { message: result.message } };
            }
        } catch (error) {
            return { data: null, error: { message: error.message } };
        }
    };

    const signIn = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });
            const result = await response.json();

            if (response.ok) {
                setUser(result);
                localStorage.setItem('token', result.token);
                return { data: { user: result }, error: null };
            } else {
                return { data: null, error: { message: result.message } };
            }
        } catch (error) {
            return { data: null, error: { message: error.message } };
        }
    };

    const signOut = async () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        signUp,
        signIn,
        signOut,
        user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
