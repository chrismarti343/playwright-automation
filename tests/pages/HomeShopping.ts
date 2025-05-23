import {expect, type Locator, type Page} from '@playwright/test';
import { SuperShoppingPage } from './SuperShoppingPage';

export class HomeShopping extends SuperShoppingPage {


    constructor(page: Page) {
        super(page);
    }


    async selectFirstItem(): Promise <void> {
        try {
            this.macBook && await this.macBook.click();
        }
        catch (error) {
            throw new Error(`Failed to navigate to macBook: ${error}`);
        }
    }

    async gotoCheckCart(): Promise <void> {
        try{
            await expect(this.shoppingCartBoton).toBeVisible();
            this.shoppingCartBoton && await this.shoppingCartBoton.click();
             
        }
        catch (error){
            throw new Error(`Failed to navigate to Check cart: ${error}`)
        }
    }



}