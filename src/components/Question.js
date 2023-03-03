import React, {useState} from 'react';

import API from 'TrebekbotAPI';

const timerLength = 60;

export default function Question () {
    const [timer, setTimer] = useState(setInterval());
    const [question, setQuestion] = useState('');
    const [value, setValue] = useState('');
    const [category, setcategory] = useState('');
    const [remainingTime, setRemainingTime] = useState(0);

    
    function startTimer() {
        setTimer(setInterval(tickTimer, timerLength))
    }

    function tickTimer() {
        if (remainingTime === 0) {
            clearInterval(timer);
        }
        else {
            setRemainingTime -= 1
        }
    }

    function loadQuestion() {
        startTimer();
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
            <button> onClick={loadQuestion} </button>
            <h1>Time: {remainingTime}</h1>

            <h3>Question: {question}</h3>
            <h3>Value: {value}</h3>
            <h3>Category: {category}</h3>
        </div>
    )
}       


