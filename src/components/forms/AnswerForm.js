import { useEffect, useState } from 'react';

import API from 'TrebekbotAPI';


export default function AnswerForm() {

  const [answer, setAnswer] = useState('');
  const [username, setUsername] = useState('');

  // TODO: get username rendering working
  useEffect(() => {
    function updateUsername() {
      const storageUsername = localStorage.getItem('username');
      setUsername(storageUsername);
      console.log(storageUsername)
      console.log(username)
    }
    window.addEventListener('storage', updateUsername)

    return () => {
      window.removeEventListener('storage', updateUsername)
    }
  });

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
      <div>Name: {username}</div>
        <label>
          <input type="text" value={answer} onChange={handleChange} /> 
        </label>
      <input type="submit" value="Submit" />
    </form>
  )
}