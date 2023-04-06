import { useState } from 'react';
import { ContactFormSt, AddBtn } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const [contactForm, setContactForm] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();

  const handleInputChange = ({ target: { name, value } }) => {
    setContactForm(prev => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      contacts.some(
        c => c.name.toLowerCase() === contactForm.name.toLowerCase()
      )
    ) {
      alert(`${contactForm.name} is already in contacts.`);
      return;
    }

    const contact = {
      name: contactForm.name,
      phone: contactForm.number,
    };

    dispatch(addContact(contact));

    e.currentTarget.reset();
    reset();
  };

  const reset = () => {
    setContactForm({ name: '', number: '' });
  };

  return (
    <ContactFormSt onSubmit={handleSubmit}>
      <label>
        <p>Name</p>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <p>Number</p>
        <input
          type="tel"
          name="number"
          onChange={handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />
      <AddBtn type="submit">Add contact</AddBtn>
    </ContactFormSt>
  );
};
