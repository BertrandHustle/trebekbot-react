import axios from 'axios'

import proxy from '../package.json'

export default axios.create({
    baseURL: proxy
  });