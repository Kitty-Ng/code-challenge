import { getAllDevices } from '../services/api';

export default () => dispatch => {
  getAllDevices().then(response => {
    dispatch({
      type: 'SET_ALL_DATA',
      payload: response.data
    });
  });
};
