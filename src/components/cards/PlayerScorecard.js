import { useContext } from 'react';
import Card from 'react-bootstrap/Card';

import './cards.css'
import { ScoreContext, UsernameContext } from 'App';

export default function PlayerScorecard() {
    const { username } = useContext(UsernameContext);
    const { score } = useContext(ScoreContext);

    return (
        <Card className='mt-5 fs-2 player-card'>
            <Card.Body className='d-flex align-items-center justify-content-center'>
                <Card.Title className='fs-2 player-username'>
                    {username}
                    <br></br>
                    {score}
                </Card.Title>
                <Card.Text className='player-score'/>
            </Card.Body>
        </Card>
    )
}