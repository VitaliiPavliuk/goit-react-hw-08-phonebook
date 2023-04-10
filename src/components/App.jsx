import React, { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import { requestRefreshUser } from 'redux/user/user.operations';
import {
  selectIsLoggedIn,
  selectToken,
  selectUserStatus,
} from 'redux/selectors';
import { Navigation } from './Navigation/Navigation';
import { Loader } from './Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage'));

const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userStatus = useSelector(selectUserStatus);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    // const token = localStorage.getItem('token');

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
  }, [dispatch, isLoggedIn, token]);

  return userStatus === 'pending' ? (
    <Loader />
  ) : (
    <div style={{ padding: '20px' }}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />

          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
