
/// <reference types="cypress" />



describe('Login page', ()=>{
  
    it('User tries to login as a standard user',()=>{
        const username = Cypress.env('STANDARD_USER')
        const password = Cypress.env('PASSWORD')
        const url = Cypress.env('BASE_URL')
        cy.visit(url)
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.url().should('include','https://www.saucedemo.com/inventory.html')
        cy.get('button:contains("Add to cart")').should('exist')
    })


    it('User tries to login as a locked user',()=>{
      const username = Cypress.env('LOCKED_OUT_USER')
      const password = Cypress.env('PASSWORD')
      const url = Cypress.env('BASE_URL')
      cy.visit(url)
      cy.get('#user-name').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()
      cy.get('[data-test="error"]').should('have.text','Epic sadface: Sorry, this user has been locked out.')
      cy.get('svg[class*="error_icon"]').should('have.length',2)
      cy.get('button.error-button').should('exist')
    })

})