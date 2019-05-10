import React, { Component } from 'react';
import Device from './Device';

export const CheckBox = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <input
        key={props.id}
        onChange={props.handleCheckChildElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.name}
        disabled={props.disabled}
        id={props.id}
      />
      <Device
        name={props.name}
        device={props.device}
        path={props.path}
        status={props.status}
      />
    </div>
  );
};

export default CheckBox;
