import { useState } from "react";
import Country from "./Country";

const CountryList = ({ countries, filter }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (!filter) return null;

  let renderValue = countries.filter((c) =>
    c.name.common.toLowerCase().startsWith(filter.toLowerCase())
  );

  if (selectedCountry) {
    return (
      <div>
        <button onClick={() => setSelectedCountry(null)}>Back</button>
        <Country country={selectedCountry} />
      </div>
    );
  }

  if (renderValue.length === 0) {
    return <p>No matches found</p>;
  }

  if (renderValue.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (renderValue.length === 1) {
    return <Country country={renderValue[0]} />;
  }

  return (
    <ul>
      {renderValue.map((c) => (
        <li key={c.name.common}>
          {c.name.common}
          <button onClick={() => setSelectedCountry(c)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
