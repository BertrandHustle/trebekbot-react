import React, {useEffect, useState} from 'react';

import Timer from './Timer'
import API from 'TrebekbotAPI';

export default function Question () {
    const [question, setQuestion] = useState('');
    const [questionIsLive, setQuestionIsLive] = useState(false);
    const [value, setValue] = useState('');
    const [category, setcategory] = useState('');
    const timerLength = 60;

    function Timer () {
        const [remainingTime, setRemainingTime] = useState(0);
    
        useEffect(() => {
            if (remainingTime === 0) {
                setQuestionIsLive = false;
                return;
            }

            const timer = setInterval(() => {
                setRemainingTime -= 1;
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
                setQuestion(res.data.question);
                setValue(res.data.value);
                setcategory(res.data.category);
            }
        )
    };

    return (
        <div>
            { questionIsLive ? <Timer/> : null }
            <button onClick={loadQuestion}> Get Question </button>
            <h3>Question: {question}</h3>
            <h3>Value: {value}</h3>
            <h3>Category: {category}</h3>
        </div>
    )
}       


