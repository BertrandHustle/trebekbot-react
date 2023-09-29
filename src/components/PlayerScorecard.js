import { useContext } from 'react';
import Card from 'react-bootstrap/Card';

import { font, palette } from 'css/css';
import { ScoreContext, UsernameContext } from 'App';

export default function PlayerScorecard() {
    const { username } = useContext(UsernameContext);
    const { score } = useContext(ScoreContext);

    const styles = {
        score: {
            fontFamily: font.score,
            color: 'white',
        },
        username: {
            color: 'white',
        },
        card: {
            height: '12rem',
            width: '18rem',
            textAlign: 'center',
            margin: 'auto',
            backgroundColor: palette.questionBackground,
        }
    }

    return (
        <Card style={styles.card} className='mt-5 fs-2'>
            <Card.Body className='d-flex align-items-center justify-content-center'>
                <Card.Title style={styles.username} className='fs-2'>
                    {username}
                    <br></br>
                    {score}
                </Card.Title>
                <Card.Text style={styles.score}>
                    
                </Card.Text>
            </Card.Body>
        </Card>
    )
}