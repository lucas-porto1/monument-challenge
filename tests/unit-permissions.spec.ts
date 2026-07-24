import { expect, test } from '@playwright/test';
import { env } from '../src/config/env.js';
import { LoginPage } from '../src/pages/login.page.js';
import { UnitsPage } from '../src/pages/units.page.js';

test.describe('Unit permissions', () => {
    test('admin can log in and access Units from navigation', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const unitsPage = new UnitsPage(page);

        await loginPage.open();
        await loginPage.login(env.admin.email, env.admin.password);

        await unitsPage.openFromNavigation();

        await expect(page).toHaveURL(/\/units\/individual-units/);
        await expect(unitsPage.individualUnitsTab).toBeVisible();
        await expect(unitsPage.addUnitButton).toBeVisible();
    });

    test('admin can access Unit Groups', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const unitsPage = new UnitsPage(page);

        await loginPage.open();
        await loginPage.login(env.admin.email, env.admin.password);
        await unitsPage.openFromNavigation();

        await unitsPage.openUnitGroups();

        await expect(page).toHaveURL(/\/units\/unit-groups/);
        await expect(unitsPage.unitGroupLinks.first()).toBeVisible();
    });

    test('admin can open an existing Individual Unit', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const unitsPage = new UnitsPage(page);

        await loginPage.open();
        await loginPage.login(env.admin.email, env.admin.password);
        await unitsPage.openFromNavigation();

        await unitsPage.openFirstIndividualUnit();

        await expect(page).toHaveURL(/\/units\/individual-units\/[^/]+\/overview/);

        await expect(
            page.getByRole('tab', {
                name: 'Overview',
                exact: true,
            }),
        ).toBeVisible();

        await expect(
            page.getByRole('tab', {
                name: 'Billing History',
                exact: true,
            }),
        ).toBeVisible();

        await expect(
            page.getByRole('tab', {
                name: 'Unit Rental History',
                exact: true,
            }),
        ).toBeVisible();
    });

    test('admin can open an existing Unit Group', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const unitsPage = new UnitsPage(page);

        await loginPage.open();
        await loginPage.login(env.admin.email, env.admin.password);
        await unitsPage.openFromNavigation();
        await unitsPage.openUnitGroups();

        await unitsPage.openFirstUnitGroup();

        await expect(page).toHaveURL(/\/units\/unit-groups\/size-and-types\/[^/]+/);

        await expect(
            page.getByRole('tab', {
                name: 'Overview',
                exact: true,
            }),
        ).toBeVisible();

        await expect(
            page.getByRole('tab', {
                name: 'Units',
                exact: true,
            }),
        ).toBeVisible();

        await expect(
            page.getByRole('tab', {
                name: 'Unit Tier Movement',
                exact: true,
            }),
        ).toBeVisible();
    });

    test('admin can access Individual Units directly by URL', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const unitsPage = new UnitsPage(page);

        await loginPage.open();
        await loginPage.login(env.admin.email, env.admin.password);

        await unitsPage.openDirectly();

        await expect(page).toHaveURL(/\/units\/individual-units/);
        await expect(unitsPage.individualUnitsTab).toBeVisible();
    });

    test('admin can open the Add Unit form', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const unitsPage = new UnitsPage(page);

        await loginPage.open();
        await loginPage.login(env.admin.email, env.admin.password);
        await unitsPage.openFromNavigation();

        await expect(unitsPage.addUnitButton).toBeVisible();

        await unitsPage.openAddUnitModal();

        await expect(unitsPage.addUnitTitle).toBeVisible();
        await expect(unitsPage.unitNumberInput).toBeVisible();
        await expect(unitsPage.unitWidthInput).toBeVisible();
        await expect(unitsPage.unitDepthInput).toBeVisible();
        await expect(unitsPage.saveButton).toBeVisible();
        await expect(unitsPage.cancelButton).toBeVisible();
    });

    test('admin can open the Add Unit Group form', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const unitsPage = new UnitsPage(page);

        await loginPage.open();
        await loginPage.login(env.admin.email, env.admin.password);
        await unitsPage.openFromNavigation();
        await unitsPage.openUnitGroups();

        await expect(unitsPage.addUnitGroupButton).toBeVisible();

        await unitsPage.openAddUnitGroupModal();

        await expect(unitsPage.addUnitGroupTitle).toBeVisible();
        await expect(unitsPage.unitWidthInput).toBeVisible();
        await expect(unitsPage.unitDepthInput).toBeVisible();
        await expect(unitsPage.unitGroupStreetRateInput).toBeVisible();
        await expect(unitsPage.saveButton).toBeVisible();
        await expect(unitsPage.cancelButton).toBeVisible();
    });

    test('logged-out user cannot access a protected Units URL', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const unitsPage = new UnitsPage(page);

        await loginPage.open();
        await loginPage.login(env.admin.email, env.admin.password);

        await unitsPage.openDirectly();

        await expect(page).toHaveURL(/\/units\/individual-units/);

        await loginPage.logout();
        await loginPage.expectLoggedOut();

        await page.goto('/units/individual-units');

        await expect(page).toHaveURL(/\/auth\/login/);
        await expect(loginPage.signInButton).toBeVisible();
    });
});
