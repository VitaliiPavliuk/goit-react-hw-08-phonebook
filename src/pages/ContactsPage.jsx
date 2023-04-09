import React from 'react';
import { useSelector } from 'react-redux';

import { selectContactsStatus } from '../redux/selectors';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Loader } from 'components/Loader/Loader';
import { withAuthRedirect } from 'components/hoc/withAuthRedirect';
import { ContactsList } from 'components/ContactList/ContactsList';

function ContactsPage() {
  const status = useSelector(selectContactsStatus);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ContactForm />

      {status === 'pending' && <Loader />}

      <ContactsList />
    </div>
  );
}

export default withAuthRedirect(ContactsPage, '/login');
