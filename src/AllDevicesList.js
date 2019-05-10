import React, { useState } from 'react';
import { connect } from 'react-redux';
import apiService from './services/api.js';
import getAllDevices from './actionCreators/getAllDevices';
import CheckBox from './CheckBox';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

library.add(faDownload);

class AllDevicesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckboxes: []
    };
  }

  componentDidMount() {
    this.props.getAllDevices();
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.state.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
    // show alert with device name and path
  };

  handleAllChecked = event => {
    let allAvailableDevices = this.props.store.allDevices.mockData.data.filter(
      device => device.status === 'available'
    );

    allAvailableDevices.forEach(device => {
      device.isChecked = event.target.checked;
    });

    if (!event.target.checked) {
      allAvailableDevices = [];
    }
    console.log('allAvailableDevices', allAvailableDevices);

    this.setState({ selectedCheckboxes: allAvailableDevices });
  };

  handleCheckChildElement = event => {
    let selectedCheckboxes = [...this.state.selectedCheckboxes];

    let allAvailableDevices = this.props.store.allDevices.mockData.data.filter(
      device => device.status === 'available'
    );

    let currDevice = allAvailableDevices.find(x => x.id === event.target.id);

    if (selectedCheckboxes.find(x => x.id === currDevice.id)) {
      selectedCheckboxes = selectedCheckboxes.filter(
        x => x.id !== event.target.id
      );
    } else {
      selectedCheckboxes.push(currDevice);
    }

    selectedCheckboxes.forEach(device => {
      device.isChecked = event.target.checked;
    });

    console.log('selectedCheckboxes', selectedCheckboxes);
    this.setState({ selectedCheckboxes: selectedCheckboxes });
  };

  render() {
    let allDevices = this.props.store.allDevices.mockData;
    let selectedDevices = this.state.selectedCheckboxes;
    return (
      <div>
        {!allDevices ? (
          <h1>Fetching API data...</h1>
        ) : (
          <div>
            <input
              type="checkbox"
              onChange={this.handleAllChecked}
              value="checkedall"
            />{' '}
            {selectedDevices.length ? (
              <span>Selected {selectedDevices.length}</span>
            ) : (
              <span>None Selected</span>
            )}
            <button
              className="btn btn-default"
              type="submit"
              disabled={!selectedDevices.length}
              onClick={this.handleFormSubmit}
            >
              <FontAwesomeIcon icon="download" /> Download Selected
            </button>
            <div>
              {this.props.store.allDevices.mockData.data.map(device => {
                return (
                  <CheckBox
                    key={device.id}
                    disabled={device.status !== 'available'}
                    handleCheckChildElement={this.handleCheckChildElement}
                    {...device}
                  />
                );
              })}
            </div>
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
