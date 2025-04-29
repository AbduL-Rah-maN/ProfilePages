import { Routes, Route } from 'react-router-dom';
import NavButtons from './components/NavButtons';
import ProfilePage from './components/ProfilePage';
import EmployeeProfilePage from './components/EmployeeProfile';

function App() {
  return (
    <>
      <NavButtons />
      <Routes>
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/employee" element={<EmployeeProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
