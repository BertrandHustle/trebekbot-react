import { useState } from 'react';

import API from 'TrebekbotAPI';

import Cookies from "universal-cookie";

const cookies = new Cookies();

// function setCSRFCookie() {
//   API.get('/game/csrf')
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data.)
//   })
// }


function getSession () {
    API.get("/game/session/", {
      credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.isAuthenticated) {
        localStorage.setItem('isAuthenticated', true);
      } else {
        localStorage.setItem('isAuthenticated', false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
function getUsername () {
    API.get("/game/get-username/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("You are logged in as: " + data.username);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
function login (event, username, password) {
    event.preventDefault();
    API.post(
      "/game/login/", 
      {payload: JSON.stringify({username: username, password: password})}
    )
    .then((data) => {
      console.log(data);
      localStorage.setItem('isAuthenticated', true);
      window.dispatchEvent(new Event('storage'));
    })
    .catch((err) => {
      console.log(err);
      return {error: "Wrong username or password."};
    });
  }
  
function logout () {
    API.post("/game/logout", {
      credentials: "same-origin",
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem('isAuthenticated', false);
    })
    .catch((err) => {
      console.log(err);
    });
  };

export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleLogin (e) {
        e.preventDefault();
        const loginResult = login(e, username, password);
        if ('error' in loginResult){
            setError(loginResult.error);
        }
    }

    return (
        <div className="container mt-3">
            <h1>React Cookie Auth</h1>
            <br />
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div>
                {error &&
                    <small className="text-danger">
                    {error}
                    </small>
                }
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}


