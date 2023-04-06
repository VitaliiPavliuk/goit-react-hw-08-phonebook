import { useSelector } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { selectError, selectIsLoading } from 'redux/selectors';
import { Loader } from './Loader/Loader';

export const App = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div style={{ margin: 20 }}>
      <h1>Phonebook</h1>
      <ContactForm />

      {error && <b style={{ color: 'red' }}>Error occured: {error}</b>}
      {isLoading && !error && <Loader />}

      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};
