import { QuestionContext, TimerContext } from 'App';
import React, {useContext, useState} from 'react';

import API from 'TrebekbotAPI';

import { trebekbotUrls } from 'TrebekbotAPI';

export default function Question () {
    const { setTime } = useContext(TimerContext);
    const { question, setQuestion } = useContext(QuestionContext);
    const [ questionIsLive, setQuestionIsLive ] = useState(false);

    const styles = {
        text: {
            fontFamily: "Swiss911",      
            color: 'black',
        }
    }

    function loadQuestion() {
        setQuestionIsLive(true);
        API.get(trebekbotUrls.getQuestion)
            .then(res => {
                setTime(60);
                setQuestion(JSON.parse(res.data));
            }
        )
    };

    return (
        <div style={styles.text}>
            <button onClick={loadQuestion}> Get Question </button>
            <h3>Question: {questionIsLive ? question.text : null}</h3>
            <h3>Value: {questionIsLive ? question.value : null}</h3>
            <h3>Category: {questionIsLive ? question.category : null}</h3>
        </div>
    )
}       


