import React, {useContext, useEffect} from 'react';

import './timer.css'
import TimerLight from './TimerLight';
import { killTile } from 'components/cards/QuestionTile';
import { ActiveQuestionTileIdContext, QuestionContext, TimerContext, WagerContext } from 'App';

export default function Timer () {
    const { activeQuestionTileId, setActiveQuestionTileId } = useContext(ActiveQuestionTileIdContext);
    const { wager, setWager } = useContext(WagerContext);
    const { setQuestion } = useContext(QuestionContext);
    const { time, setTime } = useContext(TimerContext);

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
            killTile(activeQuestionTileId, setActiveQuestionTileId);
            setQuestion();
            setActiveQuestionTileId();
            sessionStorage.setItem('timer', 0);
            sessionStorage.setItem('questionId', null);
            sessionStorage.setItem('wager', 0);
        }
        
        return () => clearInterval(timer);
    }, [activeQuestionTileId, setActiveQuestionTileId, setQuestion, time, setTime, wager, setWager]);

    // nine lights for timer

    return(
        <div className='text-center'>
            <div className='timer'>
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
