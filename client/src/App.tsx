import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.sass';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import AuthGuard from './components/auth/AuthGuard';
import Dashboard from './pages/dashboard';
import NotFound from './components/util/NotFound';
import Login from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import RoleGuard from './components/roles/RoleGuard';
import AdminDashboard from './components/admin/AdminDashboard';
import NavBar from './components/util/NavMenu';
import { FormProvider } from '@codewizard-dt/use-form-hook';
import UserDetails from './components/users/UserDetails';
import Messages from './components/util/Messages';

// TODO: Roles / Authorization
// TODO: StoryBlok
// TODO: Collections


function App() {
  return (
    <BrowserRouter basename='/'>
      <div className="app">
        <NavBar items={[
          { to: '/', stretch: 'after', content: 'Home', icon: 'home' },
          // { stretch: 'self' },
          { to: '/about', content: 'About' },
          { to: '/dashboard', content: 'Dashboard' }
        ]} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/' element={<AuthGuard type="user" />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path='/' element={<FormProvider children={<AuthGuard type="guest" />} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
          <Route path="/admin" element={<RoleGuard type="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
          <Route path="/users" element={<RoleGuard type='admin' />}>
            <Route path=":userId" element={<UserDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Messages />
      </div>
    </BrowserRouter>
  );
}

export default App;
