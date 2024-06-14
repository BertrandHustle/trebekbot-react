import { useContext } from 'react';
import Button from 'react-bootstrap/Button';

import { AuthContext, UsernameContext } from 'App';

import API from 'TrebekbotAPI';

export default function LogoutButton() {

	const { setIsAuthenticated } = useContext(AuthContext);
	const { setUsername } = useContext(UsernameContext);

	const buttonStyle = {
		float: "right",
		display: "flex",
		position: "relative"
	}

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
		<Button style={buttonStyle} variant='outline-secondary' onClick={logout}>
			Logout
		</Button>
	);
}