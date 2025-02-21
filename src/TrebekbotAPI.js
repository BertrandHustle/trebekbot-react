import axios from 'axios'

console.log(process.env.REACT_APP_PROXY)

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
  'question': '/game/question/',
  'topTen': '/game/topten/',
  'score': '/game/score/',
  'board': '/game/board/'
}
