import Table from 'react-bootstrap/Table'

import API from 'TrebekbotAPI';
import { TopTenContext } from 'App';
import { useContext, useEffect } from 'react';
import { trebekbotUrls } from 'TrebekbotAPI';

export default function TopTenTable() {

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

  // TODO: move player score into this component

  return(
    <Table striped bordered hover>
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
