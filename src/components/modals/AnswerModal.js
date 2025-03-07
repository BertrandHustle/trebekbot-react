import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { QuestionContext, ScoreContext, UsernameContext, TimerContext, ToastMessageContext, TopTenContext, WagerContext } from 'App';
import API, { trebekbotUrls } from 'TrebekbotAPI';
import './modals.css'

export default function AnswerForm() {

	const [ answer, setAnswer ] = useState('');
	const { question, setQuestion } = useContext(QuestionContext);
	const { setScore } = useContext(ScoreContext);
	const { setTime } = useContext(TimerContext);
	const { setToastMessage } = useContext(ToastMessageContext);
	const { setTopTen } = useContext(TopTenContext);
	const { username } = useContext(UsernameContext);
	const { wager, setWager } = useContext(WagerContext)

	const handleChange = (e) => {
		setAnswer(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		API.post(trebekbotUrls.judgeAnswer, {
			userAnswer: answer,
			questionId: question.id,
			wager: wager ? wager : null
		}).then(function (response) {

			setToastMessage(response.data.text);
			setScore(response.data.score);
			setTopTen(topTen => ({ ...topTen, [username]: response.data.score }))

			let result = response.data.result;
			// if question is answered correctly
			if (result === true) {
				setWager(0);
				setTime(0);
				setQuestion();
				sessionStorage.setItem('timer', 0);
				sessionStorage.setItem('questionId', null);
			}
		})
	}

	return (
		<div className='text-center'>
			<Modal show="true">
				<Modal.Header className='answer-form'>
					<Modal.Title>{question.category}</Modal.Title>
				</Modal.Header>
				<Modal.Body className='answer-form'>
					<Form onSubmit={handleSubmit} className='mt-3'>
						<Form.Group className='mb-3'>
							<Form.Text className='answer-text'>{question.text}</Form.Text>
							<br></br>
							<Form.Control type="text" value={answer} onChange={handleChange} />
						</Form.Group>
						<Button variant='primary' type='submit' disabled={question ? false : true} className='text-center mb-5'>
							Submit
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	)
}