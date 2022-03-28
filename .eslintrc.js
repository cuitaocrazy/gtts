module.exports = {
  env: {
    es2021: true,
    node  : true,
    jest  : true,
  },
  extends      : ['standard'],
  parser       : '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType : 'module',
  },
  plugins       : ['@typescript-eslint'],
  ignorePatterns: ['node_modules/', 'dist/'],
  rules         : {
    'comma-dangle'                   : ['error', 'always-multiline'],
    'array-element-newline'          : ['error', 'consistent'],
    'array-bracket-newline'          : ['error', { multiline: true }],
    'function-paren-newline'         : ['error', 'multiline-arguments'],
    // 'max-len'                        : ['error', { code: 80 }],
    'newline-per-chained-call'       : ['error', { ignoreChainWithDepth: 1 }],
    'key-spacing'                    : ['error', { align: 'colon' }],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev     : ['const', 'let', 'var'],
        next     : '*',
      },
      {
        blankLine: 'any',
        prev     : ['const', 'let', 'var'],
        next     : ['const', 'let', 'var'],
      },
    ],
  },
}
