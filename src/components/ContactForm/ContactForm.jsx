import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Button } from '@mui/material';

import { selectContacts } from 'redux/selectors';
import { requestAddContact } from 'redux/contacts/contacts.operations';

import { ContactFormSt } from './ContactForm.styled';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const nameInputRef = useRef();
  const phoneInputRef = useRef();

  const contacts = useSelector(selectContacts);

  const handleSubmit = async event => {
    event.preventDefault();

    const contact = {
      name: nameInputRef.current.value,
      number: phoneInputRef.current.value,
    };

    if (
      contacts.some(
        c => c.name.toLowerCase().trim() === contact.name.toLowerCase().trim()
      )
    ) {
      toast.error(`${contact.name} is already in contacts.`);
      return;
    }

    try {
      await dispatch(requestAddContact(contact)).unwrap();
      toast.success(`The contact was successfully added to your phonebook!`);
    } catch (error) {
      toast.error(`Oops! Something went wrong... ${error}`);
    }
    reset();
  };

  const reset = () => {
    nameInputRef.current.value = '';
    phoneInputRef.current.value = '';
  };

  return (
    <ContactFormSt onSubmit={handleSubmit}>
      <h1 style={{ textAlign: 'center' }}>Phonebook</h1>
      <label>
        <p>Name</p>
        <input
          ref={nameInputRef}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <p>Number</p>
        <input
          ref={phoneInputRef}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />
      <Button variant="contained" type="submit">
        Add contact
      </Button>
    </ContactFormSt>
  );
};
