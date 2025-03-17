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
          .then((data) =>
            setPersons(persons.map((p) => (p.id !== person.id ? p : data)))
          );
        setFormData(initialFormData);
        setErrorMessage("Updated");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } else {
      personService
        .create(newPerson)
        .then((data) => setPersons([...persons, data]));
      setFormData(initialFormData);
      setErrorMessage("Added");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage("Removed");
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        })
        .catch(() => {
          setErrorMessage(`${person.name} was already removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
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
