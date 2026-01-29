import React from 'react';

const Hero = () => {
  return (
    <section className="bg-white text-gray-900 py-20 px-5 text-center">
      <h1 className="text-5xl font-bold mb-5">BIG BROTHER INVESTMENTS</h1>
      <p className="text-xl mb-8">
        Invest in transport, agriculture, furniture, rentals and earn monthly returns.
      </p>
      <a 
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        Start Investing
      </a>
    </section>
  );
}

export default Hero;
