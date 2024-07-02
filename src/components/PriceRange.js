import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Range } from 'react-range';

const PriceRange = ({ min, max, onChange }) => {
  const [values, setValues] = useState([min, max]);

  const handleChange = (newValues) => {
    const sortedValues = newValues.sort((a, b) => a - b);
    setValues(sortedValues);
    onChange(sortedValues[0], sortedValues[1]);
  };

  return (
    <div style={{padding: '20px'}}>
      <Range
        step={10}
        min={min}
        max={max}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#EDEEF3',
              borderRadius: '3px'
            }}
          >
            <div
              style={{
                position: 'absolute',
                height: '100%',
                width: `${((values[1] - values[0]) / (max - min)) * 100}%`,
                left: `${((values[0] - min) / (max - min)) * 100}%`,
                backgroundColor: '#3A4980',
                borderRadius: '3px'
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '24px',
              width: '24px',
              backgroundColor: '#3A4980',
              borderRadius: '50%',
              boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
        )}
      />
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <Form.Control
          type="number"
          value={values[0]}
          min={min}
          max={values[1]}
          style={{ color: '#1A064F', fontWeight: '400', width: 'calc(35% - 5px)', marginRight: '5px' }}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), values[1]);
            setValues([value, values[1]]);
            onChange(value, values[1]);
          }}
        />
        <Form.Control
          type="text"
          value={`$${values[1]}`}
          min={values[0]}
          max={max}
          style={{ color: '#1A064F', fontWeight: '400', width: 'calc(35% - 5px)' }}
          onChange={(e) => {
            const stringValue = e.target.value.replace('$', '');
            const value = Math.max(Number(stringValue), values[0]);
            setValues([values[0], value]);
            onChange(values[0], value);
          }}
        />
      </div>
    </div>
  );
};

export default PriceRange;
