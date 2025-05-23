import {expect, type Locator, type Page} from '@playwright/test';
import { SuperShoppingPage } from './SuperShoppingPage';
import { generateRandomWord } from '../utils/randomWord';

export class CheckoutShopping extends SuperShoppingPage {

    checkoutButton: Locator;
    firstName: Locator;
    lastName: Locator;
    email: Locator;
    phone: Locator;
    password: Locator;
    confirmPassword: Locator;
    address: Locator;
    city: Locator;
    country: Locator;
    

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole('link', { name: 'Checkout', exact: true });
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.email = page.getByRole('textbox', { name: '* E-Mail' });
        this.phone = page.getByPlaceholder('Telephone');
        this.password = page.getByRole('textbox', { name: '* Password', exact: true });
        this.confirmPassword = page.getByPlaceholder('Password Confirm');
        this.address = page.getByPlaceholder('Address 1');
        this.city = page.getByPlaceholder('City');
        this.country = page.getByLabel('Country');
    }

    async useGiftPage (): Promise <void> {
        try{
            await expect(this.checkoutButton).toBeVisible();
            await this.checkoutButton.click();
        }
        catch (error){
            throw new Error(`Failed to navigate to Gift Vouchers: ${error}`)
        }
    }

    async continueButtonPage (): Promise <void> {
        try{
            await this.continueButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            expect(this.page.locator('#content').getByRole('heading', { name: 'Checkout', exact: true }));
        }
        catch (error){
            throw new Error(`Failed to navigate to next page ${error}`)
        }
    }

    async fillOutInformation(params: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        address: string;
        city: string;
        country: string;
    }): Promise<void> {
        try {
            await this.firstName.fill(params.firstName);
            await this.lastName.fill(params.lastName);
            const randomWord = await generateRandomWord();
            await this.email.fill(randomWord+'@gmail.com');
            await this.phone.fill(params.phone);
            await this.password.fill(params.password);
            await this.confirmPassword.fill(params.confirmPassword);
            await this.address.fill(params.address);
            await this.city.fill(params.city);
            await new Promise(resolve => setTimeout(resolve, 3000));
            await this.country.selectOption(params.country);
        }
        catch (error) {
            throw new Error(`Failed to fill out information: ${error}`)
        }
    }

}