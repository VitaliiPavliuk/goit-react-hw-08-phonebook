import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn, selectUserStatus } from 'redux/selectors';

export const withAuthRedirect = (Component, redirectTo) => {
  const ComponentWithRedirect = props => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userStatus = useSelector(selectUserStatus);

    return isLoggedIn && userStatus !== 'pending' ? (
      <Component {...props} />
    ) : (
      <Navigate to={redirectTo} />
    );
  };

  return ComponentWithRedirect;
};
