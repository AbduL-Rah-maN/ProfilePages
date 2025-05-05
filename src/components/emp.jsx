

import React from "react";
import { Link } from "react-router-dom";

function SagitecHeader() {
  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      
      <div className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white py-6 relative shadow-lg">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-yellow-400 font-extrabold text-2xl tracking-wide">VISION TO VALUE:</h2>
          <p className="text-xl font-light mt-1">
            20 Years at the Intersection of Experience and Innovation
          </p>
          <div className="mt-3 inline-block bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-full shadow-sm">
            Recognized in the GovTech 100 list of companies for seven years in a row!
          </div>
          <img
            src="https://img.icons8.com/clouds/100/000000/artificial-intelligence.png"
            className="absolute top-4 right-6 w-32 h-32 rounded-full hidden md:block"
            alt="AI Graphic"
          />
        </div>
      </div>

    
      <div className="bg-white shadow-lg rounded-b-3xl p-6 container mx-auto -mt-10 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src="https://www.sagitec.com/hs-fs/hubfs/sagitec-logo.png"
            alt="Sagitec Logo"
            className="w-20 h-20 rounded-lg border border-gray-200"
          />
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Sagitec Solutions <span className="text-blue-600 text-xl">✔</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Sagitec is a leading software platform & solutions provider, helping drive our customers' vision into action.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Software Development · St. Paul, MN · <strong>24K followers</strong> · <strong>501-1K employees</strong>
            </p>
            <p className="text-sm text-gray-500">Tanmay & 1 other connection work here</p>
          </div>
        </div>

        
        <div className="mt-5 flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md transition hover:scale-105">Message</button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md transition hover:bg-blue-50">Following</button>
          <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md transition hover:shadow">...</button>
        </div>


        <div className="mt-6 border-t pt-4 flex flex-wrap gap-4 text-gray-700 text-sm font-semibold">
          <Link to="/" className="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer hover:text-blue-800 transition">Home</Link>
          <Link to="/product" className="text-green-600 cursor-pointer hover:text-green-800 transition">Posts</Link>
          <Link to="/product" className="cursor-pointer hover:text-blue-600 transition">Products</Link>
          <Link to="/sagitecJob" className="cursor-pointer hover:text-blue-600 transition">Jobs</Link>
          <Link to="/sagitec-life" className="cursor-pointer hover:text-blue-600 transition">Life</Link>
          <Link to="/sagitec-people" className="cursor-pointer hover:text-blue-600 transition">People</Link>
        </div>
      </div>
    </div>
  );
}

export default SagitecHeader;

