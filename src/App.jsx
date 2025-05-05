import { Routes, Route } from 'react-router-dom';
import NavButtons from './components/NavButtons';
import ProfilePage from './components/ProfilePage';
import EmployeeProfilePage from './components/EmployeeProfile';
import SagitecHeader from './components/emp';
import About from './components/about';
import ProductCards from './components/product';
import JobListing from './components/sagitecJob';
import TrendingPosts from './components/sagitec-life';
import AssociatedMembers from './components/SagitecPeople';
import { Profile } from './components/demo';

 function App() {
  return (
    <div>
      <NavButtons/>
        <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/employee-profile" element={<EmployeeProfilePage />} />
        <Route path="/employee" element={<SagitecHeader />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<ProductCards />} />
        <Route path="/sagitecJob" element={<JobListing />} />
        <Route path="/sagitec-life" element={<TrendingPosts />} />
        <Route path="/sagitec-people" element={<AssociatedMembers />} />
      </Routes>
    </div>
  );
}

export default App

