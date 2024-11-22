import React, { useState } from 'react';

import { QuestionContext, QuestionAudioLinks, QuestionVisualLinks, TimerContext, WagerContext } from 'App';
import Card from 'react-bootstrap/Card';

import API, { trebekbotUrls } from 'TrebekbotAPI';
import { font, palette } from 'css/css';

export default function QuestionTile ({ id, question }) {
    const [ alive, setAlive ] = useState(true);
    const { question, setQuestion } = useContext(QuestionContext);
    const { setQuestionAudioLinks } = useContext(QuestionAudioLinks);
    const { setQuestionVisualLinks } = useContext(QuestionVisualLinks);
    const { setTime } = useContext(TimerContext);
    const { wager } = useContext(WagerContext);

    const styles = {
        moneyText: {
            fontFamily: font.category,      
            color: palette.moneyText,
            fontSize: '300%',
	        textAlign: 'center'
        },
        questionTile: {
            height: '5.5rem',
            width: '10rem',
            margin: 'auto',
            marginTop: 5,
            backgroundColor: palette.questionBackground
        }
    }

    function arrayAudioVisualLinks(links) {
        let audioLinkArray = [];
        let visualLinkArray = [];
        links.forEach(link => {
            if (link.endsWith('.wav') || link.endsWith('.mp3')) {
                audioLinkArray.push(link);
            }
            if (link.endsWith('.jpg')) {
                visualLinkArray.push(link);
            }
        });
        return [audioLinkArray, visualLinkArray];
    };

    function selectTile() {
        API.post(trebekbotUrls.question, id)
            .then(res => {
                let parsedData = JSON.parse(res.data);
                setTime(60);
                setQuestion(parsedData);
                let [audioLinkArray, visualLinkArray] = arrayAudioVisualLinks(parsedData.valid_links);
                setQuestionAudioLinks(audioLinkArray);
                setQuestionVisualLinks(visualLinkArray);
                sessionStorage.setItem('questionId', parsedData.id)
            }
        )
    }

    function killTile() {
        /// change tile status to dead
        API.patch(trebekbotUrls.board, {questionTileId: id})
            .then(res => {
                if (res.status === 200) {
                    setAlive(false);
                }
                else {
                    console.log('Unable to set QuestionTile to dead!')
                }
            }
        )
    }

    return(
        <div>
            <Card className='d-flex' onClick={selectTile} style={styles.questionTile}>
                <Card.Body className='d-flex align-items-center justify-content-center'>
                    <Card.Title style={styles.moneyText}>
                        {question.value}
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}