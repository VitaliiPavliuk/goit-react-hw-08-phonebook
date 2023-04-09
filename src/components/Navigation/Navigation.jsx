import React from 'react';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { selectIsLoggedIn } from 'redux/selectors';
import { Loader } from 'components/Loader/Loader';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { NavLinkSt, NavSt, Wrapper } from './Navigation.styled';

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <NavSt>
        {isLoggedIn ? (
          <Wrapper>
            <div>
              <NavLinkSt to="/">Home</NavLinkSt>
              <NavLinkSt to="/contacts">Contacts</NavLinkSt>
            </div>

            <UserMenu />
          </Wrapper>
        ) : (
          <>
            <NavLinkSt to="/">Home</NavLinkSt>
            <NavLinkSt to="/register">Register</NavLinkSt>
            <NavLinkSt to="/login">Login</NavLinkSt>
          </>
        )}
      </NavSt>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
