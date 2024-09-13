import React, { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';

import API, { trebekbotUrls } from 'TrebekbotAPI';
import { font, palette } from 'css/css';

export default function QuestionTile ({ id, question }) {
    const [ alive, setAlive ] = useState(true);

    const styles = {
        moneyText: {
            fontFamily: font.category,      
            color: palette.moneyText,
            fontSize: '300%',
	        textAlign: 'center',
        },
        questionTile: {
            width: '10rem',
            display: 'block',
            margin: 'auto',
            marginTop: 5,
            backgroundColor: palette.questionBackground
        }
    }

    function killTile() {
        /// change tile status to dead
        API.patch(trebekbotUrls.board, {questionTileId: id})
            .then(res => {
                if (res.status == 200) {
                    setAlive = false;
                }
                else {
                    console.log('Unable to set QuestionTile to dead!')
                }
            }
        )
    }

    return(
        <div className='text-center' style={styles.categoryTile}>
            <Card>
                <Card.Body>
                    <Card.Title style={styles.categoryText}>
                        {question.value}
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}