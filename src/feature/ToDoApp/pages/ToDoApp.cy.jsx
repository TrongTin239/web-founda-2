import React from 'react'
import ToDoApp from './ToDoApp'

describe('<ToDoApp />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ToDoApp />)
  })
})