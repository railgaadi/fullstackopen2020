import React from 'react'

const Notification = ({ message, isFailure }) => {
    const notifStyle = {
        backgroundColor: isFailure ? 'red' : 'green',
        border: 'blue 2 solid',
        borderRadius: '3',
        padding: '5',
        color: 'white'
    }

    if (message === null) return null
    else return (
        <div className='notification' style={notifStyle}>
            <p>{message}</p>
        </div>
    )
}


export default Notification