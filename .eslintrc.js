const createAliases = require('@leonzalion/eslint-config/alias');

module.exports = {
	root: true,
	extends: ['@leonzalion/eslint-config'],
	parserOptions: { tsconfigRootDir: __dirname },
	settings: createAliases({ '~': './src' }),
};
