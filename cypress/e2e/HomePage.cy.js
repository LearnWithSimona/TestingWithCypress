/// <reference types="cypress" />
import CartPage from "../pages/CartPage";
import loginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage";
import { vsprintf } from "sprintf-js";

describe('Home page', ()=>{

    const login = new loginPage();
    const cart = new CartPage();
    const homePage = new HomePage();
    const problemUser = Cypress.env('PROBLEM_USER')
    const errorUser = Cypress.env('ERROR_USER')
    const password = Cypress.env('PASSWORD')
    const standardUser = Cypress.env('STANDARD_USER')

    beforeEach(()=>{
        login.visitLoginPage()
    })

    it('Problem user tries to see onesie image',()=>{
        login.typeUserName(problemUser)
        login.typePassword(password)
        login.clickLoginButton();
        cy.get("img[alt='Sauce Labs Onesie']").should('have.attr','src','/static/media/red-onesie-1200x1500.2ec615b2.jpg')
    })


    it('Error user tries to add a fleece jacked',()=>{
        login.typeUserName(errorUser)
        login.typePassword(password)
        login.clickLoginButton();
        cart.addItemToCart('Sauce Labs Fleece Jacket');
        cy.xpath(vsprintf(cart.addItemToCartButton,'Sauce Labs Fleece Jacket')).should('exist');
        cy.xpath(homePage.removeFleeceJacketButton).should('not.exist');

    })


    it('Error user tries to remove an added backpack',()=>{
        login.typeUserName(errorUser)
        login.typePassword(password)
        login.clickLoginButton();
        cart.addItemToCart('Sauce Labs Backpack');
        cart.removeItemFromCart('Sauce Labs Backpack');
        cy.xpath(vsprintf(cart.removeItemButton,'Sauce Labs Backpack')).should('not.exist');

    })

    it('User tries to logout as a standard user',()=>{
        login.typeUserName(standardUser)
        login.typePassword(password)
        login.clickLoginButton();
        cy.url().should('include','https://www.saucedemo.com/inventory.html')
        cy.get('button:contains("Add to cart")').should('exist')
        homePage.clickOnMenuSideBar();
        homePage.clickLogout();
        cy.url().should('include',Cypress.env('BASE_URL'))
        cy.get('#user-name').should('have.value','')
        cy.get('#password').should('have.value','')

    })

    it('Error user tries to sort the items from prices low to high',()=>{
        login.typeUserName(errorUser)
        login.typePassword(password)
        login.clickLoginButton();
        homePage.clickDropdownSortingOptions()
        homePage.clickLowToHighSorting();
        cy.xpath('//span[@class="active_option" and contains(text(),"Price (low to high)")]').should('exist');

    })

    


})