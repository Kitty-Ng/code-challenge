import React, { Component } from 'react';

class Checkbox extends Component {
  render() {
    const { label, isChecked, onChange, disabled } = this.props;
    return (
      <label>
        <input
          type="checkbox"
          value={label}
          onChange={onChange}
          checked={isChecked}
          disabled={disabled}
        />
      </label>
    );
  }
}

export default Checkbox;
