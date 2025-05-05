import { useState } from "react";
import { employeeData } from "../data/employeeData";
import {
  Email,
  Phone,
  Business,
  LocationOn,
  Language,
} from "@mui/icons-material";

function EmployeeProfilePage() {

  return (
    <div className={`min-h-screen px-6 py-10`}>
      <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{employeeData.name}</h1>
        </div>

        <p className="text-lg font-semibold mb-2">{employeeData.position}</p>
        <p className="mb-4 italic text-sm">{employeeData.department}</p>

        <div className="space-y-2">
          <p className="flex items-center">
            <Email className="mr-2" /> {employeeData.email}
          </p>
          <p className="flex items-center">
            <Phone className="mr-2" /> {employeeData.phone}
          </p>
          <p className="flex items-center">
            <Business className="mr-2" /> {employeeData.company}
          </p>
          <p className="flex items-center">
            <LocationOn className="mr-2" /> {employeeData.location}
          </p>
          <p className="flex items-center">
            <Language className="mr-2" /> {employeeData.website}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfilePage;
