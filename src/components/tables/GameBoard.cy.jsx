import GameBoard from './GameBoard.jsx'

describe('<GameBoard />', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GameBoard />)
  })
})