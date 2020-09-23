// Package
import React, { useState, useEffect } from "react";
//Components
import Display from "./components/Display";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
//Services
import phonebookService from "./services/phonebook";

const App = () => {
  //State Variables
  const [filterPersons, setFilterPersons] = useState([]);
  const [isFailure, setIsFailure] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);
  const [persons, setPersons] = useState([]);

  //Initial Fetch
  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilterPersons(initialPersons);
    });
  }, []);

  //Add new person
  const handleFormSubmit = (event) => {
    const foundPerson = isDuplicate();
    //Check if duplicate
    if (foundPerson) {
      event.preventDefault();
      window.confirm(
        `${newName} is already in the phonebook, replace old number with new number?`
      );

      //Update number if user wants to
      const updatedPerson = { ...foundPerson, number: newNumber };
      phonebookService
        .update(foundPerson.id, updatedPerson)
        .then((updatedPerson) => {
          setsMessage(`Updated ${updatedPerson.name}`);
          setPersons(
            persons.map((person) =>
              person.id !== foundPerson.id ? person : updatedPerson
            )
          );
          setFilterPersons(
            persons.map((person) =>
              person.id !== foundPerson.id ? person : updatedPerson
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setsMessage(`${updatedPerson.name} was deleted from server already`);
          setIsFailure(true);
        });
      setNewName("");
    }

    //Add new person if no duplicate
    else {
      event.preventDefault();
      const personObj = { name: newName, number: newNumber };
      phonebookService
        .create(personObj)
        .then((newPerson) => {
          setsMessage(`Added ${newName}`);
          setIsFailure(false);
          setPersons(persons.concat(newPerson));
          setFilterPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setsMessage(error.response.data.error);
          setIsFailure(true);
        });
    }
  };

  //Deleting person
  const handleDelete = (id, name) => {
    window.confirm(`Delete ${name}?`);
    phonebookService.deleteOne(id).then(() => {
      phonebookService.getAll().then((response) => {
        setPersons(response);
        setFilterPersons(response);
        setsMessage(`Deleted ${name}`);
      });
    });
  };

  //Dynamic filter based on user input
  const handleFilter = (event) => {
    const filterQuery = event.target.value.toUpperCase();
    setFilterPersons(
      persons.filter((person) =>
        person.name.toUpperCase().includes(filterQuery)
      )
    );
  };

  //Function checking for duplicate
  const isDuplicate = () => {
    const foundPerson = persons.find((person) => person.name === newName);
    return foundPerson;
  };

  //Function setting notification message
  const setsMessage = (message) => {
    setNotifMessage(message);
    setTimeout(() => {
      setNotifMessage(null);
    }, 2000);
  };

  //Rendering app
  return (
    <div>
      <Notification message={notifMessage} isFailure={isFailure} />
      <h1>Filter</h1>
      <Filter handleFilter={handleFilter} />
      <h1>Phonebook</h1>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h1>Numbers</h1>
      <ul>
        {filterPersons.map((person) => (
          <Display
            key={person.id}
            id={person.id}
            name={person.name}
            number={person.number}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
