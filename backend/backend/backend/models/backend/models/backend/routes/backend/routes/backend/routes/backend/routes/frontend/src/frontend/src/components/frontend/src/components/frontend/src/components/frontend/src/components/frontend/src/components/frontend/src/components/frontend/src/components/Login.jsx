import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Email and password are required.');
      return;
    }

    try {
      const res = await axios.post(
        'https://bigbrotherinvestments.co.ke/api/auth/login',
        { email, password }
      );

      localStorage.setItem('token', res.data.token);
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <section className="bg-white py-20 px-5 text-center">
      <h2 className="text-4xl font-bold mb-10">Login</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded border"
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded border"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full">
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </section>
  );
}

export default Login;
