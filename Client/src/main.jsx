import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App.jsx';
import './index.css';
import './about.css'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// import './index.css';
// import './about.css';
// import { BrowserRouter } from 'react-router-dom';
// import AssociatedMembers from './components/SagitecPeople.jsx';
// import JobListing from './components/sagitecJob.jsx';
// import { Profile } from './components/demo.jsx';
// import TrendingPosts from './components/sagitec-life.jsx';
// import ProductCards from './components/product.jsx';
// import SagitecHeader from './components/emp.jsx';
// import About from './components/about.jsx';
// import NavButtons from './components/NavButtons.jsx';




// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       </>
//     </BrowserRouter>
//   </React.StrictMode>
// );
