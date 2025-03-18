import { useEffect, useState } from "react";
import { Persons, Filter, AddPersonForm, Notification } from "./components";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const initialFormData = { name: "", number: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [filter, setFilter] = useState("");
  const [notifigation, setNotifigation] = useState({
    message: null,
    hasError: false,
  });

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  const personsToShow = filter ? filteredPersons : persons;

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const { name, number } = formData;
    const newPerson = {
      name,
      number,
    };

    const hasAdded = persons.some(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );

    const person = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    const updatedPerson = { ...person, number: formData.number };

    if (hasAdded && person.number === newPerson.number) {
      alert(`${name} is already added to phonebook`);
      setFormData(initialFormData);
    } else if (hasAdded && person.number !== newPerson.number) {
      if (
        window.confirm(
          `${newPerson.name} is already added, Update number with ${formData.number}`
        )
      ) {
        personService
          .updatePerson(person.id, updatedPerson)
          .then((data) => {
            setPersons(persons.map((p) => (p.id !== person.id ? p : data)));
            setFormData(initialFormData);
            setNotifigation({
              ...notifigation,
              message: `${person.name}'s number updated successfully!`,
            });
            setTimeout(() => {
              setNotifigation({ ...notifigation, message: null });
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((data) => {
          setPersons([...persons, data]);
          setFormData(initialFormData);
          setNotifigation({
            ...notifigation,
            message: `${newPerson.name} added succesfully!`,
          });

          setTimeout(() => {
            setNotifigation({ ...notifigation, message: null });
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotifigation({
            ...notifigation,
            message: `${person.name} removed successfully`,
          });

          setTimeout(() => {
            setNotifigation({ ...notifigation, message: null });
          }, 3000);
        })
        .catch(() => {
          setNotifigation({
            message: `${person.name} was already removed from server`,
            hasError: true,
          });

          setTimeout(() => {
            setNotifigation({ message: null, hasError: false });
          }, 3000);
          // setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>

      {notifigation.message && (
        <Notification
          message={notifigation.message}
          hasError={notifigation.hasError}
        />
      )}

      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>Add new Person</h2>
      <AddPersonForm
        addPerson={addPerson}
        formData={formData}
        handleFormDataChange={handleFormDataChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
