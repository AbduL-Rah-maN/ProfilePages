import React from 'react';

export default function JobListing() {
  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-lg">
      <div className="text-center mb-4">
        <p className="text-gray-700 font-medium mb-2">
          Sagitec Solutions has 1 job opening - find the one for you.
        </p>
        <div className="flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="border rounded-md px-3 py-2 w-2/3"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-gray-600 font-semibold mb-3">Recently posted jobs</h3>
        <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition">
          <div className="flex items-start gap-4">
            <img
              src="https://sagitec.com/wp-content/uploads/2023/09/20-Years.png"
              alt="Sagitec logo"
              className="h-10 w-10 object-contain"
            />
            <div>
              <h4 className="font-semibold text-gray-800">
                Business Solutions Analyst
              </h4>
              <p className="text-sm text-gray-600">Sagitec Solutions</p>
              <p className="text-sm text-gray-600">United States</p>
              <p className="text-xs text-green-600 mt-1">
                ✅ Applicant review time is typically 1–2 weeks
              </p>
              <p className="text-xs text-gray-500 mt-1">1 week ago</p>
            </div>
          </div>
        </div>

        <div className="text-center my-3">
          <span className="inline-block w-2 h-2 bg-black rounded-full"></span>
        </div>

        <div className="text-center">
          <button className="text-blue-600 hover:underline text-sm font-medium">
            Show all jobs →
          </button>
        </div>
      </div>
    </div>
  );
}
