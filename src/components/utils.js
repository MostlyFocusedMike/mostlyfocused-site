export const escapeText = (str) => str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");


/**
 * Utility wrapper for easy html interpolation
 * @param {any[]} array array of values
 * @param {function} callback The function to go into array.map
 * @returns stringified html elements
 */
export const $m = (array, callback) => array.map(callback).join('');

/**
 * utility wrapper for JSON.stringify, with error handling
 * @param {any} value val to stringify
 * @returns stringified object | ''
 */
export const $s = (value) => {
  try {
    return JSON.stringify(value);
  } catch (err) {
    console.error(err)
    return '';
  }
};

/**
 * utility wrapper for JSON.parse, with error handling
 * @param {any} value val to parse
 * @returns parsed value | false
 */
export const $p = (value) => {
  try {
    return JSON.parse(value);
  } catch (err) {
    console.error(err)
    return false;
  }
}