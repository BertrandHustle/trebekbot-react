import React, { createContext, useEffect, useState } from 'react';

import AnswerForm from "components/forms/AnswerForm";
import TopTenTable from 'components/Scoreboard'; 
import Question from "components/Question";
import LoginForm from "components/forms/LoginForm";
import LogoutButton from 'components/auth/LogoutButton';
import API from 'TrebekbotAPI';
import { trebekbotUrls } from 'TrebekbotAPI';

const initAuthValue = JSON.parse(sessionStorage.getItem('isAuthenticated'));
const initUsernameValue = sessionStorage.getItem('username');

export const AuthContext = createContext(initAuthValue);
export const UsernameContext = createContext(initUsernameValue);
export const QuestionContext = createContext();
export const TopTenContext = createContext();

export default function App () {

  const [isAuthenticated, setIsAuthenticated] = useState(initAuthValue);
  const [username, setUsername] = useState(initUsernameValue);
  const [question, setQuestion] = useState({});
  const [topTen, setTopTen] = useState();

  useEffect(() => {
    API.get(trebekbotUrls.topTen)
      .then((response) => {
        setTopTen(response.data);
      });
  }, []);

  return(
    <QuestionContext.Provider value={{ question, setQuestion }}>
      <UsernameContext.Provider value={{ username, setUsername }}>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          { isAuthenticated ? <Question/> : null }
          { !isAuthenticated ? <LoginForm/> : null }
          { isAuthenticated ? <LogoutButton/> : null }
          <TopTenContext.Provider value={{ topTen, setTopTen }}>
            { isAuthenticated ? <AnswerForm/> : null }
            { isAuthenticated && topTen ? <TopTenTable/> : null }
          </TopTenContext.Provider>
        </AuthContext.Provider>
      </UsernameContext.Provider>
    </QuestionContext.Provider>
  )
}
