const splitterBuilder = (punctuation: RegExp | string, appendPunctuation: string) => (str: string) => str.split(punctuation)
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => isEndSymbol(line[line.length - 1]) ? line : line + appendPunctuation)

const endSymbols = ['.', '!', '?', ';']

const isEndSymbol = (c: string) => endSymbols.includes(c)

const returnSplitter = splitterBuilder(/[\r\n]/, '.')

const fullStopSplitter = splitterBuilder(/\.\s/, '.')

const questionMarkSplitter = splitterBuilder('?', '?')

const semicolonSplitter = splitterBuilder(';', ';')

const exclamationSplitter = splitterBuilder('!', '!')

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
