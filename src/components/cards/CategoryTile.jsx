import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';

import './cards.css'

export default function CategoryTile ({ alive, category }) {

    const [ isAlive ] = useState(alive);

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