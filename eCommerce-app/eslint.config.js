import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                { accessibility: 'explicit', overrides: { constructors: 'off' } },
            ],
            '@typescript-eslint/member-ordering': 'error',
            'class-methods-use-this': 'error',
        },
    },
    eslintPluginUnicorn.configs.recommended,
    {
        rules: {
            'unicorn/filename-case': [
                'error',
                {
                    cases: {
                        camelCase: true,
                        pascalCase: true,
                    },
                },
            ],
            'unicorn/better-regex': 'warn',
            'unicorn/prefer-module': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/prevent-abbreviations': 'off', //doesn't let use 'i' in for loop
            'unicorn/prefer-dom-node-dataset': 'off', //doesn't let use 'setAttribute' method
            'unicorn/prefer-query-selector': 'off', //doesn't let use 'getElementById' method
            'unicorn/prefer-dom-node-remove': 'off',
            'unicorn/no-console-spaces': 'off',
            'unicorn/prefer-global-this': 'off', //doesnt let use 'window'
            'unicorn/no-for-loop': 'off', //doesn't let use 'for' loop, O_O
            'unicorn/prefer-math-min-max': 'off', //doesn't let use ternary operator
            'unicorn/prefer-spread': 'off',
        },
    }
);
