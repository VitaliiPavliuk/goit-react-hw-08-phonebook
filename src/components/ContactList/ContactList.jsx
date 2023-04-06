import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectfilteredContacts } from 'redux/selectors';
import { ContactListItem, DeleteBtn } from './ContactList.styled';
import { fetchContacts, deleteContact } from 'redux/operations';

export const ContactList = () => {
  const filteredContacts = useSelector(selectfilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {filteredContacts.map(contact => {
        return (
          <ContactListItem key={contact.id}>
            {contact.name}: {contact.phone}
            <DeleteBtn
              type="button"
              onClick={() => {
                dispatch(deleteContact(contact.id));
              }}
            >
              Delete
            </DeleteBtn>
          </ContactListItem>
        );
      })}
    </ul>
  );
};
