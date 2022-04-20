export = prettierHook
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
declare function prettierHook(context: FlowContext, semaphore: Semaphore): Promise<FlowContext>
declare namespace prettierHook {
  export { FlowContext, Semaphore }
}
type FlowContext = import('sharec-core').FlowContext
type Semaphore = import('sharec-core').Semaphore
