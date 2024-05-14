/// <reference types="cypress" />


describe('Cart page', ()=>{

    it('Standard user tries to add an item to cart',()=>{
        const username = Cypress.env('STANDARD_USER')
        const password = Cypress.env('PASSWORD')
        const url = Cypress.env('BASE_URL')
        cy.visit(url)
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.xpath('//div[contains(text(),"Sauce Labs Fleece Jacket")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Add to cart")]').click();
        cy.xpath('//button[@id="remove-sauce-labs-fleece-jacket"]').should('exist')
        cy.get('a.shopping_cart_link').click()
        cy.url().should('include','https://www.saucedemo.com/cart.html')
        cy.xpath('//button[@id="remove-sauce-labs-fleece-jacket"]').should('exist')
        cy.get('div.cart_quantity').should('contain','1')
        cy.get('#checkout').should('exist')
        cy.get('#continue-shopping').should('exist')

    })

    it.only('Error user tries to remove an added backpack',()=>{
        const username = Cypress.env('ERROR_USER')
        const password = Cypress.env('PASSWORD')
        const url = Cypress.env('BASE_URL')
        cy.visit(url)
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.xpath('//div[contains(text(),"Sauce Labs Backpack")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Add to cart")]').click();
        cy.xpath('//div[contains(text(),"Sauce Labs Backpack")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Remove")]').should('exist');
        cy.get('a.shopping_cart_link').click()
        cy.xpath('//button[contains(text(),"Remove")]').click();
        cy.xpath('//div[@class="inventory_item_name" and contains(text(),"Sauce Labs Backpack")]').should('not.exist')

    })

    
})