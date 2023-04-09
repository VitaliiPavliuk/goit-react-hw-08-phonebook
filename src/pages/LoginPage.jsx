import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

import { selectIsLoggedIn, selectUserStatus } from '../redux/selectors';
import { requestLogin } from '../redux/user/user.operations';

function LoginPage() {
  const status = useSelector(selectUserStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;

    navigate('/contacts');
  }, [navigate, isLoggedIn]);

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    try {
      const response = await dispatch(requestLogin(formData)).unwrap();
      toast.success(`User ${response.user.name} successfully entered!`);
    } catch (error) {
      toast.error(`Oops! Something went wrong... ${error}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>Login into your account!</h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label>
          <p>Email:</p>
          <input type="email" ref={emailInputRef} name="userEmail" required />
        </label>
        <label>
          <p>Password:</p>
          <input
            type="password"
            ref={passwordInputRef}
            name="userPassword"
            minLength={7}
            required
          />
        </label>
        <br />
        <Button
          variant="contained"
          type="submit"
          disabled={status === 'pending'}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
