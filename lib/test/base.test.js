const hook = require('../')

const fixtures = {
  raw: {
    'package.json': JSON.stringify({
      name: 'package',
      version: '1.0.0',
      dependencies: {
        sharec: '1.0.0',
      },
    }, null, 4),
  },
  prettier: {
    js: `module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  tabs: true,
  tabWidth: 2,
}`,
    json: {
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 120,
      tabs: true,
      tabWidth: 2,
    },
    yaml: `semi: false
singleQuote: true
trailingComma: 'all'
printWidth: 120
tabs: true
tabWidth: 2`,
    package: JSON.stringify({
      name: 'awesome-package',
      version: '1.0.0',
      dependencies: {
        sharec: '1.0.0',
      },
      prettier: {
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 120,
        tabs: true,
        tabWidth: 2,
      },
    }, null, 4),
  },
}

describe('prettierHook', () => {
  let semaphore

  beforeEach(() => {
    jest.clearAllMocks()
    semaphore = {
      start: jest.fn(),
      error: jest.fn(),
      success: jest.fn(),
      warn: jest.fn(),
    }
  })

  describe('without configs', () => {
    it('returns configs as is', async () => {
      const context = {
        mergedConfigs: {},
      }
      const result = await hook(context, semaphore)

      expect(result.mergedConfigs).toEqual({})
    })
  })

  describe('without prettier config', () => {
    it('returns configs as is', async () => {
      const context = {
        mergedConfigs: {
          ...fixtures.raw,
        },
      }
      const result = await hook(context, semaphore)

      expect(result.mergedConfigs).toMatchSnapshot()
    })
  })

  describe('`prettier` field in package.json', () => {
    it('formats configs', async () => {
      const context = {
        mergedConfigs: {
          'package.json': fixtures.prettier.package,
        },
      }
      const result = await hook(context, semaphore)

      expect(result.mergedConfigs['package.json']).toMatchSnapshot()
    })
  })

  describe('js config file', () => {
    it('formats configs', async () => {
      const context = {
        mergedConfigs: {
          ...fixtures.raw,
          '.prettierrc.js': fixtures.prettier.js,
        },
      }
      const result = await hook(context, semaphore)

      expect(result.mergedConfigs['package.json']).toMatchSnapshot()
    })
  })

  describe('yaml config file', () => {
    describe('with yaml extension', () => {
      it('formats configs', async () => {
        const context = {
          mergedConfigs: {
            ...fixtures.raw,
            '.prettierrc.yaml': fixtures.prettier.yaml,
          },
        }
        const result = await hook(context, semaphore)

        expect(result.mergedConfigs['package.json']).toMatchSnapshot()
      })
    })

    describe('without yaml extension', () => {
      it('formats configs', async () => {
        const context = {
          mergedConfigs: {
            ...fixtures.raw,
            '.prettierrc': fixtures.prettier.yaml,
          },
        }
        const result = await hook(context, semaphore)

        expect(result.mergedConfigs['package.json']).toMatchSnapshot()
      })
    })
  })

  describe('json config file', () => {
    it('formats configs', async () => {
      const context = {
        mergedConfigs: {
          ...fixtures.raw,
          '.prettierrc': fixtures.prettier.json,
        },
      }
      const result = await hook(context, semaphore)

      expect(result.mergedConfigs['package.json']).toMatchSnapshot()
    })
  })
})
