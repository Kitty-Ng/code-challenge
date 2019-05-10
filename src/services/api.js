import axios from 'axios';

export const getAllDevices = () =>
  axios
    .get('https://api.jsonbin.io/b/5cd1bd6a64d4fc359ead2168/2')
    .catch(error => console.log(`Error during GET request: ${error}`));
