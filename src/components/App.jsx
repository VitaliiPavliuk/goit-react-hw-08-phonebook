import React, { lazy, Suspense, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import { requestLogout, requestRefreshUser } from 'redux/user/user.operations';
import { selectIsLoggedIn, selectUserName } from 'redux/selectors';
import { Loader } from './Loader/Loader';

// const HomePage = lazy(() => import('./pages/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage'));

const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await dispatch(requestLogout()).unwrap();
      toast.success(`You've Successfully logged out!`);
    } catch (error) {
      toast.error(`Oops! Something went wrong... ${error}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (isLoggedIn || !token) return;

    const refresh = async () => {
      try {
        await dispatch(requestRefreshUser()).unwrap();
        toast.success(`You was successfully authorized!`);
      } catch (error) {
        toast.error(`Oops! Something went wrong... ${error}`);
      }
    };

    refresh();
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <div>
        <nav>
          {isLoggedIn ? (
            <>
              {/* <NavLink to="/">Home</NavLink> */}
              <NavLink to="/contacts">Contacts</NavLink>
              <div>
                <p>User Name: {userName}</p>
                <p>User Email: user_email@gmail.com</p>
              </div>
              <button onClick={handleLogOut}>Log Out</button>
            </>
          ) : (
            <>
              {/* <NavLink to="/">Home</NavLink> */}
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </nav>

        <Suspense fallback={<Loader />}>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
