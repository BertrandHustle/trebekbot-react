import React from 'react';

import { vi, describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'

import GameBoard from '@components/tables/GameBoard';
import CategoryTile from '@components/cards/CategoryTile';
import API, { trebekbotUrls } from 'TrebekbotAPI';


test("CategoryTile", () => {
    const mockBoardReponse = require('./fixtures/mockBoardResponse.json');
    const ActiveQuestionTileIdContext = React.createContext(1)

    const testServer = setupServer(
      http.get(trebekbotUrls.board, (req, res, ctx) => {
        return HttpResponse(mockBoardReponse)
      })
    )

    sessionStorage.setItem('isAuthenticated', true);

    render(
      <ActiveQuestionTileIdContext.Provider>
        <GameBoard/>
      </ActiveQuestionTileIdContext.Provider>
    );

    const gameBoard = screen.getByRole("Container");

    expect(gameBoard).toBeInTheDocument();
});
