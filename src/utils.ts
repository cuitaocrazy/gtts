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

const colonSplitter = splitterBuilder(':', ':')

const commaSplitter = splitterBuilder(',', ',')

const wordSplitter = splitterBuilder(/\s+/, '')

const maxLength = 200

function * textSplit (str: string, splitter: ((str: string) => string[])[]): IterableIterator<string> {
  if (str.length > maxLength) {
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

  for (const sentence of textSplit(str, [returnSplitter, fullStopSplitter, questionMarkSplitter, exclamationSplitter, semicolonSplitter, colonSplitter, commaSplitter, wordSplitter])) {
    const newSentence = tmp === '' ? sentence : tmp + ' ' + sentence

    if (tmp.length > maxLength || newSentence.length > maxLength) {
      yield tmp
      tmp = sentence
    } else {
      tmp = newSentence
    }
  }
  yield tmp
}
