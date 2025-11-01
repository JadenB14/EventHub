import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import eventhubLogo from '../assets/eventhub-logo1.png'

export default function Register() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(email, password, name)

            navigate('/login');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                console.log(error)
            } else {
                setError("An unexpected Error occured.")
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <a 
            href="/home"
            className="fixed pl-5 pt-5 "
            >
                <img alt="logo" src={eventhubLogo} width={200} height={100}/>
            </a>
            <div className="flex items-center justify-center min-h-screen bg-gray-300">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

                    <h1 className="bg-rd-100 text-2xl px-3 rounded-md mb-5 text-center ">Register</h1>

                    {error && (
                        <p>
                            {error}
                        </p>
                    )}

                    <form onSubmit={submitDetails}>
                        <div className="mb-4">
                            <label className="block font-medium">
                                Name: 
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 p-1 pl-2 border w-full rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium">
                                Email: 
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 p-1 pl-2 border w-full rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-2"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block font-medium">
                                Password: 
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 p-1 pl-2 border w-full rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-2"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-3/4 bg-blue-600 rounded-md text-white font-semibold p-1.5 hover:bg-blue-700 focus:ring-2 focus:ring-offset-blue-500 transition disabled:opacity-50"
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </div>

                    </form>

                    <p className="text-center mt-4">
                        Have an account already?{" "}
                        <a href='/login' className="text-blue-600 hover:underline">
                            Login
                        </a>
                    </p>

                </div>
        </div>
        </div>
    )
}