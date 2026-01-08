const FUNCTION_REGEX = /(function)?(\s[a-zA-Z0-9_]*\s*)?[(]?([^>)]*)[)]?\W*[{=>]*\W*([\s\S]+)?[};]{0,}/m;
const ARGUMENT_REGEX = /^(function\s*\w*\s*)?[(]?([^{>]*)[)]?\s*(=>)?\s*[{]?/;
const NYC_DEFAULT_REGEX = /[=]\s*[(][^)]+[)]/g;
/**
 * Object Comparison Approach Copied & Adapted from Lodash
 * Lodash <https://lodash.com/>
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
/** `Object#toString` result references. */
/* eslint-disable */
const ARGUMENTS_TAG = '[object Arguments]';
const ARRAY_TAG = '[object Array]';
const ASYNC_TAG = '[object AsyncFunction]';
const BOOL_TAG = '[object Boolean]';
const DATE_TAG = '[object Date]';
const ERROR_TAG = '[object Error]';
const FUNC_TAG = '[object Function]';
const GEN_TAG = '[object GeneratorFunction]';
const MAP_TAG = '[object Map]';
const NUMBER_TAG = '[object Number]';
const NULL_TAG = '[object Null]';
const OBJECT_TAG = '[object Object]';
const PROMISE_TAG = '[object Promise]';
const PROXY_TAG = '[object Proxy]';
const REGEX_TAG = '[object RegExp]';
const SET_TAG = '[object Set]';
const STRING_TAG = '[object String]';
const SYMBOL_TAG = '[object Symbol]';
const UNDEFINED_TAG = '[object Undefined]';
const WEAKMAP_TAG = '[object WeakMap]';
const WEAKSET_TAG = '[object WeakSet]';
const ARRAYBUFFER_TAG = '[object ArrayBuffer]';
const DATAVIEW_TAG = '[object DataView]';
const FLOAT32_TAG = '[object Float32Array]';
const FLOAT64_TAG = '[object Float64Array]';
const INT8_TAG = '[object Int8Array]';
const INT16_TAG = '[object Int16Array]';
const INT32_TAG = '[object Int32Array]';
const UINT8_TAG = '[object Uint8Array]';
const UINT8CLAMP_TAG = '[object Uint8ClampedArray]';
const UINT16_TAG = '[object Uint16Array]';
const UINT32_TAG = '[object Uint32Array]';
const NOT_AN_OBJECT = '';
const NULL_PROTOTYPE = Object.getPrototypeOf({});
function any(list, predicate = (y) => Boolean(y)) {
    let met = false;
    for (let i = 0; i < list.length; i++) {
        if (predicate(list[i])) {
            met = true;
            break;
        }
    }
    return met;
}
function applyWhen(fn, args) {
    if (!args || args.length === 0) {
        return fn();
    }
    else {
        return Promise.all(args.map((arg) => isPromisey(arg) ? arg : Promise.resolve(arg)))
            .then((values) => fn.apply(null, values));
    }
}
function bindAll(obj) {
    const target = (obj.prototype ? obj.prototype : obj);
    const cast = obj;
    const names = Object.getOwnPropertyNames(target);
    if (target === undefined || target === null || cast === undefined || cast === null) {
        return;
    }
    names.forEach((name) => {
        const prop = target[name];
        if (typeof prop === 'function') {
            cast[name] = prop.bind(obj);
        }
    });
}
function clone(source, target) {
    const tag = getObjectTag(source);
    if (source == null || typeof source !== 'object') {
        return source;
    }
    else if (!isObject(source) && !Array.isArray(source)) {
        return source;
    }
    else if (tag === BOOL_TAG || tag === STRING_TAG || tag === NUMBER_TAG ||
        tag === FUNC_TAG || tag === DATE_TAG || tag === REGEX_TAG ||
        tag === GEN_TAG || tag === ASYNC_TAG || tag === PROXY_TAG ||
        tag === PROMISE_TAG) {
        return new source.constructor(source);
    }
    const newTarget = (target || new source.constructor());
    const cast = source;
    if (newTarget === undefined || newTarget === null) {
        throw new Error('Cannot clone to undefined or null target');
    }
    if (cast === undefined || cast === null) {
        throw new Error('Cannot clone from undefined or null source');
    }
    for (const key in source) {
        newTarget[key] = typeof newTarget[key] === 'undefined' ? clone(cast[key], null) : newTarget[key];
    }
    return newTarget;
}
function contains(list, value) {
    return Boolean(list && list.indexOf(value) >= 0);
}
function defaults(target, ...sources) {
    if (target === undefined || target === null) {
        throw new Error('Cannot apply defaults to undefined or null target');
    }
    sources.forEach((source) => {
        const cast = source;
        if (!cast) {
            return;
        }
        for (const key in source) {
            const k = key;
            if (!target[k]) {
                target[k] = cast[k];
            }
        }
    });
    return target;
}
function each(obj, iterator) {
    if (!obj) {
        return;
    }
    getKeys(obj)
        .forEach((key, i) => iterator(obj[key], key, i));
}
function exists(x) {
    return x !== undefined && x !== null;
}
function filter(list, predicate = (y) => Boolean(y)) {
    return list.reduce((acc, x) => predicate(x) ? acc.concat(x) : acc, []);
}
function find(list, predicate = (y) => Boolean(y)) {
    if (list.length === 0) {
        return undefined;
    }
    let found = false;
    let index = -1;
    let item;
    do {
        item = list[++index];
        found = predicate(item);
    } while (!found && index < list.length - 1);
    return found ? item : undefined;
}
function flatten(list) {
    return list.reduce((acc, b) => acc.concat(Array.isArray(b) ? flatten(b) : b), []);
}
function future() {
    let res;
    let rej;
    const promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });
    return { promise, resolve: res, reject: rej };
}
function getArguments(fn) {
    const source = fn.toString().replace(NYC_DEFAULT_REGEX, '');
    const match = ARGUMENT_REGEX.exec(source);
    if (!match) {
        return [];
    }
    return match[2]
        .replace(/[) ]/g, '')
        .split(',')
        .map((x) => x.split('=')[0])
        .filter(x => isEmpty(x) === false);
}
function getKeys(obj) {
    if (obj) {
        return Object.keys(obj).concat(getPrototypeKeys(obj));
    }
    return [];
}
function getObjectTag(value) {
    if (!isObject(value)) {
        return NOT_AN_OBJECT;
    }
    return Object.prototype.toString.call(value);
}
function getPrototypeKeys(obj) {
    const proto = Object.getPrototypeOf(obj);
    return proto === NULL_PROTOTYPE
        ? []
        : Object.keys(proto);
}
function has(obj, key) {
    return Boolean(obj && exists(obj[key]));
}
function intersection(a, b) {
    const a1 = uniq(filter(a));
    const b1 = uniq(filter(b));
    return a1.reduce((acc, x) => {
        if (contains(b1, x)) {
            acc.push(x);
        }
        return acc;
    }, []);
}
function isDate(value) {
    return getObjectTag(value) === DATE_TAG;
}
function isEmpty(value) {
    return value === null || value === undefined || value === '';
}
function isEqual(a, b) {
    if (isObject(a) && isObject(b)) {
        return reduce(a, (acc, v, k) => acc && isEqual(v, b[k]), true);
    }
    else if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length &&
            a.reduce((acc, x, i) => acc && isEqual(x, b[i]), true);
    }
    else {
        return a === b;
    }
}
function isFunction(value) {
    const tag = getObjectTag(value);
    return tag === FUNC_TAG || tag === GEN_TAG || tag === ASYNC_TAG || tag === PROXY_TAG;
}
function isNumber(value) {
    return typeof value === 'number' ||
        (getObjectTag(value) === NUMBER_TAG);
}
function isObject(value) {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function');
}
function isPlainObject(value) {
    return (isObject(value) && Object.getPrototypeOf(value) === NULL_PROTOTYPE);
}
function isPromisey(x) {
    return x && x.then != null && (typeof x.then === 'function');
}
function isStub(value) {
    return (value && value.toString() === 'stub' && value.name === 'proxy');
}
function isString(value) {
    return typeof value === 'string' ||
        (!Array.isArray(value) && getObjectTag(value) === STRING_TAG);
}
function last(list) {
    return list && list.length >= 0 ? list[list.length - 1] : undefined;
}
function lift(asyncFn) {
    const lifted = function (...params) {
        return new Promise((resolve, reject) => {
            function callback(err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            }
            asyncFn.apply(null, params.concat(callback));
        });
    };
    Object.defineProperty(lifted, 'name', { value: asyncFn.name });
    return lifted;
}
function map(obj, fn) {
    if (!obj) {
        return [];
    }
    return getKeys(obj).map((k, i) => fn(obj[k], k, i));
}
function mapCall(method, map) {
    const argumentList = getArguments(method).slice(1);
    if (map === false) {
        return method;
    }
    else {
        return function (actor, message) {
            const appliedArgs = [actor];
            const messageKeys = getKeys(message);
            argumentList.forEach((arg) => {
                const prop = (map && map[arg]) ? map[arg] : arg;
                if (argumentList.length === 1) {
                    if (contains(messageKeys, prop)) {
                        appliedArgs.push(message[prop]);
                    }
                    else {
                        appliedArgs.push(message);
                    }
                }
                else {
                    appliedArgs.push(message[prop]);
                }
            });
            return method.apply(undefined, appliedArgs);
        };
    }
}
function matches(filterValue) {
    return isEqual.bind(null, filterValue);
}
function melter(target, ...args) {
    const merged = ((target === undefined || target === null) ? {} : target);
    if (merged === undefined || merged === null) {
        throw new Error('Cannot melter to undefined or null target');
    }
    args.forEach((o) => {
        each(o, (p, k) => {
            if (typeof p === 'function') {
                merged[k] = p.bind(merged);
            }
            else {
                merged[k] = p;
            }
        });
    });
    return merged;
}
function memoize(fn) {
    const set = new WeakMap();
    const memod = function (...args) {
        const key = args;
        if (set.has(key)) {
            return set.get(key);
        }
        else {
            const result = fn.apply(null, args);
            set.set(key, result);
            return result;
        }
    };
    Object.defineProperty(memod, 'name', { value: `memoized#${fn.name}` });
    return memod;
}
function merge(...objects) {
    let copy = {};
    let head;
    while (objects.length > 0) {
        head = objects.shift();
        copy = mergeTwo(head, copy);
    }
    return copy;
}
function mergeTwo(source, target) {
    const tag = getObjectTag(source);
    if (source == null || typeof source !== 'object') {
        return source;
    }
    else if (!isObject(source) && !Array.isArray(source)) {
        return target;
    }
    else if (Array.isArray(source) && target) {
        return source.concat(target);
    }
    else if (tag === BOOL_TAG || tag === STRING_TAG || tag === NUMBER_TAG ||
        tag === FUNC_TAG || tag === DATE_TAG || tag === REGEX_TAG ||
        tag === GEN_TAG || tag === ASYNC_TAG || tag === PROXY_TAG ||
        tag === PROMISE_TAG) {
        return new source.constructor(source);
    }
    const newTarget = (target || new source.constructor());
    if (newTarget === undefined || newTarget === null) {
        throw new Error('Cannot merge to undefined or null target');
    }
    const cast = source;
    if (cast === undefined || cast === null) {
        throw new Error('Cannot merge from undefined or null source');
    }
    for (const key in source) {
        newTarget[key] = typeof newTarget[key] === 'undefined'
            ? mergeTwo(cast[key], null)
            : mergeTwo(cast[key], newTarget[key]);
    }
    return newTarget;
}
function omit(obj, ...keys) {
    const list = flatten(keys);
    return reduce(obj, (o, v, k) => {
        if (o === undefined || o === null) {
            return o;
        }
        if (!contains(list, k)) {
            o[k] = v;
        }
        return o;
    }, {});
}
function noop() { }
function parseFunction(fn) {
    const source = fn.toString().replace(NYC_DEFAULT_REGEX, '');
    const parts = FUNCTION_REGEX.exec(source);
    if (!parts) {
        return { name: undefined, arguments: [], body: undefined };
    }
    return {
        name: parts[2] ? parts[2].trim() : undefined,
        arguments: filter(parts[3]
            .replace(/(\s|[(])/g, '')
            .split(','))
            .map((x) => x.split('=')[0]),
        body: parts[4]
    };
}
function reduce(obj, fn, acc) {
    if (!obj) {
        return acc;
    }
    getKeys(obj).forEach((k, i) => {
        acc = fn(acc, obj[k], k, i);
    });
    return acc;
}
function sequence(...args) {
    const calls = flatten(args);
    if (!calls || calls.length === 0) {
        return Promise.resolve([]);
    }
    const list = new Array(calls.length);
    let index = -1;
    function invoke() {
        const value = calls[++index]();
        if (isPromisey(value)) {
            return value.then(next, next);
        }
        else {
            return next(value);
        }
    }
    function next(result) {
        list[index] = result;
        if (index < list.length - 1) {
            return invoke();
        }
        else {
            return list;
        }
    }
    return invoke();
}
function sortBy(list, prop) {
    list.sort((a, b) => {
        if (a === undefined || a === null) {
            return -1;
        }
        else if (b === undefined || b === null) {
            return 1;
        }
        else if (a[prop] < b[prop]) {
            return -1;
        }
        else if (a[prop] > b[prop]) {
            return 1;
        }
        else {
            return 0;
        }
    });
    return list;
}
function transform(obj, aliases, ...omitKeys) {
    const list = flatten(omitKeys);
    return reduce(obj, (o, v, k) => {
        if (o === undefined || o === null) {
            return o;
        }
        if (!contains(list, k)) {
            o[aliases[k] || k] = v;
        }
        return o;
    }, {});
}
function trimString(str) {
    if (str === undefined || str === null) {
        return '';
    }
    return str.trim();
}
function trim(list) {
    return (list && list.length) ? filter(list.map(trimString)) : [];
}
function type(obj) {
    return Object.prototype.toString.call(obj);
}
function uniq(original) {
    return original.reduce((acc, x) => {
        if (!contains(acc, x)) {
            acc.push(x);
        }
        return acc;
    }, []);
}
function unique(list, identity = (x) => x) {
    const ids = [];
    return list.reduce((acc, item) => {
        const id = identity(item);
        if (ids.indexOf(id) < 0) {
            ids.push(id);
            acc.push(item);
        }
        return acc;
    }, []);
}
function values(obj) {
    if (!obj) {
        return [];
    }
    return Object.keys(obj).map((k) => obj[k]);
}
function without(a, b) {
    const a1 = uniq(filter(a));
    const b1 = uniq(filter(b));
    return a1.reduce((acc, x) => {
        if (!contains(b1, x)) {
            acc.push(x);
        }
        return acc;
    }, []);
}
export default {
    any,
    applyWhen,
    bindAll,
    contains,
    clone,
    defaults,
    each,
    exists,
    find,
    filter,
    flatten,
    future,
    getArguments,
    getObjectTag,
    has,
    intersection,
    isDate,
    isEmpty,
    isEqual,
    isFunction,
    isNumber,
    isObject,
    isPlainObject,
    isPromisey,
    isStub,
    isString,
    last,
    lift,
    map,
    mapCall,
    matches,
    melter,
    memoize,
    merge,
    omit,
    noop,
    parseFunction,
    reduce,
    sequence,
    sortBy,
    transform,
    trim,
    trimString,
    type,
    uniq,
    unique,
    values,
    without
};
