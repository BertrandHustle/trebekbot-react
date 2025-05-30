import React, { useContext, useEffect, useState } from 'react';

import { ActiveQuestionTileIdContext, QuestionContext, QuestionAudioLinksContext, QuestionVisualLinksContext, TimerContext } from 'App';
import Card from 'react-bootstrap/Card';

import API, { trebekbotUrls } from 'TrebekbotAPI';
import './cards.css';


export function killTile(activeQuestionTileId, setActiveQuestionTileId) {
    /// change tile status to dead
    API.patch(trebekbotUrls.board, {questionTileId: activeQuestionTileId})
        .then(res => {
            if (res.status === 200) {
                setActiveQuestionTileId();
                sessionStorage.setItem('activeQuestionTileId', null);
            }
            else {
                console.log('Unable to set QuestionTile to dead!')
            }
        }
    )
}


export default function QuestionTile ({ alive, id, tileQuestion }) {
    const [ isAlive, setIsAlive ] = useState(alive);
    const { activeQuestionTileId, setActiveQuestionTileId } = useContext(ActiveQuestionTileIdContext);
    const { setQuestion } = useContext(QuestionContext);
    const { setQuestionAudioLinks } = useContext(QuestionAudioLinksContext);
    const { setQuestionVisualLinks } = useContext(QuestionVisualLinksContext);
    const { setTime } = useContext(TimerContext);

    // TODO: make this status update a single call to /board instead of individual calls per-tile?
    useEffect(() => {
        API.get(trebekbotUrls.board, {
            params: {tileId: id}
        })
            .then(res => {
                if (res.status === 200) {
                    let tileIsAlive = JSON.parse(res.data).alive;
                    setIsAlive(tileIsAlive);
                }
                else {
                    console.log('Unable to get QuestionTile status!');
                }
            })
        sessionStorage.setItem('activeQuestionTileId', id)
    }, [activeQuestionTileId, id, setActiveQuestionTileId]);

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
        if (isAlive) {
            API.post(trebekbotUrls.question, {questionId: tileQuestion.id})
                .then(res => {
                    let parsedData = JSON.parse(res.data);
                    setActiveQuestionTileId(id);
                    setTime(60);
                    setQuestion(parsedData);
                    let [audioLinkArray, visualLinkArray] = arrayAudioVisualLinks(parsedData.valid_links);
                    setQuestionAudioLinks(audioLinkArray);
                    setQuestionVisualLinks(visualLinkArray);
                    sessionStorage.setItem('questionId', parsedData.id)
                }
            )
        }
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