import React, { useState, useContext } from 'react';

import Card from 'react-bootstrap/Card';

import { BoardIdContext } from 'App';

import './cards.css'

export default function CategoryTile ({ category }) {

    const [ isAlive, setIsAlive ] = useState(alive);
    const { boardId } = useContext(BoardIdContext);

    useEffect(() => {
        API.get(trebekbotUrls.board, {
            params: {
                boardId: boardId
            }
        })
            .then(res => {
                if (res.status === 200) {
                    let parsedData = JSON.parse(res.data);
                    let categoryTiles = parsedData.map(
                        function(questionTile) { return questionTile.category === category }
                    );
                    function tileIsAlive(tile){
                        return tile.isAlive;
                    }
                    setIsAlive(categoryTiles.some(tileIsAlive));
                }
                else {
                    console.log('Unable to get QuestionTile status!');
                }
            })
        sessionStorage.setItem('activeQuestionTileId', id)
    }, [activeQuestionTileId, id, setActiveQuestionTileId]);

    return(
        <div>
            <Card className='d-flex category-tile'>
                <Card.Body className='d-flex align-items-center justify-content-center'>
                    <Card.Title className='category-text'>
                        {isAlive? category : null}
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}