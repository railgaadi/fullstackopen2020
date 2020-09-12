import React from 'react'

const Display = ({ name, number, id, handleDelete }) => <li>{name}:{number} <button onClick={() => handleDelete(id, name)}>Delete</button> </li>

export default Display