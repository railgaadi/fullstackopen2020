import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Button, Fade } from 'react-bootstrap';

const Togglable = props => {
  const [visible, setVisible] = useState(false);
  let contentRef = useRef();
  const toggleVisibility = () => {
    setVisible(!visible);
    window.scrollTo({ behavior: 'smooth', top: contentRef.current.offsetTop });
  };

  Togglable.propTypes = {
    openLabel: PropTypes.string.isRequired,
    closeLabel: PropTypes.string.isRequired,
  };

  return (
    <div className='mt-2'>
      <Button
        variant='primary'
        onClick={toggleVisibility}
        aria-controls='collapse-form'
        aria-expanded={visible}
      >
        {visible ? props.closeLabel : props.openLabel}
      </Button>
      <Fade in={visible}>
        <div ref={contentRef} id='collapse-form'>
          {props.children}
        </div>
      </Fade>
    </div>
  );
};

export default Togglable;
