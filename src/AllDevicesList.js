import React, { useState } from 'react';
import { connect } from 'react-redux';
import apiService from './services/api.js';
import getAllDevices from './actionCreators/getAllDevices';

class AllDevicesList extends React.Component {
  componentDidMount() {
    this.props.getAllDevices();
  }

  render() {
    let allDevices = this.props.store.allDevices.mockData;
    if (!allDevices) {
      return <h1>Fetching API data...</h1>;
    } else {
      return (
        <div>
          <h1>Hello world!</h1>
          <div>
            <pre>{JSON.stringify(allDevices.data, null, 2)}</pre>
          </div>
        </div>
      );
    }
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
