import { QuestionContext, TimerContext, WagerContext } from 'App';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import API from 'TrebekbotAPI';
import DailyDoubleModal from './modals/DailyDouble';

import { font, palette } from '/css/css';
import { trebekbotUrls } from 'TrebekbotAPI';

export default function Question () {
    // set if question is daily double but wager has not yet been entered
    const [ liveWager, setLiveWager ] = useState();
    const { setTime } = useContext(TimerContext);
    const { question, setQuestion } = useContext(QuestionContext);
    const { wager } = useContext(WagerContext);

    const styles = {
        categoryText: {
            fontFamily: font.category,      
            color: palette.categoryText,
            fontSize: '300%',
	        textAlign: 'center',
        },
        questionText: {
            fontFamily: font.question,
            fontSize: '200%',
            color: palette.questionText,
	        textAlign: 'center',
            maxWidth: '30ch',
            display: 'block',
            margin: 'auto'
        },
        card: {
            width: '50rem',
            display: 'block',
            margin: 'auto',
            marginTop: 5,
            backgroundColor: palette.questionBackground
        }
    }

    useEffect(() => {
        setLiveWager(question?.daily_double && !wager);
    }, [question, wager, setLiveWager]);

    function loadQuestion() {
        API.get(trebekbotUrls.getQuestion)
            .then(res => {
                setTime(60);
                setQuestion(JSON.parse(res.data));
            }
        )
    };

    return (
        <div className='text-center'>
            <DailyDoubleModal />
            <Card style={styles.card} className='text-center'>
                <Card.Body>
                    <Card.Title style={styles.categoryText}>
                        {question && !liveWager ? question.category : null}
                    </Card.Title>
                    <Card.Subtitle style={styles.categoryText}>
                        {question && !liveWager && !wager ? question.value : null}
                    </Card.Subtitle>
                    <Card.Subtitle style={styles.categoryText}>
                        {question && !liveWager && wager ? wager : null}
                    </Card.Subtitle>
                    <Card.Text style={styles.questionText}>
                        {question && !liveWager ? question.text : null}
                    </Card.Text>
                </Card.Body>
            </Card>
            <br></br>
            <Button variant='primary' onClick={loadQuestion} disabled={question ? true : false}> 
                Get Question 
            </Button>
        </div>
    );
}       


