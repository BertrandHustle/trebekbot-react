import { useContext, useState } from 'react';

import { AuthContext, ToastMessageContext, UsernameContext } from 'App';
import API from 'TrebekbotAPI';
import { trebekbotUrls } from 'TrebekbotAPI';

export default function LoginForm() {

    const { setIsAuthenticated } = useContext(AuthContext);
    const { setToastMessage } = useContext(ToastMessageContext);
    const { setUsername } = useContext(UsernameContext);
    const [ formUsername, setFormUsername ] = useState('');
    const [ formPassword, setFormPassword ] = useState('');
    const [ error, setError ] = useState('');

    const styles = {
      loginForm: {
        display: 'block',
        maxWidth: '30ch',
        margin: 'auto',
      },
      loginButton: {
        marginTop: 5
      },
      helpCard: {
        position: 'absolute',
        top: 0,
        left: '5rem'
      }
    }

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
        .then((resp) => {
          sessionStorage.setItem('isAuthenticated', true);
          sessionStorage.setItem('username', uname);
          setIsAuthenticated(true);
          setUsername(uname);
          if (resp.data.new) {
            setToastMessage("New user created! Thanks for signing up for Trebekbot.");
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

          <div className="text-center">
            <h1>Trebekbot</h1>
            <br />
            <h2>Login or Sign Up</h2>
          </div>

          <form onSubmit={handleLogin} style={styles.loginForm}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} />
            </div>
            { error && 
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            }
            <div className="text-center" style={styles.loginButton}>
              <button type="submit" className="btn btn-primary text-center">Login</button>
            </div>
          </form>

          <div style={styles.helpCard} className='card mt-5 w-25 mx-auto bg-primary-subtle text-body-emphasis'>
            <div className='form-text'>
              <h5 className='text-center'>
                New Players: 
              </h5>
              <h6 className='text-center'>
                enter username & password to create an account
              </h6>
              <h5 className='text-center'>
                Existing Players:
              </h5>
              <h6 className='text-center'>
                enter username & password to log in
              </h6>
            </div>
          </div>
          
        </div>
    );
  }
