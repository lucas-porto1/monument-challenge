import { expect, type Locator, type Page } from '@playwright/test';

export class UnitsPage {
    readonly unitsNavigationLink: Locator;

    readonly individualUnitsTab: Locator;
    readonly unitGroupsTab: Locator;

    readonly addUnitButton: Locator;
    readonly addUnitGroupButton: Locator;

    readonly individualUnitLinks: Locator;
    readonly unitGroupLinks: Locator;

    readonly addUnitTitle: Locator;
    readonly addUnitGroupTitle: Locator;

    readonly unitNumberInput: Locator;
    readonly unitWidthInput: Locator;
    readonly unitDepthInput: Locator;
    readonly unitGroupStreetRateInput: Locator;

    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly closeModalButton: Locator;

    constructor(private readonly page: Page) {
        this.unitsNavigationLink = page.getByRole('link', {
            name: 'Units',
            exact: true,
        });

        this.individualUnitsTab = page.getByRole('tab', {
            name: 'Individual Units',
            exact: true,
        });

        this.unitGroupsTab = page.getByRole('tab', {
            name: 'Unit Groups',
            exact: true,
        });

        this.addUnitButton = page.getByRole('button', {
            name: 'Add Unit',
            exact: true,
        });

        this.addUnitGroupButton = page.getByRole('button', {
            name: 'Add Unit Group',
            exact: true,
        });

        this.individualUnitLinks = page.locator(
            'a[href^="/units/individual-units/"][href$="/overview"]',
        );

        this.unitGroupLinks = page.locator('a[href^="/units/unit-groups/size-and-types/"]');

        this.addUnitTitle = page
            .getByText('Add Unit', {
                exact: true,
            })
            .last();

        this.addUnitGroupTitle = page
            .getByText('Add Unit Group', {
                exact: true,
            })
            .last();

        this.unitNumberInput = page.getByTestId('unitNumber-input');

        this.unitWidthInput = page.getByTestId('unitWidth-input');

        this.unitDepthInput = page.getByTestId('unitDepth-input');

        this.unitGroupStreetRateInput = page.getByTestId('tiers.0.currentStreetRate-input');

        this.saveButton = page.getByRole('button', {
            name: 'Save',
            exact: true,
        });

        this.cancelButton = page.getByRole('button', {
            name: 'Cancel',
            exact: true,
        });

        this.closeModalButton = page.getByTestId('m-close-button');
    }

    async openFromNavigation(): Promise<void> {
        await this.unitsNavigationLink.click();

        await expect(this.individualUnitsTab).toBeVisible();
    }

    async openUnitGroups(): Promise<void> {
        await this.unitGroupsTab.click();

        await expect(this.unitGroupsTab).toHaveAttribute('aria-selected', 'true');
    }

    async openFirstIndividualUnit(): Promise<void> {
        const firstUnit = this.individualUnitLinks.first();

        await expect(firstUnit).toBeVisible();
        await firstUnit.click();
    }

    async openFirstUnitGroup(): Promise<void> {
        const firstUnitGroup = this.unitGroupLinks.first();

        await expect(firstUnitGroup).toBeVisible();

        await firstUnitGroup.click();
    }

    async openDirectly(): Promise<void> {
        await this.page.goto('/units/individual-units');

        await expect(this.individualUnitsTab).toBeVisible();
    }

    async openAddUnitModal(): Promise<void> {
        await this.addUnitButton.click();

        await expect(this.unitNumberInput).toBeVisible();
    }

    async openAddUnitGroupModal(): Promise<void> {
        await this.addUnitGroupButton.click();

        await expect(this.unitGroupStreetRateInput).toBeVisible();
    }
}
