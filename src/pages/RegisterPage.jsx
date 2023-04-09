import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

import { selectIsLoggedIn, selectUserStatus } from 'redux/selectors';
import { requestRegister } from 'redux/user/user.operations';

function RegisterPage() {
  const status = useSelector(selectUserStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const nameInputRef = useRef();
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
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    dispatch(requestRegister(formData))
      .unwrap()
      .then(res => {
        toast.success(`User ${res.user.name} successfully registered!`);
      })
      .catch(err => {
        toast.error(`Oops! Something went wrong... ${err}`);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>Register new account!</h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label>
          <p>Name:</p>
          <input type="text" ref={nameInputRef} name="userName" required />
        </label>
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
