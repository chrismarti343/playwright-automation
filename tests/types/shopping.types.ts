import { type Locator, type Page } from '@playwright/test';

// Common types for reuse
export type SelectorType = 'role' | 'placeholder' | 'label' | 'text' | 'locator';

export interface SelectorConfig {
    type: SelectorType;
    value: string;
    options?: Record<string, any>;
}

// Product related types
export interface Product {
    name: string;
    price: number;
    description?: string;
    quantity?: number;
}

export interface CartItem extends Product {
    quantity: number;
    totalPrice: number;
}

// Customer related types
export interface CustomerInformation {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    address: string;
    city: string;
    country: string;
}

export interface CustomerAddress {
    address: string;
    city: string;
    country: string;
    postalCode?: string;
    state?: string;
}

// Base locator interface that all page locators should extend
export interface BasePageLocators {
    continueButton: Locator;
    pageTitle: Locator;
    errorMessage?: Locator;
    loadingSpinner?: Locator;
}

// Home page specific locators
export interface HomePageLocators extends BasePageLocators {
    macBook: Locator;
    shoppingCartButton: Locator;
    productGrid: Locator;
    searchInput?: Locator;
    searchButton?: Locator;
    categoryMenu?: Locator;
}

// Checkout page specific locators
export interface CheckoutPageLocators extends BasePageLocators {
    checkoutButton: Locator;
    firstName: Locator;
    lastName: Locator;
    email: Locator;
    phone: Locator;
    password: Locator;
    confirmPassword: Locator;
    address: Locator;
    city: Locator;
    country: Locator;
    conditions: Locator;
    paymentMethods?: Locator;
    shippingMethods?: Locator;
    orderSummary?: Locator;
    totalAmount?: Locator;
}

// Cart page specific locators
export interface CartPageLocators extends BasePageLocators {
    cartItems: Locator;
    updateQuantity: Locator;
    removeItem: Locator;
    emptyCartMessage?: Locator;
    cartTotal: Locator;
    checkoutButton: Locator;
}

// Common page actions interface
export interface PageActions {
    waitForPageLoad(): Promise<void>;
    isPageLoaded(): Promise<boolean>;
    getPageTitle(): Promise<string>;
    handleError(error: Error): Promise<void>;
}

// Configuration types
export interface PageConfig {
    url: string;
    title: string;
    timeout?: number;
    retryAttempts?: number;
}

// Response types for API calls (if needed)
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    statusCode: number;
}

// Event types for tracking user actions
export interface UserAction {
    action: string;
    timestamp: Date;
    element?: string;
    value?: string;
    success: boolean;
    error?: string;
} 