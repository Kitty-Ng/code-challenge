export default function allDevicesData(state = [], action) {
  if (action.type === 'SET_ALL_DATA') {
    action.payload.mockData.data.forEach(device => (device.isChecked = false));
    return action.payload.mockData.data;
  } else {
    return state;
  }
}
