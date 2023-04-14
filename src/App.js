import React, { createContext, useState } from 'react';

import AnswerForm from "components/forms/AnswerForm";
import Question from "components/Question";
import LoginForm from "components/forms/LoginForm";
import LogoutButton from 'components/auth/LogoutButton';

export const AuthContext = createContext(false);
export const UsernameContext = createContext('');

export default function App () {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('')

  return(
    <UsernameContext.Provider value={{username, setUsername}}>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated} }>
        { isAuthenticated ? <AnswerForm/> : null }
        { isAuthenticated ? <Question/> : null }
        { !isAuthenticated ? <LoginForm/> : null }
        { isAuthenticated ? <LogoutButton/> : null }
      </AuthContext.Provider>
    </UsernameContext.Provider>
  )
}
