import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import 'highlight.js/styles/github.css';
import './App.sass';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import AuthGuard from './components/auth/AuthGuard';
import Dashboard from './pages/Dashboard';
import NotFound from './components/helpers/NotFound';
import Login from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import RoleGuard from './components/auth/RoleGuard';
import AdminDashboard from './components/admin/AdminDashboard';
import NavBar from './components/helpers/NavMenu';
import { FormProvider } from '@codewizard-dt/use-form-hook';
import UserDetails from './components/users/UserDetails';
import Messages from './components/helpers/Messages';
import GetStarted from './pages/GetStarted';
import { Container } from 'semantic-ui-react';
import Documentation from './pages/Documentation';

// TODO: Roles / Authorization
// TODO: Zod?? https://zod.dev/
// TODO: StoryBlok
// TODO: Collections


function App() {
  return (
    <BrowserRouter basename='/'>
      <Container className="app">
        <NavBar items={[
          { to: '/', stretch: 'after', content: 'Home', icon: 'home' },
          { to: '/get-started', content: 'Get Started' },
          { to: '/docs', content: 'Documentation' },
          { to: '/dashboard', content: 'Dashboard' }
        ]} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path='/' element={<AuthGuard type="user" />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path='/' element={<FormProvider children={<AuthGuard type="guest" />} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
          <Route path="/admin" element={<RoleGuard type="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Outlet />} >
              <Route path=":userId" element={<UserDetails />} />

            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Messages />
      </Container>
    </BrowserRouter>
  );
}

export default App;
