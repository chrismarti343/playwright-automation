import {test as base} from '@playwright/test';
import { HomeShopping } from '../pages/HomeShopping';
type Pages = {

    page: Pages;
    homeShopping: HomeShopping

};

export const test = base.extend<Pages>({
    homeShopping: async ({ page }, use) => await use(new HomeShopping(page))

});

export { expect } from '@playwright/test';