import React from 'react'
import ToDoForm from './ToDoForm'

describe('<ToDoForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ToDoForm />)
  })
})