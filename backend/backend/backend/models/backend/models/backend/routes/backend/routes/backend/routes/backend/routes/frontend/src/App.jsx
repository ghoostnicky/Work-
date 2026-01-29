import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Sectors from './components/Sectors';
import BookingForm from './components/BookingForm';
import InvestorDashboard from './components/InvestorDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <HowItWorks />
              <Sectors />
              <BookingForm />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<InvestorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
