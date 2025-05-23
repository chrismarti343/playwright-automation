import { Browser, Page } from '@playwright/test';
import { test, expect } from './utils/fixtures';  // Import from your fixtures file

let browser: Browser;
let page: Page;



test.describe('FreeTerster navigation', () => { 
  
  test('Links are working correctly', async ({ homePage }) => {

    await test.step(`Checking if homepage is loaded`, async () => {
      await homePage.navigateToHome();
      const verifyTitle = 'Free Range Testers';
      await homePage.verifyPageTitle(verifyTitle);
    });

    await test.step(`When I click on Cursos`, async () => {
      await homePage.verifyCursoPage();
    });
  });
})

test.describe('Testing navigation links ', () => {

  const sections = [
    { name: "Cursos", url: '/cursos', titleExpected: 'Cursos' },
    { name: "Udemy", url: '/udemy', titleExpected: 'Udemy' },
    { name: "Recursos", url: '/recursos', titleExpected: 'Recursos' },
  ];

  for (const section of sections) {

    //It will scape this test since is using function skip
    test.skip(`Vallidating section:  "${section.name}"`, async ({ page, homePage }) => {


      await test.step('Validating home page', async () => {
        await homePage.navigateToHome();
        await expect(page).toHaveTitle("Free Range Testers");
      });

      await test.step(`When I click in  "${section.name}"`, async () => {
        await homePage.coursesLink.click();
        await page.waitForURL('**' + section.url); // Add space before section.url
      });

    });
  }
})

test.describe('Practicing with tables', () => { // Add comma here

  test('Getting text from a table', async ({ sandboxPage }) => {

    await test.step('Go to the page SandPage', async () => {
      await sandboxPage.navigateToPage();
      const pageTitle = await sandboxPage.getPageTitle();
      await expect(pageTitle).toBe("Automation Sandbox");
    });

    await test.step('Verify names from a static table', async () => {

      const columnValues = await sandboxPage.secondColumn.allTextContents();
      const expectedNames = ['Messi', 'Ronaldo', 'Mbappe'];
      console.log("Results are here: ", columnValues);
      await sandboxPage.verifyExpectedNames(expectedNames,columnValues);
  })
  });
})

test.describe('Testing assertions', () => {

  test('Testing check boxes', async ({ page, sandboxPage }) => {

    await test.step(`Go to the page`, async () => {
      await sandboxPage.navigateToPage();
      // await sandboxPage.verifyPage("Automation Sandbox");
    });

    await test.step('Check box', async () => {
      const checkBox = 'Pasta 🍝';
      await sandboxPage.checkBox(checkBox);
    });

    await test.step('Check box', async () => {
      await sandboxPage.getPastaLabel.check();
      await sandboxPage.getPastaLabel.uncheck();
      const errorMessage = 'This box should not be checked';
      await expect(sandboxPage.getPastaLabel, errorMessage).not.toBeChecked();
    });

    await test.step('Check Colum Name', async () => {
      // await expect.soft(page.getByLabel('Pasta 🍝'), 'This box should be checked').toBeChecked();
      
      const elements = ['Fútbol', 'Tennis', 'Basketball'];

      const actualOptions = await sandboxPage.getDropList();
     
      // Verify all elements match exactly

      const areEqual = elements.every(element => actualOptions.includes(element)) 
        && actualOptions.every(option => elements.includes(option));
      
      if (!areEqual) {
        throw new Error(`Dropdown options don't match exactly. Expected: ${elements.join(', ')}, but found: ${actualOptions.join(', ')}`);
      }
      
    })



  });
})



