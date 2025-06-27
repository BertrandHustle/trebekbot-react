import { vi, describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'

import GameBoard from 'components/tables/GameBoard';
import CategoryTile from 'components/cards/CategoryTile';
import API, { trebekbotUrls } from 'TrebekbotAPI';
import mockBoardReponse from 'fixtures/mockBoardReponse.json'


describe("CategoryTile", () => {
  it("should render a dead category tile when all question tiles are dead'", () => {

    const testServer = setupServer(
      http.get(trebekbotUrls.board, (req, res, ctx) => {
        return HttpResponse(mockBoardReponse)
      })
    )

    window.sessionStorage(setItem('isAuthenticated', true))

    //render(<GameBoard/>);

    const gameBoard = screen.getByRole("Container");

    expect(gameBoard).toBeInTheDocument();
  });
});
