const AddPersonForm = ({ addPerson, formData, handleFormDataChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleFormDataChange}
        />
      </div>
      <div>
        <label htmlFor="number">number:</label>
        <input
          type="text"
          name="number"
          id="number"
          autoComplete="off"
          value={formData.number}
          onChange={handleFormDataChange}
        />
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
