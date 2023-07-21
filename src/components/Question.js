import { QuestionContext, TimerContext } from 'App';
import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import API from 'TrebekbotAPI';

import { font, palette } from 'css/css';
import { trebekbotUrls } from 'TrebekbotAPI';

//TODO: prevent button from working if question is already in play

export default function Question () {
    const { setTime } = useContext(TimerContext);
    const { question, setQuestion } = useContext(QuestionContext);
    const [ questionIsLive, setQuestionIsLive ] = useState(false);

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
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: palette.questionBackground
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
        <div>
            <Card style={styles.card} className='text-center'>
                <Card.Body>
                    <Card.Title style={styles.categoryText}>
                        {questionIsLive ? question.category : null}
                    </Card.Title>
                    <Card.Subtitle style={styles.categoryText}>
                        {questionIsLive ? question.value : null}
                    </Card.Subtitle>
                    <Card.Text style={styles.questionText}>
                        {questionIsLive ? question.text : null}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Button variant='primary' onClick={loadQuestion}> Get Question </Button>
        </div>
    );
}       


