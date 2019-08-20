import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import SimpleMenu from './components/SimpleMenu';
import FriendsList from './components/FriendsList';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
    <SimpleMenu />
    <Route path="/login" component={LoginForm}/>
    <Route exact path="/friends" component={FriendsList} />
    </Router>
  );
}

export default App;
