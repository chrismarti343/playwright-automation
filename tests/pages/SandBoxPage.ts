import {expect, type Locator, type Page} from '@playwright/test';

export class SandBoxPage {
    readonly page: Page;
    readonly secondColumn: Locator;
    readonly getPastaLabel: Locator;
    readonly dropList: Locator;
    readonly getDrop: Locator;

    readonly baseUrl: string = 'https://thefreerangetester.github.io/sandbox-automation-testing/';

    constructor(page: Page) {
        this.page = page;
        this.secondColumn = page.locator('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)');
        this.getPastaLabel = page.getByLabel('Pasta 🍝');
        this.dropList = page.locator('select[id="formBasicSelect"]');
        this.getDrop = page.locator('select[id="formBasicSelect"] option');
    }

    async navigateToPage() {
        await this.page.goto(this.baseUrl);
    }

    async verifyPage(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async verifyExpectedNames(expectedNames: string[], columnValues: string[]) {
        await expect(columnValues).toEqual(expectedNames);
    }

    async checkBox(label: string) {
        await this.page.getByLabel(label).check();
        await expect(this.page.getByLabel(label), `${label} box is not checked`).toBeChecked();
    }

    async getDropList() {
       
        await this.dropList.click();
        const options = this.getDrop.allTextContents();

        const actualOptions = (await options).filter(text => 
            text.trim() !== '' && 
            text.trim() !== 'Seleccioná un deporte'
          );

        console.log('This is actualOptions: ', actualOptions);

        return actualOptions;

    }


} 