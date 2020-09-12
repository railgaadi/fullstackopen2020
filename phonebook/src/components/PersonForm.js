import React from 'react'
import Input from './Input'

const PersonForm = ({ handleFormSubmit, newName, setNewName, newNumber, setNewNumber }) => (
    <form onSubmit={handleFormSubmit}>
        <div>
            name: <Input value={newName} onChange={event => setNewName(event.target.value)} />
        number: <Input value={newNumber} onChange={event => setNewNumber(event.target.value)} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm