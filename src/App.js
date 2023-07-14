import React, { createContext, useEffect, useState } from 'react';

import AnswerForm from "components/forms/AnswerForm";
import TopTenTable from 'components/Scoreboard'; 
import Question from "components/Question";
import LoginForm from "components/forms/LoginForm";
import LogoutButton from 'components/auth/LogoutButton';
import Timer from 'components/Timer';
import ToastAlert from 'components/ToastAlert';

import API from 'TrebekbotAPI';
import { trebekbotUrls } from 'TrebekbotAPI';

const initAuthValue = JSON.parse(sessionStorage.getItem('isAuthenticated'));
const initUsernameValue = sessionStorage.getItem('username');

export const AuthContext = createContext(initAuthValue);
export const UsernameContext = createContext(initUsernameValue);
export const QuestionContext = createContext();
export const TimerContext = createContext();
export const ToastMessageContext = createContext();
export const TopTenContext = createContext();

export default function App () {

  const [ isAuthenticated, setIsAuthenticated ] = useState(initAuthValue);
  const [ username, setUsername ] = useState(initUsernameValue);
  const [ question, setQuestion ] = useState({});
  const [ time, setTime ] = useState();
  const [ topTen, setTopTen ] = useState();
  const [ toastMessage, setToastMessage ] = useState();

  useEffect(() => {
    API.get(trebekbotUrls.topTen)
      .then((response) => {
        setTopTen(response.data);
      });
  }, []);

  return(
    <ToastMessageContext.Provider value={{ toastMessage, setToastMessage }}>
      { toastMessage ? <ToastAlert/> : null }
      <TimerContext.Provider value={{ time, setTime }}>
        <QuestionContext.Provider value={{ question, setQuestion }}>
          <UsernameContext.Provider value={{ username, setUsername }}>
            <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
              <TopTenContext.Provider value={{ topTen, setTopTen }}>
                  { isAuthenticated ? <Question/> : null }
                  { !isAuthenticated ? <LoginForm/> : null }
                  { isAuthenticated ? <LogoutButton/> : null }
                  { isAuthenticated ? <AnswerForm/> : null }
                  { isAuthenticated && question ? <Timer/> : null }
                  { isAuthenticated && topTen ? <TopTenTable/> : null }
              </TopTenContext.Provider>
            </AuthContext.Provider>
          </UsernameContext.Provider>
        </QuestionContext.Provider>
      </TimerContext.Provider>
    </ToastMessageContext.Provider>
  )
}
