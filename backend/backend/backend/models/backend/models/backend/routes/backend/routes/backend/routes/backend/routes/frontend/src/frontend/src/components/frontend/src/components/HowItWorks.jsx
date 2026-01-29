import React from 'react';

const HowItWorks = () => {
  const steps = [
    "1️⃣ Register an account as an investor.",
    "2️⃣ Choose a sector: transport, agriculture, furniture, or rentals.",
    "3️⃣ Invest a minimum of KES 20,000 up to 100,000.",
    "4️⃣ Make payment via M-Pesa.",
    "5️⃣ Receive monthly ROI based on your investment."
  ];

  return (
    <section className="bg-gray-100 py-20 px-5 text-center">
      <h2 className="text-4xl font-bold mb-10">How It Works</h2>
      <ul className="max-w-xl mx-auto space-y-4 text-lg text-gray-700">
        {steps.map((step, index) => (
          <li key={index} className="bg-white p-5 rounded-lg shadow-md">
            {step}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HowItWorks;
