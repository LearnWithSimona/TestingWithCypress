class HomePage {

    burgerMenu = '//button[@id="react-burger-menu-btn"]'
    logoutButon = '//a[@id="logout_sidebar_link"]'
    dropDownSortingList = '//span[@class="select_container"]//span[@class="active_option"]'
    lowToHighOption = '//span[@class="select_container"]//select[@class="product_sort_container"]//option[@value="lohi"]'
    removeFleeceJacketButton ='//div[contains(text(),"Sauce Labs Fleece Jacket")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Remove"'

    clickOnMenuSideBar() {
        cy.xpath(this.burgerMenu).click()
    }

    clickLogout() {
        cy.xpath(this.logoutButon).click();
    }

    clickDropdownSortingOptions() {
        cy.xpath(this.dropDownSortingList).click({ force: true });
    }

    clickLowToHighSorting() {
        cy.xpath(this.lowToHighOption).click({ force: true });
    }

}
export default HomePage