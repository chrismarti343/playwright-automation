import {expect, type Locator, type Page} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly coursesLink: Locator;
    private readonly BASE_URL = 'https://www.freerangetesters.com/';
    private readonly DEFAULT_TIMEOUT = 5000;
    

    constructor(page: Page) {
        this.page = page;
        this.coursesLink = page.locator('#page_header').getByRole('link', { name: 'Cursos', exact: true });
    }

    async navigateToHome(): Promise<void> {
        try {
            await this.page.goto(this.BASE_URL);
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            throw new Error(`Failed to navigate to home page: ${error}`);
        }
    }

    async verifyPageTitle(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle, { timeout: this.DEFAULT_TIMEOUT });
    }

    async verifyCursoPage(): Promise<void>  {
        try {
            await this.coursesLink.click();
            await this.page.waitForURL('**/cursos', { timeout: this.DEFAULT_TIMEOUT });
            await expect(this.page).toHaveURL(/.*\/cursos/);
        } catch (error) {
            throw new Error(`Failed to navigate to courses page: ${error}`);
        }
    }


}