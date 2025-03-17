import { useEffect, useState } from "react";
import { Persons, Filter, AddPersonForm } from "./components";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const initialFormData = { name: "", number: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  const personsToShow = filter ? filteredPersons : persons;

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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

    if (hasAdded) {
      alert(`${name} is already added to phonebook`);
      setFormData(initialFormData);
      return;
    }

    personService.create(newPerson).then((data) => {
      setPersons([...persons, data]);
      setFormData(initialFormData);
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          setErrorMessage(`${person.name} was already removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
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

      {errorMessage && <p>{errorMessage}</p>}

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
