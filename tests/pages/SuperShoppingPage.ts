import {expect, type Locator, type Page} from '@playwright/test';
import { HomeShopping } from './HomeShopping';

export class SuperShoppingPage {

    page: Page;
    macBook: Locator
    viewCart: Locator
    itemBoton: Locator

    constructor(page: Page){
        this.page = page;

        this.macBook = page.locator('#content div').filter({ hasText: 'MacBook Intel Core 2 Duo' }).nth(2).getByRole('button').filter({ hasText: 'Add to Cart' });
        this.viewCart = page.getByRole('link', { name: ' View Cart' });
        this. itemBoton = page.getByRole('link', { name: ' View Cart' });

    }
 
}