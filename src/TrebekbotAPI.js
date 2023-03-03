import axios from 'axios'

import config from '../package.json'

const trebekbotAxios = axios.create({
  baseURL: config.proxy,
});

//trebekbotAxios.defaults.headers.post['X-CSRFTOKEN'] = 'csrftoken';
//trebekbotAxios.defaults.withCredentials = true;

export default trebekbotAxios;

