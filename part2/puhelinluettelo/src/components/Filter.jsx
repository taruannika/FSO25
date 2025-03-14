const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      <label htmlFor="filter">Filter shown with:</label>
      <input
        type="text"
        name="filter"
        id="filter"
        autoComplete="off"
        value={filter}
        onChange={handleFilter}
      />
    </div>
  );
};

export default Filter;
