

import { Link } from 'react-router-dom';

const NavButtons = () => {
  return (
    <nav className="p-4 bg-gray-100">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/employee">Employee</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/sagitecJob">Jobs</Link></li>
        <li><Link to="/sagitec-life">Life</Link></li>
        <li><Link to="/sagitec-people">People</Link></li>
      </ul>
    </nav>
  );
};

export default NavButtons;
