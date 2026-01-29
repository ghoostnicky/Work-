import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [sector, setSector] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sector || !amount || !phone) {
      setMessage('All fields are required.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // assume investor logged in
      const res = await axios.post(
        'https://bigbrotherinvestments.co.ke/api/invest/create',
        { sector, amount, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating investment');
    }
  }

  return (
    <section className="bg-gray-100 py-20 px-5 text-center">
      <h2 className="text-4xl font-bold mb-10">Start Your Investment</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <select 
          value={sector} 
          onChange={e => setSector(e.target.value)}
          className="w-full p-3 rounded border"
        >
          <option value="">Select Sector</option>
          <option value="Transport">Transport</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Furniture">Furniture</option>
          <option value="Rentals">Rentals</option>
        </select>

        <input 
          type="number" 
          placeholder="Amount (KES)" 
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full p-3 rounded border"
        />

        <input 
          type="text" 
          placeholder="Phone Number" 
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full p-3 rounded border"
        />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full">
          Invest Now
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </section>
  );
}

export default BookingForm;
