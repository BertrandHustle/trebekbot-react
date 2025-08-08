import axios from 'axios'

console.log(import.meta.env.VITE_PROXY)

export default axios.create({
  baseURL: import.meta.env.VITE_PROXY,
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
