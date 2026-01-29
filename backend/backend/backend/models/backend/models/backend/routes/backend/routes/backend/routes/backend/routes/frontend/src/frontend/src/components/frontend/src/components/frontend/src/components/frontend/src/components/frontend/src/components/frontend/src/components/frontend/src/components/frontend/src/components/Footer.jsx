import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <p className="mb-2">&copy; {new Date().getFullYear()} BIG BROTHER INVESTMENTS</p>
      <p>Email: info@bigbrotherinvestments.co.ke | Phone: +254 700 000000</p>
      <p>All rights reserved.</p>
    </footer>
  );
}

export default Footer;
