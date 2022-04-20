/**
 * Returns prettier-compatible parser by given filename
 * @param {string} filename
 * @returns {'babel'|'babel-ts'|'json'|'yaml'|'css'}
 */
const getParserByFilename = (filename) => {
  switch (true) {
    case /\.(m|c)?jsx?$/.test(filename):
      return 'babel'
    case /\.tsx?$/.test(filename):
      return 'babel-ts'
    case /\.json$/.test(filename):
      return 'json'
    case /\.ya?ml$/.test(filename):
      return 'yaml'
    case /\.(sa|sc|le|c|s)ss$/.test(filename):
      return 'css'
  }
}

module.exports = { getParserByFilename }
