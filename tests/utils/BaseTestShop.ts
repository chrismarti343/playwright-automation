import {test as base} from '@playwright/test';
import { HomeShopping } from '../pages/HomeShopping';
import { CheckoutShopping } from '../pages/CheckoutShopping';

type Pages = {

    page: Pages;
    homeShopping: HomeShopping
    checkoutShopping: CheckoutShopping

};

export const test = base.extend<Pages>({
    homeShopping: async ({ page }, use) => await use(new HomeShopping(page)),
    checkoutShopping: async ({ page }, use) => await use(new CheckoutShopping(page))

});

export { expect } from '@playwright/test';