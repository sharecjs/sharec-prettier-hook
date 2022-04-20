/**
 * Returns prettier-compatible parser by given filename
 * @param {string} filename
 * @returns {'babel'|'babel-ts'|'json'|'yaml'|'css'}
 */
export function getParserByFilename(filename: string): 'babel' | 'babel-ts' | 'json' | 'yaml' | 'css'
