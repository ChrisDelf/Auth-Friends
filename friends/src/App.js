import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import SimpleMenu from './components/SimpleMenu';
import FriendsList from './components/FriendsList';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
    <SimpleMenu />
    <Route path="/login" component={LoginForm}/>
    <PrivateRoute exact path="/friends" component={FriendsList} />
    </Router>
  );
}

export default App;
