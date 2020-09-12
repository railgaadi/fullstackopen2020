import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

//Display component, with conditional logic

const Display = ({ filterCountries }) => {

    if (filterCountries.length) {
        // if (filterCountries.length === 1) {
        //     return (
        //         <div>
        //             <Details country={filterCountries[0]} />
        //         </div>
        //     )
        // }
        if (filterCountries.length > 10) {
            return <p>Narrow your search</p>
        }
        else return (
            <div>
                {filterCountries.map(country => <Country key={country.numericCode} country={country} />
                )}
            </div>)
    }
    return <p>Filter countries</p>
}

const Country = ({ country }) => {

    const [seeMore, setSeeMore] = useState(false)

    return (
        < div >
            <li >
                {country.name}
                <button onClick={() => setSeeMore(!seeMore)}>{seeMore ? 'hide' : 'show'}</button>
                {seeMore ? <Details country={country} seeMore={seeMore} /> : null}
            </li>
        </div >
    )
}

const Details = ({ country, seeMore }) => {
    const [weather, setWeather] = useState({})
    useEffect(() => {
        if (seeMore) {
            axios
                .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
                .then((response) => {
                    setWeather(response.data.main)
                })
                .catch((error) => console.log(
                    error))
        }
    }, [country, seeMore])
    return (
        <div>
            <img src={country.flag} alt="" height={100} />
            <h3>Languages in {country.name}</h3>
            <ul>
                {country.languages.map(l =>
                    <li key={l.iso639_1}>{l.name}</li>)}
            </ul>
            <h3>Weather in {country.capital}</h3>
            <ul>
                <li><b>Max temp</b>: {weather.temp_max} degree fahrenheit</li>
                <li><b>Min temp</b>: {weather.temp_min} degree fahrenheit</li>
                <li><b>Pressure</b>: {weather.pressure}</li>
            </ul>
        </div>)

}

export default Display
