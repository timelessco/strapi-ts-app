const commonIgnoredRules = {
	"no-console": ["error", { allow: ["warn", "error"] }],
	"no-param-reassign": "off",
	"arrow-body-style": ["error", "as-needed"],
	"import/no-named-as-default": "off",
	"import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
	"import/no-extraneous-dependencies": "off",
	"node/callback-return": "off",
	"func-style": "off",
	"simple-import-sort/imports": "off",
	"unicorn/no-array-reduce": "off",
	"canonical/sort-keys": "off",
	"canonical/import-specifier-newline": "off",
	"canonical/destructuring-property-newline": "off",
	"canonical/filename-match-exported": "off",
	"canonical/filename-match-regex": "off",
	"canonical/id-match": "off",
	"canonical/export-specifier-newline": "off",
	"zod/require-strict": "off",
};

const commonTypescriptIgnoredRules = {
	"@typescript-eslint/no-use-before-define": "off",
	"@typescript-eslint/no-unused-vars": [
		"warn",
		{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
	],
	"@typescript-eslint/naming-convention": ["off"],
};

const commonNodeIgnoredRules = {
	...commonIgnoredRules,
	"node/no-process-env": "off",
};

/**
 * @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config}
 */
module.exports = {
	ignorePatterns: ["!**/.*"],
	overrides: [
		{
			files: ["*.js", "*.mjs"],
			extends: [
				"canonical",
				"canonical/node",
				"canonical/regexp",
				"canonical/jsdoc",
				"canonical/zod",
				"prettier",
			],
			settings: {
				jsdoc: {
					mode: "typescript",
				},
			},
			rules: {
				...commonNodeIgnoredRules,
				"import/extensions": [
					"error",
					"always",
					{
						ignorePackages: true,
					},
				],
			},
			overrides: [
				{
					files: ["*.mjs"],
					extends: ["canonical/module"],
				},
			],
		},
		{
			files: ["./*.ts", "config/**/*.ts"],
			extends: [
				"canonical",
				"canonical/node",
				"canonical/module",
				"canonical/typescript",
				"canonical/typescript-type-checking",
				"canonical/jsdoc",
				"canonical/regexp",
				"canonical/zod",
				"prettier",
			],
			parserOptions: {
				project: "./tsconfig.json",
			},
			settings: {
				jsdoc: {
					mode: "typescript",
				},
			},
			rules: {
				...commonNodeIgnoredRules,
				...commonTypescriptIgnoredRules,
			},
		},
		{
			files: ["src/**/*.ts"],
			excludedFiles: ["src/admin/**/*.ts"],
			extends: [
				"canonical",
				"canonical/browser",
				"canonical/module",
				"canonical/typescript",
				"canonical/typescript-type-checking",
				"canonical/zod",
				"canonical/jsdoc",
				"canonical/regexp",
				"prettier",
			],
			parserOptions: {
				project: "./tsconfig.json",
			},
			settings: {
				jsdoc: {
					mode: "typescript",
				},
			},
			rules: {
				...commonIgnoredRules,
				...commonTypescriptIgnoredRules,
			},
		},
		{
			files: ["src/admin/**/*.{ts,tsx}"],
			extends: [
				"canonical",
				"canonical/browser",
				"canonical/module",
				"canonical/typescript",
				"canonical/typescript-type-checking",
				"canonical/zod",
				"canonical/regexp",
				"prettier",
			],
			parserOptions: {
				project: "src/admin/tsconfig.json",
			},
			overrides: [
				{
					files: ["*.ts"],
					extends: ["canonical/jsdoc"],
					settings: {
						jsdoc: {
							mode: "typescript",
						},
					},
				},
				{
					files: ["*.tsx", "use*.ts"],
					extends: ["canonical/react", "canonical/jsx-a11y"],
					parserOptions: {
						ecmaFeatures: {
							jsx: true,
						},
					},
					rules: {
						// To support dynamic import
						"promise/prefer-await-to-then": "off",
						"@typescript-eslint/promise-function-async": "off",
						// Other react rules
						"react/hook-use-state": "off",
						"react/jsx-indent": ["error", "tab"],
						"react/jsx-indent-props": ["error", "tab"],
						"react/forbid-component-props": "off",
						"react/prop-types": "off",
						"react/jsx-handler-names": "off",
						"react/jsx-curly-newline": "off",
					},
				},
			],
		},
		{
			files: ["*.json", ".all-contributorsrc"],
			excludedFiles: [".vscode/**/*.json"],
			parser: "jsonc-eslint-parser",
			extends: ["plugin:jsonc/recommended-with-json", "plugin:jsonc/prettier"],
		},
		{
			files: [".vscode/**"],
			parser: "jsonc-eslint-parser",
			extends: ["plugin:jsonc/recommended-with-jsonc", "plugin:jsonc/prettier"],
		},
		{
			files: ["*.yaml", "*.yml"],
			parser: "yaml-eslint-parser",
			extends: ["plugin:yml/standard", "plugin:yml/prettier"],
		},
		{
			files: ["*.toml"],
			parser: "toml-eslint-parser",
			extends: ["plugin:toml/standard"],
		},
	],
};
