module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    env: {
        node: true,
        browser: true,
        es6: true,
        commonjs: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        requireConfigFile: false,
        babelOptions: {
            presets: ["@babel/preset-react"]
        }
    },
    plugins: ['react', '@next/eslint-plugin-next', 'prettier'],
    rules: {
        'import/prefer-default-export': 0,
        'no-console': 0,
        'no-nested-ternary': 0,
        'no-underscore-dangle': 0,
        'no-unused-expressions': 0,
        camelcase: 0,
        'react/self-closing-comp': 0,
        'react/jsx-filename-extension': 0,
        'react/prop-types': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-no-comment-textnodes': 0,
        'react/jsx-props-no-spreading': 0,
        'react/no-array-index-key': 0,
        'react/no-unescaped-entities': 0,
        'react/require-default-props': 0,
        'react/react-in-jsx-scope': 0,
        'linebreak-style': 0,
        semi: 0,
        'prettier/prettier': 0,
        'no-unused-vars': 0,
        'no-unsafe-optional-chaining': 0,
        'react/jsx-key': 0,
        'react/jsx-no-duplicate-props': 0,

    },
}
