import { useState} from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';


const  Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

        const fetchToken = async (e: React.FormEvent) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            try {
                const res = await login(email, password);
                
                localStorage.setItem("token", res.token);

                navigate("/home")
            } catch (err: unknown) {
                console.log(err)
                setError("Failed to login. Please try again later.")
            } finally {
                setLoading(false);
            }
        }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-x1 p-8 w-full max-w-md'>
                <h2 className='bg-rd-100 text-red-700 px-3 rounded-md mb-4 test-sm'>Login</h2>

                {error && (
                    <p className='bg-red-100 text-red-700 px-3 py-2 rounded-md mb-4 text-sm'>
                        {error}
                    </p>
                )}

                <form onSubmit={fetchToken}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        />
                    </div>

                    <div>
                        <label>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-offset-blue-500 focus:outline-none'
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-blue-600 mt-2 text-white font-semibold py-2 prounded-md hover:bg-blue-700 transition disabled:opacity-50'
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className='mt-4 text-sm text-gray-500 text-center'>
                    Don't have an account?{" "}
                    <a href='/register' className='text-blue-600 hover:underline'>
                        Register here.
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login;