import axios from 'axios'

import config from '../package.json'

const trebekbotAxios = axios.create({
  baseURL: config.proxy,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  withCredentials: true
});

export default trebekbotAxios;

