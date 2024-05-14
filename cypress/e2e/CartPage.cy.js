/// <reference types="cypress" />
import CartPage from "../pages/CartPage";
import loginPage from "../pages/LoginPage"


describe('Cart page', () => {

    const login = new loginPage();
    const cartPage = new CartPage();
    const standardUser = Cypress.env('STANDARD_USER')
    const errorUser = Cypress.env('ERROR_USER')
    const password = Cypress.env('PASSWORD')

    beforeEach(()=>{
        login.visitLoginPage()
    })

    it('Standard user tries to add an item to cart', () => {
        login.typeUserName(standardUser)
        login.typePassword(password)
        login.clickLoginButton();
        cartPage.addItemToCart('Sauce Labs Fleece Jacket');
        cy.xpath('//button[@id="remove-sauce-labs-fleece-jacket"]').should('exist')
        cartPage.clickOnCart();
        cy.url().should('include', 'https://www.saucedemo.com/cart.html')
        cy.xpath(cartPage.removeButton).should('exist')
        cy.get('div.cart_quantity').should('contain', '1')
        cy.get('#checkout').should('exist')
        cy.get('#continue-shopping').should('exist')

    })

    it('Error user tries to remove an added backpack', () => {
        login.typeUserName(errorUser)
        login.typePassword(password)
        login.clickLoginButton();
        cartPage.addItemToCart('Sauce Labs Backpack');
        cartPage.clickOnCart();
        cartPage.clickOnRemoveButton();
        cy.xpath('//div[@class="inventory_item_name" and contains(text(),"Sauce Labs Backpack")]').should('not.exist')

    })


})