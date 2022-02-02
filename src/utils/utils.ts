/* eslint-disable import/prefer-default-export */
/**
 * Returns a proxy object with the same values of the original object,
 * but with case insensitive key lookup, and lowercases all keys in Object.keys()
 * @param originalObj original object
 * @returns proxy object
 */
export function convertCaseInsensitive(originalObj: any, inSensitiveCaseFields: string[]) {
    const targetObj = { ...originalObj };
    // return new Proxy(originalObj, {
    //     get: (target, name: string) => target[Object.keys(target).find((k) => k.toLowerCase() === name.toLowerCase())],
    //     ownKeys: (target) => Object.keys(target).map((k) => k.toLowerCase()),
    //     getOwnPropertyDescriptor: (target, prop) => {
    //         const originalProp = Object.getOwnPropertyNames(target).find((p) => p.toLowerCase() === prop.toString().toLowerCase());
    //         return Object.getOwnPropertyDescriptor(target, originalProp);
    //     },
    //     has: (target, key) => !!Object.keys(target).find((p) => p.toLowerCase() === key.toString().toLowerCase()),
    // });
    inSensitiveCaseFields.forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(originalObj, field)) {
            targetObj[field] = originalObj[field].toLowerCase();
        }
    });
    return targetObj;
}

export function sanitizeUndefined(_userQueries: any) {
    // eslint-disable-next-line no-param-reassign
    Object.keys(_userQueries).forEach((key) => _userQueries[key] === undefined && delete _userQueries[key]);
}

export function splitQueryValue(value: any) {
    const result = !Array.isArray(value) ? value?.split(',') : value;
    return result;
}

export function splitQueryValues(queries: Object) {
    const splittedQueries = {};
    Object.entries(queries).forEach((entry) => {
        const [key, value] = entry;
        const splittedValue = !Array.isArray(value) ? value?.split(',') : value;
        splittedQueries[key] = splittedValue;
    });
    return splittedQueries;
}

export function pickCertainFields(obj: Object, keys: string[]) {
    const pickedObj = {};
    keys.forEach((key) => {
        pickedObj[key] = obj[key];
    });
    return pickedObj as any;
}
