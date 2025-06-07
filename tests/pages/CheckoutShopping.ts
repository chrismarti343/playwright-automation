import {expect, type Locator, type Page} from '@playwright/test';
import { SuperShoppingPage } from './SuperShoppingPage';
import { generateRandomWord } from '../utils/randomWord';
import { CustomerInformation } from '../types/shopping.types';
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
    conditions: Locator;
    continueButton: Locator;
    

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
        this.conditions = page.locator('input[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' })
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
            this.continueButton && await this.continueButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            expect(this.page.locator('#content').getByRole('heading', { name: 'Checkout', exact: true }));
        }
        catch (error){
            throw new Error(`Failed to navigate to next page ${error}`)
        }
    }

    async fillOutInformation(params: CustomerInformation): Promise<void> {
        try {
            this.firstName && await this.firstName.fill(params.firstName);
            this.lastName && await this.lastName.fill(params.lastName);
            const randomWord = await generateRandomWord();
            this.email && await this.email.fill(randomWord+'@gmail.com');
            this.phone && await this.phone.fill(params.phone);
            this.password && await this.password.fill(params.password);
            this.confirmPassword && await this.confirmPassword.fill(params.confirmPassword);
            this.address && await this.address.fill(params.address);
            this.city && await this.city.fill(params.city);
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.country && await this.country.selectOption(params.country);
        }
        catch (error) {
            throw new Error(`Failed to fill out information: ${error}`)
        }
    }

    async acceptConditions ():  Promise <void> {
        try{
            await expect(this.conditions).not.toBeChecked();
            await this.conditions.click();
            await expect(this.continueButton).toBeVisible();
            await this.continueButton.click();

        }catch (error) {
            throw new Error ('Failed to accept terms and proceed')
        }
        
    }

}