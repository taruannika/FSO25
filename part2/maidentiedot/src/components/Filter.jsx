const Filter = ({ filter, onHandleChange }) => {
  return (
    <div>
      <label htmlFor="filter">find countries: </label>
      <input
        type="text"
        name="filter"
        id="filter"
        value={filter}
        onChange={onHandleChange}
      />
    </div>
  );
};
export default Filter;
