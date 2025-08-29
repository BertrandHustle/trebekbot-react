import GameBoard from './GameBoard.jsx'
import React, { useContext } from 'react';
import { ActiveQuestionTileIdContext, BoardIdContext } from '@/App.jsx';

import API, { trebekbotUrls } from '@/TrebekbotAPI';

const TestActiveQuestionTileIdContextProvider = ({ value, children }) => (
  <ActiveQuestionTileIdContext.Provider value={value}>
    {children}
  </ActiveQuestionTileIdContext.Provider>
);

const TestBoardIdContextProvider = ({ value, children }) => (
  <BoardIdContext.Provider value={value}>
    {children}
  </BoardIdContext.Provider>
);


describe('<GameBoard />', () => {

	it('mounts GameBoard', () => {
		const mockActiveIdVal = {activeQuestionTileId: 1}
		const mockBoardIdVal = {boardId: 1}
		// this needs to be converted to a string
		cy.fixture('mockBoardResponse').then((mockBoardResponse) => {
			cy.intercept('POST', trebekbotUrls.board, JSON.stringify(mockBoardResponse))
		})
			
		cy.mount(
			<TestActiveQuestionTileIdContextProvider value={{ mockActiveIdVal }}>
				<TestBoardIdContextProvider value={{ mockBoardIdVal }}>
					<GameBoard />
				</TestBoardIdContextProvider>
			</TestActiveQuestionTileIdContextProvider>
		)
		cy.get('[data-cy="gameboard"]')
	})
})