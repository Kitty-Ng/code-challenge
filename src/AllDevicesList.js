import React, { useState } from 'react';
import { connect } from 'react-redux';
import apiService from './services/api.js';
import getAllDevices from './actionCreators/getAllDevices';
import CheckBoxRow from './CheckBoxRow';
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

    let formattedString = '';

    this.state.selectedDevices.forEach(checkbox => {
      formattedString =
        formattedString + checkbox.device + ': ' + checkbox.path + '\t';
    });

    window.alert(
      'Are you sure you want to download these files?' + '\n' + formattedString
    );
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

  toggleCheck = device => {
    if (this.state.selectedDevices.find(x => x.id === device.id)) {
      return true;
    } else return false;
  };

  render() {
    let selectedDevices = this.state.selectedDevices;
    return (
      <div>
        {!this.props.allDevices ? (
          <h1>Fetching API data...</h1>
        ) : (
          <div className={'responsive-table'}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      onChange={this.handleAllChecked}
                      value="checkedall"
                      checked={this.state.isSelectAllChecked}
                    />
                  </td>
                  <td>
                    {selectedDevices.length ? (
                      <span>Selected {selectedDevices.length}</span>
                    ) : (
                      <span>None Selected</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-default"
                      type="submit"
                      disabled={!selectedDevices.length}
                      onClick={this.handleFormSubmit}
                    >
                      <FontAwesomeIcon icon="download" /> Download Selected
                    </button>
                  </td>
                </tr>
                <tr className={'left-align'}>
                  <th />
                  <th>Name</th>
                  <th>Device</th>
                  <th>Path</th>
                  <th aria-hidden="true" />
                  <th>Status</th>
                </tr>
                {this.props.allDevices.map(device => {
                  return (
                    <CheckBoxRow
                      {...device}
                      key={device.id}
                      isChecked={this.toggleCheck(device)}
                      disabled={device.status !== 'available'}
                      handleCheckChildElement={this.handleCheckChildElement}
                    />
                  );
                })}
              </tbody>
            </table>
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
