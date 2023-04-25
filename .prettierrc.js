module.exports = {
    bracketSpacing: true,
    jsxBracketSameLine: false,
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    arrowParens: 'always',
    printWidth: 100,
    jsxSingleQuote: false,
    overrides: [
        {
            files: ['package.json', 'package-lock.json'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
