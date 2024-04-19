import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { font, palette } from 'css/css';
import { QuestionContext, ScoreContext, TimerContext, ToastMessageContext, WagerContext } from 'App';

export default function DailyDoubleModal() {

    const [ wagerField, setWagerField ] = useState(0);

    const { question } = useContext(QuestionContext);
    const { score } = useContext(ScoreContext);
    const { setTime } = useContext(TimerContext);
    const { setToastMessage } = useContext(ToastMessageContext);
    const { wager, setWager } = useContext(WagerContext); 

    const styles = {
        dailyDoubleModal: {
            fontFamily: font.dailyDouble,
            color: palette.questionText,
            fontSize: '300%',
            textAlign: 'center',
            width: '50rem',
            display: 'block',
            margin: 'auto',
            marginTop: 5,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        wagerForm: {
            display: 'block',
			maxWidth: '30ch',
			margin: 'auto',
        }
    }

    const handleChange = (e) => {
        setWagerField(+e.target.value);
	}

    const submitWager = (e) => {
        e.preventDefault();
        let maxWager = score >= 1000 ? score : 1000;
        if (isNaN(wagerField)){
            setToastMessage('Wager must be a number!');
        }
        else if (wagerField < 5) {
            setToastMessage('Wager must be at least $5!');
        }
        else if (wagerField > maxWager) {
            setToastMessage(`Wager cannot be more than ${maxWager}!`);
        }
        else {
            setWager(wagerField);
            setTime(60);
        }
    }

    return (
      <div> 
        <Modal show={question?.daily_double && !wager} style={styles.dailyDoubleModal} centered>
            <Modal.Header>
                <Modal.Title> Daily Double </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3'>
                    <Form.Label>Please enter a wager</Form.Label>
                    <Form.Control min='5' max={score >= 1000 ? score : 1000} type='number' onChange={handleChange} value={wagerField}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' type='submit' className='text-center mb-5' onClick={submitWager}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
  