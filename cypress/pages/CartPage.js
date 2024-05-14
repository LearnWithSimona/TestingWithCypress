const { vsprintf } = require('sprintf-js');

class CartPage {

    addItemToCartButton='//div[contains(text(),"%s")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Add to cart")]'
    removeItemButton='//div[contains(text(),"%s")]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[contains(text(),"Remove")]'
    removeButton='//button[contains(text(),"Remove")]'
    
    addItemToCart(item) {
        const addItemButton = vsprintf(this.addItemToCartButton, [item]);
        return cy.xpath(addItemButton).click();
    }
    

    removeItemFromCart(item) {
        const removeItem = vsprintf(this.removeItemButton,[item])
        return cy.xpath(removeItem).click();
    }

    clickOnCart() {
        cy.get('a.shopping_cart_link').click()
    }

    addBackPack() {
        cy.xpath(this.addBackPackButton).click();
    }

    removeBackPack() {
        cy.xpath(this.removeBackPackButton).click();
    }

    clickOnRemoveButton() {
        cy.xpath(this.removeButton).click();
    }


}
export default CartPage