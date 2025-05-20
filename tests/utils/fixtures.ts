import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SandBoxPage } from '../pages/SandBoxPage';

type Pages = {
    homePage: HomePage;
    sandboxPage: SandBoxPage;
};

export const test = base.extend<Pages>({
    homePage: async ({ page }, use) => await use(new HomePage(page)),
    sandboxPage: async ({ page }, use) => await use(new SandBoxPage(page))
});

export { expect } from '@playwright/test';
