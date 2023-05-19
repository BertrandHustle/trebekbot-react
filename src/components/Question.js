import { QuestionContext } from 'App';
import React, {useContext, useEffect, useState} from 'react';

import API from 'TrebekbotAPI';

export default function Question () {
    const { question, setQuestion } = useContext(QuestionContext);
    const [ questionIsLive, setQuestionIsLive ] = useState(false);
    const timerLength = 60;

    function Timer () {
        const [remainingTime, setRemainingTime] = useState(timerLength);
    
        useEffect(() => {
            if (remainingTime === 0) {
                setQuestionIsLive(false);
                return;
            }

            const timer = setInterval(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
            
            return () => clearInterval(timer);
        }, [remainingTime]);
    
        return(
            <div>
                <h1>Time: {remainingTime}</h1>
            </div>
        )
    }

    function loadQuestion() {
        setQuestionIsLive(true);
        API.get("/game/question")
            .then(res => {
                setQuestion(JSON.parse(res.data));
            }
        )
    };

    return (
        <div>
            { questionIsLive ? <Timer/> : null }
            <button onClick={loadQuestion}> Get Question </button>
            <h3>Question: {questionIsLive ? question.text : null}</h3>
            <h3>Value: {questionIsLive ? question.value : null}</h3>
            <h3>Category: {questionIsLive ? question.category : null}</h3>
        </div>
    )
}       


