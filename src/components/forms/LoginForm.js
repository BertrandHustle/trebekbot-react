import { useContext, useState } from 'react';

import { AuthContext, UsernameContext } from 'App';
import API from 'TrebekbotAPI';
import { trebekbotUrls } from 'TrebekbotAPI';

export default function LoginForm() {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const { username, setUsername } = useContext(UsernameContext);
    const [ formUsername, setFormUsername ] = useState('');
    const [ formPassword, setFormPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ newsMessage, setNewsMessage ] = useState('');
      
    function login (event, uname, pass) {
        event.preventDefault();
        API({
          method: 'post',
          url: trebekbotUrls.login,
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
          if (data.new) {
            setNewsMessage("New user created! Thanks for signing up for Trebekbot.");
          }
        })
        .catch((err) => {
          console.log(err);
          setError("Username or password incorrect!");
        });
    }

    function handleLogin (e) {
        e.preventDefault();
        login(e, formUsername, formPassword);
    }

    return (
        <div className="container mt-3">
            <h1>React Cookie Auth</h1>
            <br />
            { newsMessage && 
              <div class="alert alert-primary" role="alert">
                {newsMessage}
              </div>
            }
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} />
            </div>
            { error && 
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            }
            <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
  }
