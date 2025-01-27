import {expect, type Locator, type Page} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly coursesLink: Locator;
    readonly baseUrl: string = 'https://www.freerangetesters.com/';
    

    constructor(page: Page) {
        this.page = page;
        this.coursesLink = page.locator('#page_header').getByRole('link', { name: 'Cursos', exact: true });
    }

    async navigateToHome() {
        await this.page.goto(this.baseUrl);
    }

    async verifyPageTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async verifyCursoPage() {
        await this.coursesLink.click();
        await this.page.waitForURL("**/cursos");
        await expect(this.page).toHaveURL(/.*\/cursos/);
    }


}