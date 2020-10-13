import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const state = useSelector(state => state.notification);

  if (state) {
    return (
      <Alert id='notification' variant='primary' className='mt-4 mb-4'>
        {state}
      </Alert>
    );
  } else return null;
};

export default Notification;
