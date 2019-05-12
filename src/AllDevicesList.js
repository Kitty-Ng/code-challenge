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
      selectedDevices: [],
      isSelectAllChecked: false
    };
  }

  componentDidMount() {
    this.props.getAllDevices();
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.state.selectedDevices) {
      console.log(checkbox, 'is selected.');
    }
    // show alert with device name and path
  };

  handleAllChecked = event => {
    let selectedDevices = [];
    let isSelectAllChecked = event.currentTarget.checked;

    if (isSelectAllChecked) {
      selectedDevices = [...this.props.allAvailableDevices];
    }

    this.setState({ selectedDevices, isSelectAllChecked });
  };

  handleCheckChildElement = event => {
    let selectedDevices = [...this.state.selectedDevices];
    let currDevice = this.props.allAvailableDevices.find(
      x => x.id === event.target.id
    );

    if (selectedDevices.find(x => x.id === currDevice.id)) {
      selectedDevices = selectedDevices.filter(
        x => x.id !== event.currentTarget.id
      );
    } else {
      selectedDevices.push(currDevice);
    }
    this.setState({
      selectedDevices,
      isSelectAllChecked:
        this.props.allAvailableDevices.length === selectedDevices.length
    });
  };

  render() {
    let allDevices = this.props.allDevices;
    let selectedDevices = this.state.selectedDevices;
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
              checked={this.state.isSelectAllChecked}
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
              {this.props.allDevices.map(device => {
                return (
                  <CheckBox
                    {...device}
                    key={device.id}
                    isChecked={
                      this.state.selectedDevices.find(
                        x => x.id === device.id
                      ) || false
                    }
                    disabled={device.status !== 'available'}
                    handleCheckChildElement={this.handleCheckChildElement}
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
  allDevices: store.allDevices,
  allAvailableDevices: store.allDevices.filter(
    device => device.status === 'available'
  )
});

const mapDispatchToProps = {
  getAllDevices
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllDevicesList);
