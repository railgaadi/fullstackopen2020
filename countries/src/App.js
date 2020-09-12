import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Display from './components/Display'

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);

  //Fetch Initial Data

  useEffect(() => {
    const request = axios.get(`https://restcountries.eu/rest/v2/all`)
    request.then(response => setCountries(response.data))
  }, [])

  //Handle search input change

  const handleFilter = (e) => {
    setSearch(e.target.value)
  }

  //Dynamically filter countries when search input changes

  useEffect(() => {
    if (search) {
      let searchResults = countries.filter(c => c.name.toUpperCase().includes(search.toUpperCase()))
      setFilterCountries(searchResults)
    }
    else setFilterCountries([])
  }, [search, countries])

  //HTML

  return (
    <div>
      <h1>Country Lookup</h1>
      <input value={search} onChange={handleFilter} />
      <h1>Results</h1>
      <Display filterCountries={filterCountries} />
    </div>
  )
}


export default App;
