import React from 'react';

const products = [
  {
    title: "Neospin - pension administration software system",
    subtitle: "Benefits Administration Software",
    description:
      "Sagitec’s Neospin™ pension administration software is a fully integrated, browser-based software system with comprehensive functionality for administering pension benefits. Since 2004, our Neospin™ pension administration software has helped public and private pension funds enhance service capabilities, lower operating costs, stave off technical…",
    skilledCount: 38,
  },
  {
    title: "Xelence - Sagitec's low-code/no-code platform. Helping d...",
    subtitle: "No-Code Development Platforms",
    description:
      "Xelence is Sagitec’s Low-Code/No-Code Platform and helps you build simple consumer to complex enterprise applications without traditional programming. It doesn't matter if you are a professional developer or a business user. Anyone can build applications with Xelence, as it is a visual environment, offering drag and drop features and incorporates in-built enterprise…",
    skilledCount: 11,
  },
];

const ProductCard = ({ title, subtitle, description, skilledCount }) => (
  <div className="bg-white shadow rounded-lg p-4 mb-4">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        <img src="https://sagitec.com/wp-content/uploads/2020/07/Sagitec_logo.png" alt="sagitec logo" className="h-8 w-8" />
        <div>
          <h2 className="font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <button className="border px-3 py-1 rounded text-sm font-medium text-gray-600 hover:bg-gray-100">
        + Add as skill
      </button>
    </div>
    <div className="flex items-center mt-3 text-sm text-gray-500">
      <div className="flex items-center mr-2">
        <div className="w-6 h-6 rounded-full bg-gray-300 mr-1" />
        <div className="w-6 h-6 rounded-full bg-gray-300 mr-1" />
        <span className="text-sm">+8</span>
      </div>
      <span>{skilledCount} in network skilled with this</span>
    </div>
    <p className="mt-2 text-sm text-gray-700">{description}</p>
  </div>
);

export default function ProductCards() {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {products.map((p, idx) => (
        <ProductCard key={idx} {...p} />
      ))}
    </div>
  );
}
