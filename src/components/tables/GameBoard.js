import { BoardIdContext } from 'App';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import API, { trebekbotUrls } from 'TrebekbotAPI';
import CategoryTile from 'components/cards/CategoryTile';
import QuestionTile from 'components/cards/QuestionTile';

export default function GameBoard () {
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
        else if (!boardDict) {
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
    }, [boardId, boardDict, setBoardId, setBoardDict] )
    
    return(
        <div>
            <Container>
                <Row>
                    {boardDict ? Object.keys(boardDict).map(cat => 
                        <Col key={cat}>
                            <CategoryTile category={cat}/>
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