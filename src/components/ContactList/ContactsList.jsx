import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { selectIsLoggedIn, selectfilteredContacts } from 'redux/selectors';
import {
  requestDeleteContact,
  requestUserContacts,
} from 'redux/contacts/contacts.operations';

export const ContactsList = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const filteredContacts = useSelector(selectfilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;

    dispatch(requestUserContacts());
  }, [dispatch, isLoggedIn]);

  const handleDeleteContact = async contacId => {
    try {
      await dispatch(requestDeleteContact(contacId)).unwrap();
      toast.success(`The contact was successfully deleted!`);
    } catch (error) {
      toast.error(`Oops! Something went wrong... ${error}`);
    }
  };

  return (
    <>
      {filteredContacts.length !== 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <List dense sx={{ width: '100%', maxWidth: 480 }}>
            {filteredContacts.map(contact => {
              return (
                <ListItem key={contact.id}>
                  <ListItemText
                    divider="true"
                    primary={`${contact.name}: ${contact.number}`}
                  />

                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDeleteContact(contact.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </div>
      )}
    </>
  );
};
