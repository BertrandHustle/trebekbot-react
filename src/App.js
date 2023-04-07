import React, { useEffect, useState } from 'react';

import AnswerForm from "components/forms/AnswerForm";
import Question from "components/Question";
import LoginForm from "components/forms/LoginForm";
import LogoutButton from 'components/auth/LogoutButton';

export default function App () {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    function checkIfAuthenticated() {
      const authenticated = localStorage.getItem('isAuthenticated')
      let authBool = JSON.parse(authenticated);
      if (authBool) {
        setIsAuthenticated(true);
      }
      else if (!authBool) {
        setIsAuthenticated(false);
      }
    }
    window.addEventListener('storage', checkIfAuthenticated)

    return () => {
      window.removeEventListener('storage', checkIfAuthenticated)
    }
  });

  return(
    <>
    { isAuthenticated ? <AnswerForm/> : null }
    { isAuthenticated ? <Question/> : null }
    { !isAuthenticated ? <LoginForm/> : null }
    { isAuthenticated ? <LogoutButton/> : null }
    </>
  )
}
