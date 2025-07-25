import Table from 'react-bootstrap/Table'

import API from 'TrebekbotAPI';
import { TopTenContext } from 'App';
import { useContext, useEffect } from 'react';
import { trebekbotUrls } from 'TrebekbotAPI';
import './tables.css'

export default function Scoreboard() {

	const { topTen, setTopTen } = useContext(TopTenContext);

	useEffect(() => {
		API.get(trebekbotUrls.topTen)
			.then((response) => {
				setTopTen(response.data);
			});
	}, [setTopTen])

	const topTenData = Object.entries(topTen).map(([username, score]) =>
		<tr key={username + score}>
			<td>{username}</td>
			<td>{score}</td>
		</tr>
	)

	return (
		<Table striped bordered variant="dark" className='position-absolute bottom-0 end-0 scoreboard'>
			<thead>
				<tr>
					<th>Player</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				{topTenData}
			</tbody>
		</Table>
	);
}
