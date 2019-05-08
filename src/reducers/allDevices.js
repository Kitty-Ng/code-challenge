export default function allDevicesData(state = {}, action) {
  if (action.type === 'SET_ALL_DATA') {
    return action.payload;
  } else {
    return state;
  }
}
