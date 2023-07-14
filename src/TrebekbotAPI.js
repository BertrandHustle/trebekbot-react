import axios from 'axios'

import config from '../package.json'

const trebekbotAxios = axios.create({
  baseURL: config.proxy,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  withCredentials: true
});

export const trebekbotUrls = {
  'judgeAnswer': '/game/judge/',
  'login': '/game/login/',
  'getQuestion': '/game/question/',
  'topTen': '/game/topten/',
  'score': '/game/score'
}

export default trebekbotAxios;
