import { textToSentences } from './utils'

test('test spiltter', () => {
  const str = `
  Hello, world!
  This is a test.
  Node.js is well.
  English story.
  Long time ago, there was a Alice.
  She was a good girl.
  She has a long tail.
  She headed to the forest.
  She said, "Hello, world!"
  `

  const expected = [
    'Hello, world! This is a test. Node.js is well. English story. Long time ago, there was a Alice.',
    'She was a good girl. She has a long tail. She headed to the forest. She said, \\\\\\"Hello, world!\\\\\\"',
  ]

  const actural = textToSentences(str)

  expect([...actural])
    .toStrictEqual(expected)
})
