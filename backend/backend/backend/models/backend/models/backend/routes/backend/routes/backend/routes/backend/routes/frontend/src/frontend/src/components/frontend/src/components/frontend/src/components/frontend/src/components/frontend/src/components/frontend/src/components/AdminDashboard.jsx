import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [investments, setInvestments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem('token'); // assume admin logged in
        const res = await axios.get(
          'https://bigbrotherinvestments.co.ke/api/admin/investments',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInvestments(res.data);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Error fetching investments');
      }
    };

    fetchInvestments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `https://bigbrotherinvestments.co.ke/api/admin/investment/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInvestments(investments.map(inv => inv.id === id ? { ...inv, status } : inv));
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  return (
    <section className="bg-gray-100 py-20 px-5 text-center">
      <h2 className="text-4xl font-bold mb-10">Admin Dashboard</h2>
      {message && <p className="text-red-600 mb-4">{message}</p>}
      <div className="max-w-5xl mx-auto space-y-4">
        {investments.length === 0 && <p>No investments found.</p>}
        {investments.map(inv => (
          <div key={inv.id} className="bg-white p-5 rounded shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-1">{inv.sector}</h3>
              <p>User ID: {inv.user_id}</p>
              <p>Amount: KES {inv.amount}</p>
              <p>Status: {inv.status}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => updateStatus(inv.id, 'active')}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                Activate
              </button>
              <button
                onClick={() => updateStatus(inv.id, 'failed')}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Fail
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminDashboard;
