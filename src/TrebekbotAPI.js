import axios from 'axios'

export default axios.create({
  baseURL: process.env.REACT_APP_PROXY,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  withCredentials: true,
  withXSRFToken: true
});

export const trebekbotUrls = {
  'judgeAnswer': '/game/judge/',
  'login': '/game/login/',
  'getQuestion': '/game/question/',
  'topTen': '/game/topten/',
  'score': '/game/score'
}

