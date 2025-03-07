import React from 'react';

import Card from 'react-bootstrap/Card';

import './cards.css'

export default function CategoryTile ({ category }) {

    return(
        <div>
            <Card className='d-flex category-tile'>
                <Card.Body className='d-flex align-items-center justify-content-center'>
                    <Card.Title className='category-text'>
                        {category}
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}