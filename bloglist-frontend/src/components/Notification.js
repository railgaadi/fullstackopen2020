import React from 'react';

const Notification = ({ notification }) => {
  const style = {
    padding: 10,
    border: '2px solid yellow',
    fontSize: 20,
  };
  return (
    <p id='notification' style={style}>
      {notification}
    </p>
  );
};

export default Notification;
