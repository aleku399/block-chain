import { useState } from 'react';
import { BsGlobe } from 'react-icons/bs';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { registerUser } from '../api'; // Import the API function
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { token } = await registerUser(fullName, username, phoneNumber, password);
        if (token) {
          navigate('/'); // Redirect to dashboard
        }
      } catch (error) {
        console.error('Registration failed', error);
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <button className="text-2xl">&larr;</button>
        <h1 className="text-xl font-semibold">Register</h1>
        <BsGlobe className="text-xl" />
      </div>

      <div className="flex-grow flex flex-col pt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <PhoneInput
              country={'us'}
              value={phoneNumber}
              onChange={setPhoneNumber}
              inputProps={{ id: 'phone', className: 'w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' }}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Register
          </button>
        </form>

        <div className="mt-4">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
