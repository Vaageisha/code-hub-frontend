import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './authContext.jsx' 
import ProjectRoutes from './Routes.jsx';
import {BrowserRouter as Router} from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <Router>
     <ProjectRoutes />
  </Router>
   
  </AuthProvider>
);
