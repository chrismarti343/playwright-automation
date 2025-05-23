import {expect, type Locator, type Page} from '@playwright/test';

export class SuperShoppingPage {

    page: Page;
    macBook: Locator
    shoppingCartBoton: Locator

    constructor(page: Page){
        this.page = page;

        this.macBook = page.locator('#content div').filter({ hasText: 'MacBook Intel Core 2 Duo' }).nth(2).getByRole('button').filter({ hasText: 'Add to Cart' });
        this.shoppingCartBoton = page.getByRole('link', { name: 'shopping cart', exact: true });
        

    }
 
}