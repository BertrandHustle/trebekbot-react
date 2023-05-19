import React, { createContext, useState } from 'react';

import AnswerForm from "components/forms/AnswerForm";
import Question from "components/Question";
import LoginForm from "components/forms/LoginForm";
import LogoutButton from 'components/auth/LogoutButton';

const initAuthValue = JSON.parse(sessionStorage.getItem('isAuthenticated'));
const initUsernameValue = sessionStorage.getItem('username');

export const AuthContext = createContext(initAuthValue);
export const UsernameContext = createContext(initUsernameValue);
export const QuestionContext = createContext();

export default function App () {

  const [isAuthenticated, setIsAuthenticated] = useState(initAuthValue);
  const [username, setUsername] = useState(initUsernameValue);
  const [question, setQuestion] = useState({});

  return(
    <QuestionContext.Provider value={{ question, setQuestion }}>
      <UsernameContext.Provider value={{ username, setUsername }}>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          { isAuthenticated ? <AnswerForm/> : null }
          { isAuthenticated ? <Question/> : null }
          { !isAuthenticated ? <LoginForm/> : null }
          { isAuthenticated ? <LogoutButton/> : null }
        </AuthContext.Provider>
      </UsernameContext.Provider>
    </QuestionContext.Provider>
  )
}
