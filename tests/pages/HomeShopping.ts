import {expect, type Locator, type Page} from '@playwright/test';
import { SuperShoppingPage } from './SuperShoppingPage';

export class HomeShopping extends SuperShoppingPage {


    constructor(page: Page) {
        super(page);
    }


    async selectFirtItem(): Promise <void> {
        try {
            await this.macBook.click();
        }
        catch (error) {
            throw new Error(`Failed to navigate to macBook: ${error}`);
        }
    }

    async gotoCheckCart(): Promise <void> {
        try{
            await this.itemBoton.click();
            await this.viewCart.click();  
        }
        catch (error){
            throw new Error(`Failed to navigate to Check cart: ${error}`)
        }
    }


}