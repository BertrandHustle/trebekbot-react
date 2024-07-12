import React, {useContext, useEffect} from 'react';

import { font } from 'css/css';
import TimerLight from './TimerLight';
import { QuestionContext, TimerContext, WagerContext } from 'App';

export default function Timer () {
    const { wager, setWager } = useContext(WagerContext);
    const { setQuestion } = useContext(QuestionContext);
    const { time, setTime } = useContext(TimerContext);

    const style = {
        fontFamily: font.score,
        fontSize: '300%',
        marginBottom: '2rem'
    }

    useEffect(() => {

        const timer = setInterval(() => {
            setTime(time - 1);
            sessionStorage.setItem('timer', time);
        }, 1000);

        if (time === 0) {
            if (wager) {
                setWager(0);
            }
            clearInterval(timer);
            setQuestion();
            sessionStorage.setItem('timer', 0);
            sessionStorage.setItem('questionId', null);
        }
        
        return () => clearInterval(timer);
    }, [setQuestion, time, setTime, wager, setWager]);

    // nine lights for timer

    return(
        <div className='text-center'>
            <div style={style}>
                {time}
            </div>
            <div>
                <TimerLight activationPercentage={80}/>
                <TimerLight activationPercentage={60}/>
                <TimerLight activationPercentage={40}/>
                <TimerLight activationPercentage={20}/>
                <TimerLight activationPercentage={0}/>
                <TimerLight activationPercentage={20}/>
                <TimerLight activationPercentage={40}/>
                <TimerLight activationPercentage={60}/>
                <TimerLight activationPercentage={80}/>
            </div>
        </div>
    )
}
