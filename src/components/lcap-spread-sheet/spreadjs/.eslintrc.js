module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
    },
    'parserOptions': {
        'ecmaVersion': 6
    },
    'rules': {
        'padded-blocks': ['error', 'never'],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['warn', 'single'],
        'semi': ['warn', 'always'],
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': ['error', { 'max': 2 }],
        'no-multi-spaces': 'error',
    }
};
