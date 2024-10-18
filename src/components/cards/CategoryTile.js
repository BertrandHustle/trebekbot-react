import React from 'react';

import Card from 'react-bootstrap/Card';

import { font, palette } from 'css/css';

export default function CategoryTile ({ category }) {

    const styles = {
        categoryText: {
            fontFamily: font.category,      
            color: palette.categoryText,
            fontSize: '100%',
	        textAlign: 'center',
        },
        categoryTile: {
            width: '10rem',
            display: 'block',
            margin: 'auto',
            marginTop: 5,
            backgroundColor: palette.questionBackground
        }
    }

    return(
        <div className='text-center' style={styles.categoryTile}>
            <Card>
                <Card.Body>
                    <Card.Title style={styles.categoryText}>
                        {category}
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}