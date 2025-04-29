import React from 'react';
import { Link } from 'react-router-dom';

function NavButtons() {
  return (
    <div className='flex justify-end gap-4 border-b-2 p-3 pr-7 '>
        <Link to="/employee" className="text-blue-500 hover:underline">Employee</Link>
        <Link to="/user" className="text-blue-500 hover:underline">User</Link>
    </div>
  )
}

export default NavButtons;
