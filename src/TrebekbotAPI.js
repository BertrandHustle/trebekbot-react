import axios from 'axios'

import config from '../package.json'

export default axios.create({
    baseURL: config.proxy,
  });

