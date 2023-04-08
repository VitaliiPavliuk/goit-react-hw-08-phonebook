import React, { useEffect } from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import ContactForm from '../components/ContactForm/ContactForm';
import {
  selectContacts,
  selectContactsStatus,
  selectIsLoggedIn,
} from '../redux/selectors';
// import { Loader } from '../components';

import { toast } from 'react-toastify';
// import { withAuthRedirect } from '../hoc/withAuthRedirect';
import {
  requestDeleteContact,
  requestUserContacts,
} from 'redux/contacts/contacts.operations';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Loader } from 'components/Loader/Loader';

function ContactsPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const status = useSelector(selectContactsStatus);
  const contacts = useSelector(selectContacts);
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
      {contacts !== null && (
        <ul>
          {contacts.map(contact => {
            return (
              <li key={contact.id}>
                <p>
                  <b>Name:</b> {contact.name}
                </p>
                <p>
                  <b>Number:</b> {contact.phone}
                </p>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  variant="outlined"
                  //   startIcon={<DeleteIcon />}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ContactsPage;

// export default withAuthRedirect(ContactsPage, '/login');
