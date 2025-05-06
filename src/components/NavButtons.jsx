

import { Link } from 'react-router-dom';

const NavButtons = () => {
  return (
    <nav className="p-4 bg-gray-100">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/employee">Employee</Link></li>
      </ul>
    </nav>
  );
};

export default NavButtons;
