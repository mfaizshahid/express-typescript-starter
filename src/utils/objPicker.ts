import utils from "@/utils/global.utils";

/**
 * Extracts specified keys from an object and returns them in a new object.
 *
 * @param {object} object - The object to pick keys from.
 * @param {string[]} keys - The keys to pick from the object.
 * @returns {object} - A new object with the specified keys.
 */
function single(object: object, keys: string[]): object {
  return keys.reduce((obj: object, key: string) => {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      obj[key] = object[key];
    }
    return obj;
  }, {});
}

/**
 * Extracts specified keys from an object and returns them in a new object.
 *
 * @param {object} object - The object to pick keys from.
 * @param {string[]} keys - The keys to pick from the object.
 * @returns {object} - A new object with the specified keys.
 */
function recursive(object: object, keys: string[]): any {
  function pickRecursively(obj: any, keyArray: string[]): object {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    const newObj = {};
    for (const key of keyArray) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        if (value instanceof Date) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          newObj[key] = utils.formatDate(value);
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          newObj[key] = pickRecursively(value, keyArray);
        }
      }
    }
    return newObj;
  }
  return pickRecursively(object, keys);
}

export default {
  single,
  recursive,
};
