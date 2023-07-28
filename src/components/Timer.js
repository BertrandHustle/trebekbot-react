import React, {useContext, useEffect} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { QuestionContext, TimerContext } from 'App';

export default function Timer () {
    const { setQuestion } = useContext(QuestionContext);
    const { time, setTime } = useContext(TimerContext);

    const styles = {
        questionTimer: {
            width: '50rem',
            margin: 'auto',
            marginTop: 5,
        }
    }

    useEffect(() => {

        const timer = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        if (time === 0) {
            clearInterval(timer);
            setQuestion();
        }
        
        return () => clearInterval(timer);
    }, [setQuestion, time, setTime]);

    return(
        <div>
            <h1>Time: {time ? time : null}</h1>
            <ProgressBar now={time * -1} max={60} min={-60} style={styles.questionTimer} />
        </div>
    )
}
