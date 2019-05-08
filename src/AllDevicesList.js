import React, { useState } from 'react';
import { connect } from 'react-redux';
import apiService from './services/api.js';
import getAllDevices from './actionCreators/getAllDevices';
import Device from './Device';
import Checkbox from './Checkbox';

class AllDevicesList extends React.Component {
  componentDidMount() {
    this.props.getAllDevices();
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = device => {
    if (this.selectedCheckboxes.has(device)) {
      this.selectedCheckboxes.delete(device);
    } else {
      this.selectedCheckboxes.add(device);
    }
  };

  createCheckbox = device => (
    <div key={device.id}>
      <Checkbox
        label={device.name}
        handleCheckboxChange={this.toggleCheckbox}
        disabled={device.status !== 'available'}
      />
      <Device
        id={device.id}
        name={device.name}
        device={device.device}
        path={device.path}
        status={device.status}
      />
    </div>
  );

  createCheckboxes = () =>
    this.props.store.allDevices.mockData.data.map(this.createCheckbox);

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
  };

  render() {
    let allDevices = this.props.store.allDevices.mockData;
    return (
      <div>
        {!allDevices ? (
          <h1>Fetching API data...</h1>
        ) : (
          <div>
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn btn-default" type="submit">
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

const mapDispatchToProps = {
  getAllDevices
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllDevicesList);
