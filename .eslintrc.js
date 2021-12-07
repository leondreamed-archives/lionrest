/* eslint-env node */

module.exports = {
	extends: ['@leonzalion/eslint-config'],
	parserOptions: { tsconfigRootDir: __dirname },
	settings: {
		'import/resolver': {
			alias: {
				map: [['~', './src']],
			},
		},
	},
};
