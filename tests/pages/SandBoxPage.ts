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

      /**
     * Navigates to the sandbox page and verifies the page load
     * @throws {Error} If navigation fails
     */

      async navigateToPage(): Promise<void> {
        try {
            await this.page.goto(this.baseUrl);
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            throw new Error(`Failed to navigate to ${this.baseUrl}: ${error}`);
        }
    }

     /**
     * Verifies the page title matches the expected value
     * @param expectedTitle - The expected page title
     */
     async verifyPage(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle, { timeout: 5000 });
    }

     /**
     * Verifies that column values match expected names
     * @param expectedNames - Array of expected names
     * @param columnValues - Array of actual column values
     */
     async verifyExpectedNames(expectedNames: string[], columnValues: string[]): Promise<void> {
        await expect(columnValues).toEqual(expectedNames);
    }


     /**
     * Checks a checkbox by label and verifies it's checked
     * @param label - The label text of the checkbox
     */
    async checkBox(label: string): Promise<void> {
        await this.page.getByLabel(label).check();
        await expect(this.page.getByLabel(label), `${label} box is not checked`).toBeChecked();
    }

     /**
     * Gets the dropdown list options excluding empty and default values
     * @returns Promise<string[]> - Array of dropdown options
     */
 async getDropList(): Promise<string[]> {
    try {
        await this.dropList.waitFor({ state: 'visible' });
        await this.dropList.click();
        
        const options = await this.getDrop.allInnerTexts();
        
        const filteredOptions = options
            .map(text => text.trim())
            .filter(text => text && text !== 'Seleccioná un deporte');

        return filteredOptions;
    } catch (error) {
        throw new Error(`Failed to get dropdown options: ${error}`);
    }
}


} 