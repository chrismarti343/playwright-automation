import { Browser, Page } from '@playwright/test';
import { generateRandomWord } from './utils/randomWord';
import {test, expect} from './utils/fixtureShop';

let browser: Browser;
let page: Page;

test.describe('Shopping navigation ', () => { 

    test(`Add a product to the cart `, async ({ page, homeShopping }) => {
  
      await test.step(`Go to the main URL`, async () => {
        await page.goto('https://opencart.abstracta.us/index.php?route=common/home');
        await expect(page).toHaveTitle("Your Store");
      });
  
      await test.step(`Click on add to cart `, async ( ) => {
        await homeShopping.selectFirtItem();
        await expect(page.locator('div').getByRole('button', { name: ' 1 item(s) - $' })).toContainText(' 1 item(s) - $602.00');
      });

      await test.step('Click in ckeck cart', async () => {
        await homeShopping.gotoCheckCart;
      });

      await test.step('Click in ckeck out', async () => {
        await page.getByRole('link', { name: 'Checkout', exact: true }).click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        await page.getByRole('button', { name: 'Continue' }).click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        expect(page.locator('#content').getByRole('heading', { name: 'Checkout', exact: true }));
      });

      await test.step('Fill out information ', async () => {
        await page.getByPlaceholder('First Name').fill('Christian');
        await page.getByPlaceholder('Last Name').fill('Martinez');

        const randomWord = await generateRandomWord();
        await page.getByRole('textbox', { name: '* E-Mail' }).fill(randomWord+'@gmail.com');
       
        await page.getByPlaceholder('Telephone').fill('0963049810');
        await page.getByRole('textbox', { name: '* Password', exact: true }).fill('chrismarti3');
        await page.getByPlaceholder('Password Confirm').fill('chrismarti3');
        await page.getByPlaceholder('Address 1').fill('testing address');
        await page.getByPlaceholder('City').fill('testing');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await page.getByLabel('Country').selectOption('217');
        
        await expect(page).toHaveTitle('Checkout');
        await expect(page.locator('#button-register')).toBeVisible();

        await page.getByLabel('Region / State').selectOption('3406');
        await page.locator('input[name="agree"]').click();
        await page.getByRole('button', { name: 'Continue' }).click();
        
      });

      await test.step('Verify information have been submitted ', async () => {

        // test.fixme();
        // await new Promise(resolve => setTimeout(resolve, 3000));
        const element2 = await page.locator('#collapse-payment-address');
        await expect(element2).toHaveAttribute('aria-expanded', 'false');

        const element = await page.locator('a[href="#collapse-payment-method"]');
        await expect(element).toHaveAttribute('aria-expanded', 'true');

      });

      

      //getByRole('link', { name: 'Checkout', exact: true })
      //getByRole('button', { name: ' 1 item(s) - $' })

    });



})