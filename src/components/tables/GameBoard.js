import { BoardIdContext } from 'App';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import API, { trebekbotUrls } from 'TrebekbotAPI';

export default function GameBoard () {
    const { boardId, setBoardId } = useContext(BoardIdContext);
    const [ questionTiles, setQuestionTiles ] = useState();
    const [ categories, setCategories ] = useState(); // also acts as columns
    
    function createCategoriesArray(questionArray) {
        // create an array of every category in the questions array returned from Trebekbot's backend
        return [...new Set(questionArray.map(({category}) => category))];
    }

    useEffect(() => {
        if (boardId == null) {
            API.post(trebekbotUrls.board)
                .then(res => {
                    let parsedData = JSON.parse(res.data);
                    setBoardId(parsedData.boardId);
                    setQuestionTiles(parsedData.questionTiles);
                    setCategories(createCategoriesArray(parsedData.questionTiles));
                })
        } 
        else if (!questionTiles) {
            API.get(trebekbotUrls.board)
                .then(res => {
                    let parsedData = JSON.parse(res.data);
                    setQuestionTiles(parsedData.questionTiles);
                    setCategories(createCategoriesArray(parsedData.questionTiles));
                })
        }
    }, [boardId, questionTiles, setBoardId, setQuestionTiles, setCategories] )
    
    return(
        <div>
            <Container>
                {categories ? categories.map(cat => <Col key={cat}>
                    {cat} {categories && questionTiles ? Array.from(Array(questionTiles.length / categories.length)).map((row, ix) => <Row key={ix}>ix</Row>) : null}
                </Col>) : null}
            </Container>
        </div>
    )
}