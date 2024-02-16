import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default axios.create({
  baseURL: process.env.REACT_APP_PROXY,
  xsrfCookieName: 'csrfmiddlewaretoken',
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

