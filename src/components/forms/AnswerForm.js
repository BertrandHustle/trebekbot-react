import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { QuestionContext, ScoreContext, UsernameContext, TimerContext, ToastMessageContext, TopTenContext, WagerContext } from 'App';
import API from 'TrebekbotAPI';
import { trebekbotUrls } from 'TrebekbotAPI';


export default function AnswerForm() {

	const [ answer, setAnswer ] = useState('');
	const { question, setQuestion } = useContext(QuestionContext);
	const { setScore } = useContext(ScoreContext);
	const { setTime } = useContext(TimerContext);
	const { setToastMessage } = useContext(ToastMessageContext);
	const { setTopTen } = useContext(TopTenContext);
	const { username } = useContext(UsernameContext);
	const { wager } = useContext(WagerContext)

	const styles = {
		answerForm: {
			display: 'block',
			maxWidth: '30ch',
			margin: 'auto',
		}
	}

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

			// TODO: fix issue where this only displays once if user guesses same answer twice in a row
			setToastMessage(response.data.text);
			setScore(response.data.score);
			setTopTen(topTen => ({ ...topTen, [username]: response.data.score }))

			let result = response.data.result;
			// if question is answered correctly
			if (result === true) {
				setTime(0);
				setQuestion();
			}
		})
	}

	return (
		<div className='text-center'>
			<Form style={styles.answerForm} onSubmit={handleSubmit} className='mt-3'>
				<Form.Group className='mb-3'>
					<Form.Label>Answer</Form.Label>
					<Form.Control type="text" value={answer} onChange={handleChange} />
				</Form.Group>
				<Button variant='primary' type='submit' disabled={question ? false : true} className='text-center mb-5'>
					Submit
				</Button>
			</Form>
		</div>
	)
}