import React, { Component } from 'react';

export const CheckBoxRow = props => {
  return (
    <tr className={'wrapper isChecked-' + props.isChecked}>
      <td>
        <input
          key={props.id}
          onChange={props.handleCheckChildElement}
          type="checkbox"
          checked={props.isChecked}
          value={props.name}
          disabled={props.disabled}
          id={props.id}
        />
      </td>
      <td>{props.name}</td>
      <td>{props.device}</td>
      <td>{props.path}</td>
      <td aria-hidden="true">
        {props.status === 'available' ? (
          <span className="available-icon" />
        ) : null}
      </td>
      <td>
        <span className={'capitalize'}>{props.status}</span>
      </td>
    </tr>
  );
};

export default CheckBoxRow;
