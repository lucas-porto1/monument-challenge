import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly avatar: Locator;
    readonly logoutMenuItem: Locator;

    constructor(private readonly page: Page) {
        this.emailInput = page.getByLabel('Email Address / Username');
        this.passwordInput = page.getByTestId('password-input');
        this.signInButton = page.getByTestId('sign-in-button');
        this.avatar = page.getByTestId('avatar');
        this.logoutMenuItem = page.getByTestId('logout-menu-item');
    }

    async open(): Promise<void> {
        await this.page.goto('/auth/login');
        await expect(this.signInButton).toBeVisible();
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();

        await expect(this.avatar).toBeVisible({
            timeout: 20_000,
        });
    }

    async logout(): Promise<void> {
        await this.avatar.click();
        await expect(this.logoutMenuItem).toBeVisible();
        await this.logoutMenuItem.click();

        await this.expectLoggedOut();
    }

    async expectLoggedOut(): Promise<void> {
        await expect(this.page).toHaveURL(/\/auth\/login/);
        await expect(this.signInButton).toBeVisible();
    }
}