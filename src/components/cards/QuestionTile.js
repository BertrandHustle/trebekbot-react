import React, { useContext, useState } from 'react';

import { QuestionContext, QuestionAudioLinksContext, QuestionVisualLinksContext, TimerContext } from 'App';
import Card from 'react-bootstrap/Card';

import API, { trebekbotUrls } from 'TrebekbotAPI';
import './cards.css';

export default function QuestionTile ({ alive, id, tileQuestion }) {
    const [ isAlive, setIsAlive ] = useState(alive);
    const { setQuestion } = useContext(QuestionContext);
    const { setQuestionAudioLinks } = useContext(QuestionAudioLinksContext);
    const { setQuestionVisualLinks } = useContext(QuestionVisualLinksContext);
    const { setTime } = useContext(TimerContext);

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
        API.post(trebekbotUrls.question, {questionId: tileQuestion.id})
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
                    setIsAlive(false);
                }
                else {
                    console.log('Unable to set QuestionTile to dead!')
                }
            }
        )
    }

    return(
        <div>
            <Card style={{ filter: isAlive? 'brightness(1)': 'brightness(0.5)' }} className='d-flex question-tile' onClick={selectTile}>
                <Card.Body className='d-flex align-items-center justify-content-center'>
                    <Card.Title className='money-text'>
                        {tileQuestion.value}
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}