// @ts-check
const { format } = require('prettier')
const yaml = require('js-yaml')
const { getParserByFilename } = require('./parser')

/**
 * @typedef {import('sharec-core').FlowContext} FlowContext
 * @typedef {import('sharec-core').Semaphore} Semaphore
 */

/**
 * Formats configuration inside the current flow context by prettier rules
 * Usage example:
 * ```js
 * const prettierHook = require('sharec-prettier-hook')
 *
 * module.exports = {
 *   afterMerge: prettierHook,
 * }
 * ```
 * @param {FlowContext} context
 * @param {Semaphore} semaphore
 * @returns {Promise<FlowContext>}
 */
const prettierHook = async (context, semaphore) => {
  semaphore.start('prettier: formatting')

  const { mergedConfigs } = context

  if (Object.keys(mergedConfigs).length === 0) {
    semaphore.error('prettier: nothing to format')

    return context
  }

  const jsConfigKey = Object.keys(mergedConfigs).find(key => /\.prettierrc\.c?js/.test(key))
  const jsonConfigKey = Object.keys(mergedConfigs).find(key => /\.prettierrc(\.json)?$/.test(key))
  const yamlConfigKey = Object.keys(mergedConfigs).find(key => /\.prettierrc\.ya?ml/.test(key))
  const { prettier = null } = mergedConfigs['package.json']
    ? JSON.parse(mergedConfigs['package.json'])
    : {}
  let prettierRules = prettier

  if (!prettierRules && jsConfigKey) {
    try {
      // eslint-disable-next-line
      prettierRules = eval(mergedConfigs[jsConfigKey])
    } catch (err) {}
  }

  if (!prettierRules && yamlConfigKey) {
    prettierRules = yaml.load(mergedConfigs[yamlConfigKey])
  }

  if (!prettierRules && jsonConfigKey) {
    try {
      prettierRules = JSON.parse(mergedConfigs[jsonConfigKey])
    } catch (err) {
      prettierRules = yaml.load(mergedConfigs[jsonConfigKey])
    }
  }

  if (!prettierRules) {
    semaphore.warn("prettier: can't find any prettier config")

    return context
  }

  for (const config in mergedConfigs) {
    const parser = getParserByFilename(config)

    if (!parser) continue

    mergedConfigs[config] = format(mergedConfigs[config], {
      ...prettierRules,
      parser,
    })
  }

  semaphore.start('prettier: configs have been formatted')

  return context
}

module.exports = prettierHook
