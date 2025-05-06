import { Routes, Route } from 'react-router-dom';
import NavButtons from './components/NavButtons';
import { EmployeeProfile } from './components/emp';
import { Profile } from './components/ProfilePage';



 function App() {
  return (
    <div>
      <NavButtons/>
        <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/employee" element={<EmployeeProfile />} />        
        
      </Routes>
    </div>
  );
}

export default App

