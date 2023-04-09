import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Tooltip } from '@mui/material';
import { toast } from 'react-toastify';

import { selectUserEmail } from 'redux/selectors';
import { requestLogout } from 'redux/user/user.operations';
import { MenuSt } from './UserMenu.styled';

export const UserMenu = () => {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await dispatch(requestLogout()).unwrap();
      toast.success(`You've successfully logged out!`);
    } catch (error) {
      toast.error(`Oops! Something went wrong... ${error}`);
    }
  };

  return (
    <MenuSt>
      <p>{userEmail}</p>

      <Tooltip title="Logout">
        <IconButton onClick={handleLogOut}>
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </MenuSt>
  );
};
