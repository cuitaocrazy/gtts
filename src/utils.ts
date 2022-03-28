const returnSplitter = (str: string) => str.split(/[\r\n]/)
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => endSymbol(line[line.length - 1]) ? line : line + '.')

const endSymbol = (c: string) => c === '.' || c === '!' || c === '?' || c === ';' || c === ':' || c === ',' || c === '"' || c === '\'' || c === '(' || c === ')' || c === '[' || c === ']' || c === '{' || c === '}'

const fullStopSplitter = (str: string) => str.split(/\.\s/)
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => endSymbol(line[line.length - 1]) ? line : line + '.')

const questionMarkSplitter = (str: string) => str.split('?')
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => endSymbol(line[line.length - 1]) ? line : line + '?')

const semicolonSplitter = (str: string) => str.split(';')
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => endSymbol(line[line.length - 1]) ? line : line + ';')

const exclamationSplitter = (str: string) => str.split('!')
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => endSymbol(line[line.length - 1]) ? line : line + '!')

function * textSplit (str: string, splitter: ((str: string) => string[])[]): IterableIterator<string> {
  if (str.length > 100) {
    const [currentSplitter, ...otherSplitter] = splitter
    const lines = currentSplitter(str)

    for (const line of lines) {
      if (line.length > 100) {
        if (otherSplitter.length > 0) {
          yield * textSplit(line, otherSplitter)
        } else {
          yield line
        }
      } else yield line
    }
  } else {
    yield str
  }
}

export function * textToSentences (str: string): IterableIterator<string> {
  str = str.replace(/"/g, '\\\\\\"')
  let tmp = ''

  for (const sentence of textSplit(str, [returnSplitter, fullStopSplitter, questionMarkSplitter, exclamationSplitter, semicolonSplitter])) {
    const newSentence = tmp === '' ? sentence : tmp + ' ' + sentence

    if (tmp.length > 100 || newSentence.length > 100) {
      yield tmp
      tmp = sentence
    } else {
      tmp = newSentence
    }
  }
  yield tmp
}
