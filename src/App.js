import React, { useEffect, useState } from 'react';

import AnswerForm from "components/forms/AnswerForm";
import Question from "components/Question";
import LoginForm from "components/forms/LoginForm";

export default function App () {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    function checkIfAuthenticated() {
      const authenticated = localStorage.getItem('isAuthenticated')
      if (authenticated) {
        setIsAuthenticated(true);
      }
    }
    window.addEventListener('storage', checkIfAuthenticated)

    return () => {
      window.removeEventListener('storage', checkIfAuthenticated)
    }
  });

  return(
    <>
    { isAuthenticated ? <AnswerForm/> : null}
    { isAuthenticated ? <Question/> : null}
    { !isAuthenticated ? <LoginForm/> : null }
    </>
  )
}
