import { Routes, Route } from 'react-router-dom';
import NavButtons from './components/NavButtons';
import { EmployeeProfile } from './components/emp';
import { Profile } from './components/UserProfile';



 function App() {
  return (
    <div>
      <NavButtons/>
      <Routes>
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/employee/:id" element={<EmployeeProfile />} />        
        
      </Routes>
    </div>
  );
}

export default App

