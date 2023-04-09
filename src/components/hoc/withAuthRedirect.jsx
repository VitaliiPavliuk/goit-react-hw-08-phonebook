import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from 'redux/selectors';

export const withAuthRedirect = (Component, redirectTo) => {
  const ComponentWithRedirect = props => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return isLoggedIn ? <Component {...props} /> : <Navigate to={redirectTo} />;
  };

  return ComponentWithRedirect;
};
