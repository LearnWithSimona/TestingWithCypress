/// <reference types="cypress" />


describe('Home page', ()=>{

    it('Problem user tries to see onesie image',()=>{
        const username = Cypress.env('PROBLEM_USER')
        const password = Cypress.env('PASSWORD')
        const url = Cypress.env('BASE_URL')
        cy.visit(url)
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.get("img[alt='Sauce Labs Onesie']").should('have.attr','src','/static/media/red-onesie-1200x1500.2ec615b2.jpg')
    })


    it('Error user tries to add a fleece jacked',()=>{
        const username = Cypress.env('ERROR_USER')
        const password = Cypress.env('PASSWORD')
        const url = Cypress.env('BASE_URL')
        cy.visit(url)
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.xpath('//div[contains(text(),"Sauce Labs Fleece Jacket")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Add to cart")]').click();
        cy.xpath('//div[contains(text(),"Sauce Labs Fleece Jacket")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Add to cart")]').should('exist');
        cy.xpath('//div[contains(text(),"Sauce Labs Fleece Jacket")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Remove")]').should('not.exist');

    })


    it('Error user tries to remove an added backpack',()=>{
        const username = Cypress.env('ERROR_USER')
        const password = Cypress.env('PASSWORD')
        const url = Cypress.env('BASE_URL')
        cy.visit(url)
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.xpath('//div[contains(text(),"Sauce Labs Backpack")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Add to cart")]').click();
        cy.xpath('//div[contains(text(),"Sauce Labs Backpack")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Remove")]').click();
        cy.xpath('//div[contains(text(),"Sauce Labs Backpack")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Remove")]').should('not.exist');

    })

    it('User tries to logout as a standard user',()=>{
        const username = Cypress.env('STANDARD_USER')
        const password = Cypress.env('PASSWORD')
        const url = Cypress.env('BASE_URL')
        cy.visit(url)
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.url().should('include','https://www.saucedemo.com/inventory.html')
        cy.get('button:contains("Add to cart")').should('exist')
        cy.xpath('//button[@id="react-burger-menu-btn"]').click()
        cy.xpath('//a[@id="logout_sidebar_link"]').click();
        cy.url().should('include',url)
        cy.get('#user-name').should('have.value','')
        cy.get('#password').should('have.value','')

    })

    it.only('Error user tries to sort the items from prices low to high',()=>{
        const username = Cypress.env('ERROR_USER')
        const password = Cypress.env('PASSWORD')
        const url = Cypress.env('BASE_URL')
        cy.visit(url)
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.xpath('//span[@class="select_container"]//span[@class="active_option"]').click({ force:true });
        cy.xpath('//span[@class="select_container"]//select[@class="product_sort_container"]//option[@value="lohi"]').click({ force:true});
        cy.xpath('//span[@class="active_option" and contains(text(),"Price (low to high)")]').should('exist');

    })

    


})