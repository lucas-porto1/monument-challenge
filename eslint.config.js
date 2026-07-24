import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'blob-report/'],
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ['**/*.ts'],

        rules: {
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },

    {
        ...playwright.configs['flat/recommended'],
        files: ['tests/**/*.ts'],
    },

    prettier,
);
