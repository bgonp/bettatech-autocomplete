// Cada nodo del árbol de búsqueda es a su vez un árbol, el cual tiene
// hijos (cada índice una letra) y un boolean que representa si este
// nodo es el final de una palabra.
type Tree = {
  isWord: boolean,
  children: { [letter: string]: Tree }
}

// Array con más de un millón de palabras (caracteres aleatorios, no palabras reales).
const WORDS = require('./words.json')

// Primer nodo del árbol de búsqueda, del que parten todas las palabras.
const getInitialTree = (): Tree => ({ isWord: false, children: {} })
let wordsTree: Tree = getInitialTree()

// Generador que, dado un árbol (subárbol del principal) y un prefijo, devuelve un sufijo válido.
function * wordGenerator (tree: Tree, prefix: string = ''): Generator<string, void, undefined> {
  const { children } = tree

  for (const letter in children) {
    const nextPrefix: string = prefix + letter

    if (children[letter].isWord) yield nextPrefix
    yield * wordGenerator(children[letter], nextPrefix)
  }
}

// Partiendo del array de palabras, genera el árbol de búsqueda.
const arrayToTree = (words: Array<string>): Promise<Tree> =>
  new Promise(resolve => {
    const tree = words.reduce(
      (tree, word) => addWord(word, tree),
      getInitialTree()
    )

    resolve(tree)
  })

// Agrega al árbol una nueva palabra, cada letra en un nivel del árbol.
const addWord = (word: string, tree: Tree) => {
  const letters: Array<string> = word.toLowerCase().split('')
  const lastIndex: number = letters.length - 1

  letters.reduce((subTree: Tree, letter: string, index: number) => {
    const { children } = subTree

    if (!children[letter]) children[letter] = getInitialTree()
    if (index === lastIndex) children[letter].isWord = true

    return children[letter]
  }, tree)

  return tree
}

// Dado un árbol (subárbol del principal) y un límite, devuelve un array
// con todas las palabras que contiene (hasta el máximo indicado).
const treeToArray = (tree: Tree, limit: number): Array<string> => {
  const wordGen = wordGenerator(tree)
  const words = []

  let word
  while (words.length < limit && !(word = wordGen.next()).done) {
    words.push(word.value)
  }

  return words
}

// Inicializa el árbol principal generado a partir del array de palabras.
const initTree = async () => { wordsTree = await arrayToTree(WORDS) }

// Dado un prefijo y un máximo de sugerencias, devuelve un array con todos
// los sufijos válidos (hasta el máximo indicado).
const getSuggestions = (word: string, limit: number): Array<string> => {
  const letters: Array<string> = word.toLowerCase().split('')
  const subTree: Tree = letters.reduce(({ children }, letter) =>
    children[letter] || getInitialTree(), wordsTree)

  return treeToArray(subTree, limit)
}

export { initTree, getSuggestions }
