import { ActiveQuestionTileIdContext, BoardIdContext } from '@/App';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import API, { trebekbotUrls } from '@/TrebekbotAPI';
import CategoryTile from '@/components/cards/CategoryTile';
import QuestionTile from '@/components/cards/QuestionTile';

export default function GameBoard () {
    const { activeQuestionTileId } = useContext(ActiveQuestionTileIdContext);  // used to force rerenders
    const { boardId, setBoardId } = useContext(BoardIdContext);
    const [ boardDict, setBoardDict ] = useState();
    const defaultRound = 'Jeopardy!'

    useEffect(() => {
        if (boardId == null) {
            API.post(trebekbotUrls.board, {round: defaultRound})
                .then(res => {
                    let parsedData = JSON.parse(res.data);
                    setBoardId(parsedData.boardId);
                    setBoardDict(parsedData.boardDict);
                    sessionStorage.setItem('boardId', parsedData.boardId)
                })
        } 
        else {
            API.get(trebekbotUrls.board, 
                {
                    params: {
                        boardId: boardId
                    }
                })
                .then(res => {
                    let parsedData = JSON.parse(res.data);
                    setBoardDict(parsedData.boardDict);
                })
        }
    }, [activeQuestionTileId, boardId, setBoardId, setBoardDict] )

    function categoryIsAlive(category) {
        return boardDict[category].some(function(tile) {return tile.alive})
    }
    
    return(
        <div>
            <Container>
                <Row>
                    {boardDict ? Object.keys(boardDict).map(cat => 
                        <Col key={cat}>
                            <CategoryTile alive={categoryIsAlive(cat)} category={cat}/>
                            {boardDict[cat].map(tile => 
                                <Col key={tile.id}>
                                    <QuestionTile alive={tile.alive} id={tile.id} tileQuestion={tile.question}/>
                                </Col>
                            )}
                        </Col>
                    ) : null}   
                </Row>
            </Container>
        </div>
    )
}


