import React, { Component } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false
  };

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));
    handleCheckboxChange(label);
  };

  render() {
    const { label, disabled } = this.props;
    const { isChecked } = this.state;
    return (
      <label>
        <input
          type="checkbox"
          value={label}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
          disabled={disabled}
        />
      </label>
    );
  }
}

export default Checkbox;
