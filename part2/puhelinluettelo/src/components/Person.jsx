const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>Del</button>
    </li>
  );
};

export default Person;
