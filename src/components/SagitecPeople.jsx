import React from "react";

const data = {
  lives: [
    { label: "India", value: 906 },
    { label: "Maharashtra, India", value: 692 },
    { label: "Pune/Pimpri Chinchwad Area", value: 501 },
    { label: "Pune", value: 488 },
  ],
  studied: [
    { label: "Savitribai Phule Pune University", value: 104 },
    { label: "Shivaji University", value: 23 },
    { label: "Anna University Chennai", value: 15 },
    { label: "Pune Institute of Computer Technology", value: 14 },
  ],
};

const Bar = ({ value, max, label }) => (
  <div className="mb-2">
    <div className="text-sm text-gray-700 flex justify-between">
      <span>{value}</span>
      <span>{label}</span>
    </div>
    <div className="w-full bg-gray-200 h-2 rounded">
      <div
        className="h-2 bg-green-700 rounded"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  </div>
);

const AssociatedMembers = () => {
  const maxLive = Math.max(...data.lives.map(item => item.value));
  const maxStudy = Math.max(...data.studied.map(item => item.value));

  return (
    <div className="p-4 bg-white shadow-md rounded-md max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">1,324 associated members</h2>
      <input
        type="text"
        placeholder="Search employees by title, keyword or school"
        className="w-full border px-3 py-1 rounded mb-4 text-sm"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Where they live</h3>
            <button className="text-blue-500 text-sm">+ Add</button>
          </div>
          {data.lives.map((item, idx) => (
            <Bar key={idx} value={item.value} max={maxLive} label={item.label} />
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Where they studied</h3>
            <button className="text-blue-500 text-sm">+ Add</button>
          </div>
          {data.studied.map((item, idx) => (
            <Bar key={idx} value={item.value} max={maxStudy} label={item.label} />
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="text-sm text-gray-600 hover:underline">Show more</button>
      </div>
    </div>
  );
};

export default AssociatedMembers;
