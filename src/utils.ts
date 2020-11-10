type Tree = {
  isWord: boolean,
  children: { [letter: string]: Tree }
}

const WORDS = require('./words.json')

const getInitialTree = (): Tree => ({ isWord: false, children: {} })

const arrayToTree = (words: Array<string>): Promise<Tree> =>
  new Promise(resolve => {
    words.sort()

    const tree = words.reduce(
      (tree, word) => addWord(word, tree),
      getInitialTree()
    )

    resolve(tree)
  })

const addWord = (word: string, tree: Tree) => {
  const letters: Array<string> = word.split('')
  const lastIndex: number = letters.length - 1

  return letters.reduce((subTree: Tree, letter: string, index: number) => {
    const { children } = subTree

    if (!children[letter]) children[letter] = getInitialTree()
    if (index === lastIndex) children[letter].isWord = true

    return children[letter]
  }, tree)
}

let wordsTree: Tree = getInitialTree()

function * wordGenerator (tree: Tree, prefix: string = ''): Generator<string, void, undefined> {
  const { children } = tree

  for (const letter in children) {
    const nextPrefix: string = prefix + letter

    if (children[letter].isWord) yield nextPrefix
    yield * wordGenerator(children[letter], nextPrefix)
  }
}

const treeToArray = (tree: Tree, limit: number): Array<string> => {
  const wordGen = wordGenerator(tree)
  const words = []

  let word
  while (words.length < limit && !(word = wordGen.next()).done) {
    words.push(word.value)
  }

  return words
}

const initTree = async () => { wordsTree = await arrayToTree(WORDS) }

const autocomplete = (word: string, limit: number): Array<string> => {
  const letters: Array<string> = word.split('')
  const subTree: Tree = letters.reduce(({ children }, letter) =>
    children[letter] || getInitialTree(), wordsTree)

  return treeToArray(subTree, limit)
}

export { initTree, autocomplete }
