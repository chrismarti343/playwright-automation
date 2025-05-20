import {expect, type Locator, type Page} from '@playwright/test';

export class SuperPage {

    page: Page;
    coursesLink: Locator;
    secondColumn: Locator;
    getPastaLabel: Locator;
    dropList: Locator;
    getDrop: Locator;


    constructor(page: Page){
        this. page = page

        //<-------- Locators Utilities:
        this.coursesLink = page.locator('#page_header').getByRole('link', { name: 'Cursos', exact: true });
        this.secondColumn = page.locator('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)');
        this.getPastaLabel = page.getByLabel('Pasta 🍝');
        this.dropList = page.locator('select[id="formBasicSelect"]');
        this.getDrop = page.locator('select[id="formBasicSelect"] option');

    }

}