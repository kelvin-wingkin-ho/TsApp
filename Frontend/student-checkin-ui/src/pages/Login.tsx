import { useState } from 'react';

interface LoginForm {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [form, setForm] = useState<LoginForm>({email: '', password: ''});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response: Response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Login failed');
            } else {
                // Handle successful Login
                console.log('Login success:', data);
            }
        } catch (err) {
            setError('Network error');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: '50px auto'}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 10 }}>
                    <label>Email:</label>
                    <input type="email" name="email"
                        onChange={handleChange}
                        value={form.email} required />
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>Password:</label>
                    <input type="password" name="password"
                        onChange={handleChange}
                        value={form.password} required />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}

export default Login;