/// <reference types="cypress" />
import loginPage from "../pages/LoginPage"



describe('Login page', () => {

  const login = new loginPage();
  const lockedoutUser = Cypress.env('LOCKED_OUT_USER')
  const password = Cypress.env('PASSWORD')
  const standardUser = Cypress.env('STANDARD_USER')

  beforeEach(()=>{
      login.visitLoginPage()
  })

  it('User tries to login as a standard user', () => {
    login.typeUserName(standardUser)
    login.typePassword(password)
    login.clickLoginButton();
    cy.url().should('include', 'https://www.saucedemo.com/inventory.html')
    cy.get('button:contains("Add to cart")').should('exist')
  })


  it('User tries to login as a locked user', () => {
    login.typeUserName(lockedoutUser)
    login.typePassword(password)
    login.clickLoginButton();
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    cy.get('svg[class*="error_icon"]').should('have.length', 2)
    cy.get('button.error-button').should('exist')
  })


})