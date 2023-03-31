import { useState } from "react";

import AnswerForm from "./forms/AnswerForm";
import LoginForm from "./forms/LoginForm";
import Question from './Question';


export default function Game(){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    return(
        <>
        <AnswerForm isAuthenticated={isAuthenticated}/>
        <Question isAuthenticated={isAuthenticated}/>
        <LoginForm isAuthenticated={isAuthenticated}/>
        </>
    )
}

