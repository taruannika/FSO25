const AddPersonForm = ({ addPerson, newName, handleNameChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
