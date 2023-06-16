import { useContext, useState } from 'react';

import { QuestionContext, UsernameContext, TopTenContext } from 'App';
import API from 'TrebekbotAPI';
import { trebekbotUrls } from 'TrebekbotAPI';


export default function AnswerForm() {

  const [ answer, setAnswer ] = useState('');
  const { topTen, setTopTen } = useContext(TopTenContext);
  const { username, setUsername } = useContext(UsernameContext);
  const { question, setQuestion } = useContext(QuestionContext);
  const [ score, setScore ] = useState();

  API.get(trebekbotUrls.score)
    .then((response) => {
      setScore(response.data);
    });

  const handleChange = (e) => {
    setAnswer(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post(trebekbotUrls.judgeAnswer, {
      userAnswer: answer,
      questionId: question.id
    }).then(function (response) {

      alert(response.data.text);
      setScore(response.data.score);
      setTopTen(topTen => ({...topTen, [username]: response.data.score}))

      let result = response.data.result;
      // if question is answered correctly
      if (result === true) {
        setQuestion({});
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>        
      <div>Name: {username} Score: {score}</div>
        <label>
          <input type="text" value={answer} onChange={handleChange} /> 
        </label>
      <input type="submit" value="Submit" />
    </form>
  )
}