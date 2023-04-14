import { useContext, useState } from 'react';

import { AuthContext, UsernameContext } from 'App';
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

// function getSession () {
//     API.get("/game/session/", {
//       credentials: "same-origin",
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       if (data.isAuthenticated) {

//         localStorage.setItem('isAuthenticated', true);
//       } else {
//         localStorage.setItem('isAuthenticated', false);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }
  

export default function LoginForm() {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const { username, setUsername } = useContext(UsernameContext);

    // function getUsername () {
    //   API.get("/game/get-username/", {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "same-origin",
    //   })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("You are logged in as: " + data.username);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }
    
  function login (event, uname, pass) {
      event.preventDefault();
      API({
        method: 'post',
        url: '/game/login/',
        auth: {
          username: uname,
          password: pass
        }
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('username', uname);
        setIsAuthenticated(true);
        setUsername(uname);
      })
      .catch((err) => {
        console.log(err);
        return {error: "Wrong username or password."};
      });
    }
    

    const [formUsername, setFormUsername] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [error, setError] = useState('');

    function handleLogin (e) {
        e.preventDefault();
        const loginResult = login(e, formUsername, formPassword);
        if (loginResult && 'error' in loginResult){
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
                <input type="text" className="form-control" id="username" name="username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} />
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
