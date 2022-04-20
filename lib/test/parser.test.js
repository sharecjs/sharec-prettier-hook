const { getParserByFilename } = require('../parser')

describe('parser > getParserByFilename', () => {
  it('returns parser name by given filename', () => {
    expect(getParserByFilename('foo.js')).toEqual('babel')
    expect(getParserByFilename('foo.jsx')).toEqual('babel')
    expect(getParserByFilename('foo.ts')).toEqual('babel-ts')
    expect(getParserByFilename('foo.tsx')).toEqual('babel-ts')
    expect(getParserByFilename('foo.json')).toEqual('json')
    expect(getParserByFilename('foo.yaml')).toEqual('yaml')
    expect(getParserByFilename('foo.css')).toEqual('css')
    expect(getParserByFilename('foo.scss')).toEqual('css')
    expect(getParserByFilename('foo.sass')).toEqual('css')
    expect(getParserByFilename('foo.less')).toEqual('css')
  })
})
