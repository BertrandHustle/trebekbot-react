import { useContext } from 'react';
import Button from 'react-bootstrap/Button';

import { AuthContext, UsernameContext } from 'App';

import './auth.css';
import API from 'TrebekbotAPI';

export default function LogoutButton() {

	const { setIsAuthenticated } = useContext(AuthContext);
	const { setUsername } = useContext(UsernameContext);

	function logout() {
		API.post("/game/logout/")
			.then((data) => {
				sessionStorage.setItem('isAuthenticated', false);
				sessionStorage.removeItem('username');
				setIsAuthenticated(false);
				setUsername('');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Button className='button-style' variant='outline-secondary' onClick={logout}>
			Logout
		</Button>
	);
}