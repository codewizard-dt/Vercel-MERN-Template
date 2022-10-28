import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.sass';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import AuthGuard from './components/auth/AuthGuard';
import Dashboard from './pages/dashboard';
import NotFound from './components/util/NotFound';
import Login from './components/auth/LoginForm';
import NavMessage from './components/util/NavMessage';
import RegisterForm from './components/auth/RegisterForm';

function App() {
  return (
    <BrowserRouter basename='/'>
      <div className="app">
        <NavMessage />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/' element={<AuthGuard type="user" />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path='/' element={<AuthGuard type="guest" />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
