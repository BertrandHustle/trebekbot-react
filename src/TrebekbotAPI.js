import axios from 'axios'

import config from '../package.json'

// fix: TypeError: baseURL.replace is not a function
export default axios.create({
    baseURL: config.proxy
  });



