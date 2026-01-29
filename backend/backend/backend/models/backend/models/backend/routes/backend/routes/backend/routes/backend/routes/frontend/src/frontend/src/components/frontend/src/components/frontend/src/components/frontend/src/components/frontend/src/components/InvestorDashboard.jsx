import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvestorDashboard = () => {
  const [investments, setInvestments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://bigbrotherinvestments.co.ke/api/invest/my',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInvestments(res.data);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Error fetching investments');
      }
    };

    fetchInvestments();
  }, []);

  return (
    <section className="bg-white py-20 px-5 text-center">
      <h2 className="text-4xl font-bold mb-10">My Investments</h2>
      {message && <p className="text-red-600 mb-4">{message}</p>}
      <div className="max-w-4xl mx-auto space-y-4">
        {investments.length === 0 && <p>You have no investments yet.</p>}
        {investments.map(inv => (
          <div key={inv.id} className="bg-gray-100 p-5 rounded shadow-md">
            <h3 className="text-2xl font-semibold mb-2">{inv.sector}</h3>
            <p>Amount: KES {inv.amount}</p>
            <p>Status: {inv.status}</p>
            <p>ROI: {inv.roi_percent}%</p>
            <p>Start Date: {inv.start_date ? new Date(inv.start_date).toLocaleDateString() : 'N/A'}</p>
            <p>End Date: {inv.end_date ? new Date(inv.end_date).toLocaleDateString() : 'N/A'}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InvestorDashboard;
