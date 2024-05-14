class loginPage{

    visitLoginPage(){
        cy.visit(Cypress.env('BASE_URL'))
    }

    typeUserName(username){
        cy.get('#user-name').type(username)
    }

    typePassword(password){
        cy.get('#password').type(password)
    }

    clickLoginButton(){
        cy.get('#login-button').click()
    }

}

export default loginPage