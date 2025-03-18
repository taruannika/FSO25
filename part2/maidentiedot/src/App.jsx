import { useEffect } from "react";
import { useState } from "react";
import countryService from "./services/countryService";
import { CountryList, Filter } from "./components";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService
      .getAllCountries()
      .then((countries) => setCountries(countries))
      .catch((error) => {
        console.log("Error fetching countries", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <Filter filter={filter} onHandleChange={handleFilterChange} />
      <CountryList countries={countries} filter={filter} />
    </div>
  );
};

export default App;
