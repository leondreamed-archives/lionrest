/* eslint-disable import/no-default-export */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/**
 * @type import('ts-jest/dist/types').InitialOptionsTsJest
 */
module.exports = {
	setupFiles: ['./test/jest.setup.ts'],
	extensionsToTreatAsEsm: ['.ts'],
	globals: {
		'ts-jest': {
			useESM: true,
			tsconfig: path.join(__dirname, 'test/tsconfig.json'),
		},
	},
	transform: {},
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'~/(.*)$': '<rootDir>/src/$1',
		'~test/(.*)$': '<rootDir>/test/$1',
	},
};
