import React from 'react';

import Card from 'react-bootstrap/Card';

import { font, palette } from 'css/css';

export default function CategoryTile ({ category }) {

    const styles = {
        categoryText: {
            fontFamily: font.category,      
            color: palette.questionText,
            fontSize: '125%',
	        textAlign: 'center',
            paddingTop: 'auto'
        },
        categoryTile: {
            height: '5.5rem',
            width: '10rem',
            margin: 'auto',
            marginTop: 5,
            backgroundColor: palette.questionBackground
        }
    }

    return(
        <div>
            <Card className='d-flex' style={styles.categoryTile}>
                <Card.Body className='d-flex align-items-center justify-content-center'>
                    <Card.Title style={styles.categoryText}>
                        {category}
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}