import { Browser, Page } from '@playwright/test';
import { generateRandomWord } from './utils/randomWord';
import {test, expect} from './utils/BaseTestShop';

let browser: Browser;
let page: Page;

test.describe('Shopping navigation ', () => { 

    test(`Add a product to the cart `, async ({ page, homeShopping, checkoutShopping }) => {
  
      await test.step(`Go to the main URL`, async () => {
        await page.goto('https://opencart.abstracta.us/index.php?route=common/home');
        await expect(page).toHaveTitle("Your Store");
      });
  
      await test.step(`Click on add to cart `, async ( ) => {
        await homeShopping.selectFirstItem();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await expect(page.locator('div').getByRole('button', { name: ' 1 item(s) - $' })).toContainText(' 1 item(s) - $602.00');
      });

      await test.step('Go through Cart', async () => {
        await homeShopping.gotoCheckCart();
        await expect(page).toHaveTitle("Shopping Cart");

      });

      await test.step('Go through Checkout', async () => {

        await checkoutShopping.useGiftPage();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await checkoutShopping.continueButtonPage();

      });

    await test.step('Fill out information ', async () => {
        
        await checkoutShopping.fillOutInformation({
          firstName: 'Christian',
          lastName: 'Martinez',
          email: 'christianmartinez@gmail.com',
          phone: '0963049810',
          password: 'chrismarti3',
          confirmPassword: 'chrismarti3',
          address: 'testing address',
          city: 'testing',
          country: '217'
        });
        
        await expect(page).toHaveTitle('Checkout');
        await expect(page.locator('#button-register')).toBeVisible();
        await page.getByLabel('Region / State').selectOption('3406');

        await checkoutShopping.acceptConditions();
        
      });

    await test.step('Verify information have been submitted ', async () => {

        const element2 = await page.locator('#collapse-payment-address');
        await expect(element2).toHaveAttribute('aria-expanded', 'false');

        const element = await page.locator('a[href="#collapse-payment-method"]');
        await expect(element).toHaveAttribute('aria-expanded', 'true');

      });

    });
})