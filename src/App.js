import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Orders from './pages/Orders';
import Scanning from './pages/Scanning';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { urlReactHome, urlReactOrders, urlReactScanning, urlReactSignUp, urlReactSignIn, urlReactSettings } from './endpoints';
import { Navigate, Outlet } from 'react-router-dom';
import Settings from './pages/Settings';

export default function App() {
  function ProtectedRoute () {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
      isLoggedIn ? (<Outlet />) : (<Navigate to={urlReactSignIn} replace />)
    );
  }

  function AnonymousRoute () {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
      isLoggedIn ? (<Navigate to={urlReactHome} replace />) : (<Outlet />)
    );
  }

  return (
    <Router>
      <Layout>
          <Routes>
            <Route path={urlReactHome} element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path={urlReactOrders} element={<Orders />} />
              <Route path={urlReactScanning} element={<Scanning />} />
              <Route path={urlReactSettings} element={<Settings />} />
            </Route>
            <Route element={<AnonymousRoute />}>
              <Route path={urlReactSignUp} element={<SignUp />} />
              <Route path={urlReactSignIn} element={<SignIn />} />
            </Route>
          </Routes>
      </Layout>
    </Router>
  );
}
