import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { urlReactSignIn } from '../endpoints';

export default function AuthRoute({ element: Element, ...rest }) {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
      <Route
        {...rest}
        element={isLoggedIn ? <Element /> : <Navigate to={urlReactSignIn} />}
      />
    );
};