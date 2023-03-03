import React, {useState} from 'react';

import AnswerForm from "components/forms/AnswerForm";
import Question from "components/Question";
import LoginForm from "components/forms/LoginForm";

export default function App () {

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return(
    <>
    <AnswerForm auth={isAuthenticated}/>
    <Question auth={isAuthenticated}/>
    <LoginForm/>
    </>
  )
}
