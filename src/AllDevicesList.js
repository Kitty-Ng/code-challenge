import React, { useState } from 'react';
import { connect } from 'react-redux';
import apiService from './services/api.js';
import getAllDevices from './actionCreators/getAllDevices';
import Device from './Device';
import Checkbox from './Checkbox';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

library.add(faDownload);

class AllDevicesList extends React.Component {
  state = {
    selectedCheckboxes: []
  };

  componentDidMount() {
    this.props.getAllDevices();
  }

  toggleCheckbox = device => {
    let selectedDevices = [...this.state.selectedCheckboxes];

    if (selectedDevices.includes(device)) {
      selectedDevices = selectedDevices.filter(x => x.id !== device.id);
    } else {
      selectedDevices.push(device);
    }

    this.setState({
      selectedCheckboxes: selectedDevices
    });
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.state.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
  };

  checkStatus = device => {
    console.log(this.state.selectedCheckboxes);
    if (this.state.selectedCheckboxes.includes(device)) {
      return true;
    } else {
      return false;
    }
  };

  createCheckbox = device => (
    <div key={device.id}>
      <h1>{this.state.selectedCheckboxes.includes(device)}</h1>
      <Checkbox
        label={device.name}
        isChecked={this.checkStatus(device)}
        onChange={() => this.toggleCheckbox(device)}
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

  render() {
    let allDevices = this.props.store.allDevices.mockData;
    return (
      <div>
        {!allDevices ? (
          <h1>Fetching API data...</h1>
        ) : (
          <div>
            <form onSubmit={this.handleFormSubmit}>
              <button className="btn btn-default" type="submit">
                <FontAwesomeIcon icon="download" /> Download
              </button>
              {this.createCheckboxes()}
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
