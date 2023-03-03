import { useState } from 'react';

import API from 'TrebekbotAPI';


export default function AnswerForm() {

  const [answer, setAnswer] = useState('');

  const handleChange = (e) => {
    setAnswer(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/game/judge", {
      userAnswer: answer
    }).then(function (response) {
      alert(response);
      // prevent browser from refreshing
      e.preventDefault();
    })
  }

  return (
    <form onSubmit={handleSubmit}>        
        <label>
          Name:
          <input type="text" value={answer} onChange={handleChange} /> 
        </label>
      <input type="submit" value="Submit" />
    </form>
  )
}