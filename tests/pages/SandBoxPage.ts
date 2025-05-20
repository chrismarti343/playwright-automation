import {expect, type Locator, type Page} from '@playwright/test';
import { SuperPage } from './SuperPage';

export class SandBoxPage extends SuperPage {


    readonly baseUrl: string = 'https://thefreerangetester.github.io/sandbox-automation-testing/';

    constructor(page: Page) {
        super(page);
       
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
            throw new Error(`Failed to navigate to sandbox page: ${error}`);
        }
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

     /**
     * Verifies that column values match expected names
     * @param expectedNames - Array of expected names
     * @param columnValues - Array of actual column values
     */
     async verifyExpectedNames(
        expectedNames ?: string[], 
        columnValues ?: string[])
        : Promise<void> {
        await expect(columnValues).toEqual(expectedNames);
    }


     /**npx playwright install  
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