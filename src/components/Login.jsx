import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BsGlobe } from 'react-icons/bs';
import { loginClient } from '../api';
import Loader from './Loader'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const client = await loginClient(username, password);
            if (client) {
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => navigate(-1)} className="text-2xl">&larr;</button>
                <h1 className="text-xl font-semibold">Login</h1>
                <BsGlobe className="text-xl" />
            </div>

            <div className="flex-grow flex flex-col pt-20">
                <h2 className="text-3xl font-bold mb-8 text-center">Welcome Back</h2>

                {error && <div className="text-red-500 mb-4 text-center">{error}</div>} {/* Error display */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Please enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Please enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? <Loader /> : 'Login'} {/* Loader shows while loading */}
                    </button>
                </form>

                <div className="mt-4 space-y-2">
                    <button onClick={() => navigate("/register")} className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        Register
                    </button>
                    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Live Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
