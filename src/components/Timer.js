import React, {useContext, useEffect} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { QuestionContext, TimerContext, WagerContext } from 'App';

export default function Timer () {
    const { wager, setWager } = useContext(WagerContext);
    const { setQuestion } = useContext(QuestionContext);
    const { time, setTime } = useContext(TimerContext);

    const styles = {
        questionTimer: {
            width: '50rem',
            margin: 'auto',
            marginTop: 5,
        },
        remainingTime: {
            
        }
    }

    useEffect(() => {

        const timer = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        if (time === 0) {
            if (wager) {
                setWager(0);
            }
            clearInterval(timer);
            setQuestion();
        }
        
        return () => clearInterval(timer);
    }, [setQuestion, time, setTime, wager, setWager]);

    return(
        <ProgressBar now={time * -1} max={0} min={-60} style={styles.questionTimer}/>
    )
}
