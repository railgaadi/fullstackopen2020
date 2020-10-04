import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const state = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (state) {
    return <div style={style}>{state}</div>;
  } else return null;
};

export default Notification;
