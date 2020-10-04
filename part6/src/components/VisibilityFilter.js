import React from 'react';
import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const VisibilityFilter = () => {
  const dispatch = useDispatch();
  return (
    <div>
      All{' '}
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('ALL'))}
      />
      Important{' '}
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      Not Important{' '}
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('NOTIMPORTANT'))}
      />
    </div>
  );
};

export default VisibilityFilter;
