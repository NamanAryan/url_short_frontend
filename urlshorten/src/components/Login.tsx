// Login.tsx
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
 const navigate = useNavigate();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   try {
     const response = await axios.post('https://url-short-backend-kdq7.onrender.com/api/user/login', {
       email,
       password
     });

     if(response.data.token) {
       localStorage.setItem('token', response.data.token);
       navigate('/');
     }
   } catch (err) {
     setError('Login failed. Please check your credentials.');
   }
 };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="max-w-md w-full p-8 bg-gray-800 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Welcome Back</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="text-red-400 text-center text-sm bg-red-900/50 py-2 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Sign in
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">or</span>
          </div>
        </div>

        <p className="text-center text-gray-400">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-blue-400 hover:text-blue-300 font-medium transition duration-200"
          >
            Create one now
          </a>
        </p>
      </form>
    </div>
  </div>
);
};

export default Login;