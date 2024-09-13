import { BoardIdContext } from 'App';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import API, { trebekbotUrls } from 'TrebekbotAPI';

export default function GameBoard () {
    const { boardId, setBoardId } = useContext(BoardIdContext);
    const [ questionTiles, setQuestionTiles ] = useState([]);
    const [ numRows, setNumRows ] = useContext(0);
    const [ categories, setCategories ] = useContext(0); // also acts as columns
    
    function createCategoriesArray(questionArray) {
        // create an array of every category in the questions array returned from Trebekbot's backend
        return [...new Set(questionArray.map(({category}) => category))];
    }

    useEffect(() => {
        if (boardId == null) {
            API.post(trebekbotUrls.board)
                .then(res => {
                    let parsedData = JSON.parse(res.data);
                    setId(parsedData.boardId);
                    setQuestionTiles(parsedData.questionTiles)
                })
        } 
        else {
            API.get(trebekbotUrls.board)
                .then(res => {
                    let parsedData = JSON.parse(res.data);
                    setQuestionTiles(parsedData.questionTiles)
                })
        }

        setCategories(createCategoriesArray(questionTiles));
        setNumRows(questionTiles.length / numRows.length);

    }, [boardId, setQuestionTiles, setRows, setCategories] )

    return(
        <div>
            <Container>
                {categories.map(cat => <Col key={cat}>{cat}</Col>)}
            </Container>
        </div>
    )
}