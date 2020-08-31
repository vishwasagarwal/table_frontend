import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/pages/LandingPage';
import DashBoard from './components/pages/dashboard';
import PrivateRoute from './components/PrivateRoute';
import AuthenticateRoute from './components/Authenticated';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthenticateRoute exact path='/' component={Landing} />
        <PrivateRoute exact path='/dashboard' component={DashBoard} />
      </Router>
    </div>
  );
}

export default App;
