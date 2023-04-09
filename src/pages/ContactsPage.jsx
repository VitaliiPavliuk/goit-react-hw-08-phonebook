import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Loader } from 'components/Loader/Loader';
import { Filter } from 'components/Filter/Filter';
import { withAuthRedirect } from 'components/hoc/withAuthRedirect';

import {
  selectContactsStatus,
  selectIsLoggedIn,
  selectfilteredContacts,
} from '../redux/selectors';
import {
  requestDeleteContact,
  requestUserContacts,
} from 'redux/contacts/contacts.operations';

function ContactsPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const status = useSelector(selectContactsStatus);

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
    <div>
      <ContactForm />

      {status === 'pending' && <Loader />}

      {filteredContacts.length !== 0 && (
        <div>
          <Filter />
          <ul>
            {filteredContacts.map(contact => {
              return (
                <li key={contact.id}>
                  <p>
                    <b>Name:</b> {contact.name}
                  </p>
                  <p>
                    <b>Number:</b> {contact.number}
                  </p>
                  <Button
                    onClick={() => handleDeleteContact(contact.id)}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default withAuthRedirect(ContactsPage, '/login');
