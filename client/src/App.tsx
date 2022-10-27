import React from 'react';
import './App.sass';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import AuthGuard from './api/auth/guard';
import Dashboard from './pages/dashboard';
import NotFound from './components/util/NotFound';
import Login from './components/auth/Login';
import NavMessage from './components/util/NavMessage';

function App() {
  return (
    <BrowserRouter basename='/'>
      <div className="app">
        <NavMessage />
        <h1>Vercel MERN Stack</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/' element={<AuthGuard type="user" />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path='/' element={<AuthGuard type="guest" />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
