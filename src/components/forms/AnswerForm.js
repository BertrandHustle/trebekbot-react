import { useContext, useState } from 'react';

import { UsernameContext } from 'App';
import API from 'TrebekbotAPI';


export default function AnswerForm() {

  const [ answer, setAnswer ] = useState('');
  const [ score, setScore ] = useState(0);
  const { username, setUsername } = useContext(UsernameContext);

  const handleChange = (e) => {
    setAnswer(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/game/judge", {
      userAnswer: answer
    }).then(function (response) {
      alert(response.data.text);
      setScore(response.data.score);
      // prevent browser from refreshing
      e.preventDefault();
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