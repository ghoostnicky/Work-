import React from 'react';

const Sectors = () => {
  const sectors = [
    { name: "Transport", description: "Invest in buses, logistics, and delivery vehicles." },
    { name: "Agriculture", description: "Invest in crops, livestock, and farm projects." },
    { name: "Furniture", description: "Invest in furniture production and retail." },
    { name: "Rentals", description: "Invest in property and equipment rentals." },
  ];

  return (
    <section className="bg-white py-20 px-5 text-center">
      <h2 className="text-4xl font-bold mb-10">Our Investment Sectors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {sectors.map((sector, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-2">{sector.name}</h3>
            <p className="text-gray-700">{sector.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sectors;
