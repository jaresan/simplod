/**
 * @file Contains helper functions for text operations
 * @module @@string
 */

/**
 * Indents text based on curly brackets
 * @function
 * @param s
 * @returns {string|string|*}
 */
export const indentByBrackets = s => s
  .split('\n')
  .reduce((acc, row) => {
    const trimmed = row.trim();
    const hasOpenBracket = row.includes('{');
    const hasCloseBracket = row.includes('}');
    if (hasCloseBracket && !hasOpenBracket) {
      acc.indentation--;
    }
    acc.txt += '\t'.repeat(acc.indentation) + trimmed + '\n';
    if (hasOpenBracket && !hasCloseBracket) {
      acc.indentation++;
    }

    return acc;
  }, {indentation: 0, txt: ''})
  .txt;
