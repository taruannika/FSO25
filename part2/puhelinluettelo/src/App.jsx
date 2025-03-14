import { useState } from "react";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);

  const initialFormData = { name: "", number: "" };
  const [formData, setFormData] = useState(initialFormData);

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

    setPersons([...persons, newPerson]);
    setFormData(initialFormData);
  };

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <AddPersonForm
        addPerson={addPerson}
        formData={formData}
        handleFormDataChange={handleFormDataChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
