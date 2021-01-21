const FUNCTION_REGEX = /(function)?(\s[a-zA-Z0-9_]*\s*)?[(]?([^>)]*)[)]?\W*[{=>]*\W*([\s\S]+)?[};]{0,}/m
const ARGUMENT_REGEX = /^(function\s*\w*\s*)?[(]?([^{>]*)[)]?\s*(=>)?\s*[{]?/
const NYC_DEFAULT_REGEX = /[=]\s*[(][^)]+[)]/g
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
const ARGUMENTS_TAG = '[object Arguments]'
const ARRAY_TAG = '[object Array]'
const ASYNC_TAG = '[object AsyncFunction]'
const BOOL_TAG = '[object Boolean]'
const DATE_TAG = '[object Date]'
const ERROR_TAG = '[object Error]'
const FUNC_TAG = '[object Function]'
const GEN_TAG = '[object GeneratorFunction]'
const MAP_TAG = '[object Map]'
const NUMBER_TAG = '[object Number]'
const NULL_TAG = '[object Null]'
const OBJECT_TAG = '[object Object]'
const PROMISE_TAG = '[object Promise]'
const PROXY_TAG = '[object Proxy]'
const REGEX_TAG = '[object RegExp]'
const SET_TAG = '[object Set]'
const STRING_TAG = '[object String]'
const SYMBOL_TAG = '[object Symbol]'
const UNDEFINED_TAG = '[object Undefined]'
const WEAKMAP_TAG = '[object WeakMap]'
const WEAKSET_TAG = '[object WeakSet]'
const ARRAYBUFFER_TAG = '[object ArrayBuffer]'
const DATAVIEW_TAG = '[object DataView]'
const FLOAT32_TAG = '[object Float32Array]'
const FLOAT64_TAG = '[object Float64Array]'
const INT8_TAG = '[object Int8Array]'
const INT16_TAG = '[object Int16Array]'
const INT32_TAG = '[object Int32Array]'
const UINT8_TAG = '[object Uint8Array]'
const UINT8CLAMP_TAG = '[object Uint8ClampedArray]'
const UINT16_TAG = '[object Uint16Array]'
const UINT32_TAG = '[object Uint32Array]'
const NOT_AN_OBJECT = ''
/* eslint-enable */

function any (list, predicate = y => y) {
  let met = false
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) {
      met = true
      break
    }
  }
  return met
}

function applyWhen (fn, args) {
  if (!args || args.length === 0) {
    return fn()
  } else {
    return Promise.all(args.map(arg => isPromisey(arg) ? arg : Promise.resolve(arg)))
      .then(values => fn.apply(null, values))
  }
}

function bindAll (obj) {
  const target = obj.prototype ? obj.prototype : obj
  const names = Object.getOwnPropertyNames(target)
  names.forEach(name => {
    const prop = target[name]
    if (typeof prop === 'function') {
      obj[name] = prop.bind(obj)
    }
  })
}

function clone (source, target) {
  const tag = getObjectTag(source)
  if (source == null || typeof source !== 'object') {
    return source
  } else if (!isObject(source) && !Array.isArray(source)) {
    return source
  } else if (tag === BOOL_TAG || tag === STRING_TAG || tag === NUMBER_TAG ||
            tag === FUNC_TAG || tag === DATE_TAG || tag === REGEX_TAG ||
            tag === GEN_TAG || tag === ASYNC_TAG || tag === PROXY_TAG ||
            tag === PROMISE_TAG) {
    return new source.constructor(source)
  }

  target = target || new source.constructor()
  for (const key in source) {
    target[key] = typeof target[key] === 'undefined' ? clone(source[key], null) : target[key]
  }
  return target
}

function contains (list, value) {
  return list && list.indexOf(value) >= 0
}

function defaults (target, ...sources) {
  sources.forEach((source) => {
    for (const key in source) {
      if (!target[key]) {
        target[key] = source[key]
      }
    }
  })
  return target
}

function each (obj, iterator) {
  return Object.keys(obj)
    .forEach((key, i) => iterator(obj[key], key, i))
}

function exists (x) {
  return x !== undefined && x !== null
}

function filter (list, predicate = y => y) {
  return list.reduce((acc, x) => predicate(x) ? acc.concat(x) : acc, [])
}

function find (list, predicate = y => y) {
  if (list.length === 0) {
    return undefined
  }
  let found = false
  let index = -1
  let item
  do {
    item = list[++index]
    found = predicate(item)
  } while (!found && index < list.length - 1)
  return found ? item : undefined
}

function flatten (list) {
  return list.reduce((acc, b) =>
    acc.concat(Array.isArray(b) ? flatten(b) : b)
  , [])
}

function getArguments (fn) {
  const source = fn.toString().replace(NYC_DEFAULT_REGEX, '')
  const match = ARGUMENT_REGEX.exec(source)
  return filter(match[2].replace(/[) ]/g, '').split(','))
    .map(x => x.split('=')[0])
}

function getObjectTag (value) {
  if (!isObject(value)) {
    return NOT_AN_OBJECT
  }
  return Object.prototype.toString.call(value)
}

function has (object, key) {
  return object && exists(object[key])
}

function intersection (a, b) {
  const a1 = uniq(filter(a))
  const b1 = uniq(filter(b))
  return a1.reduce((acc, x) => {
    if (contains(b1, x)) {
      acc.push(x)
    }
    return acc
  }, [])
}

function isDate (value) {
  return getObjectTag(value) === DATE_TAG
}

function isEmpty (value) {
  return value === null || value === undefined || value === ''
}

function isEqual (a, b) {
  if (isObject(a) && isObject(b)) {
    return reduce(a, (acc, v, k) => acc && isEqual(v, b[k]), true)
  } else if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length &&
      a.reduce((acc, x, i) => acc && isEqual(x, b[i]), true)
  } else {
    return a === b
  }
}

function isFunction (value) {
  const tag = getObjectTag(value)
  return tag === FUNC_TAG || tag === GEN_TAG || tag === ASYNC_TAG || tag === PROXY_TAG
}

function isNumber (value) {
  return typeof value === 'number' ||
    (getObjectTag(value) === NUMBER_TAG)
}

function isObject (value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

function isPlainObject (value) {
  return (isObject(value) && value.prototype == null)
}

function isPromisey (x) {
  return x && x.then != null && (typeof x.then === 'function')
}

function isStub (value) {
  return (value && value.toString() === 'stub' && value.name === 'proxy')
}

function isString (value) {
  return typeof value === 'string' ||
    (!Array.isArray(value) && getObjectTag(value) === STRING_TAG)
}

function last (list) {
  return list && list.length >= 0 ? list[list.length - 1] : undefined
}

function lift (asyncFn) {
  const lifted = function (...params) {
    return new Promise((resolve, reject) => {
      function callback (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }
      asyncFn.apply(null, params.concat(callback))
    })
  }
  lifted.name = asyncFn.name
  return lifted
}

function map (obj, fn) {
  return Object.keys(obj).map((k, i) => fn(obj[k], k, i))
}

function mapCall (method, map) {
  const argumentList = getArguments(method).slice(1)
  if (map === false) {
    return method
  } else if (map) {
    return function (actor, message) {
      const appliedArgs = [actor]
      argumentList.forEach((arg) => {
        const prop = map[arg] ? map[arg] : arg
        appliedArgs.push(message[prop])
      })
      return method.apply(undefined, appliedArgs)
    }
  } else {
    return function (actor, message) {
      const appliedArgs = [actor]
      argumentList.forEach((arg) => {
        appliedArgs.push(message[arg])
      })
      return method.apply(undefined, appliedArgs)
    }
  }
}

function matches (filter) {
  return isEqual.bind(null, filter)
}

function melter (target, ...args) {
  if (target === undefined || target === null) {
    target = {}
  }
  args.forEach(o => {
    each(o, (p, k) => {
      if (typeof p === 'function') {
        target[k] = p.bind(target)
      } else {
        target[k] = p
      }
    })
  })
  return target
}

function memoize (fn) {
  const set = new WeakSet()
  const memod = function (...args) {
    if (set.has(args)) {
      return set[args]
    } else {
      var result = fn.apply(null, args)
      set.add(args, result)
      return result
    }
  }
  memod.name = `memoized#{fn.name}`
  return memod
}

function merge (...objects) {
  let copy = {}
  let head
  while (objects.length > 0) {
    head = objects.shift()
    copy = mergeTwo(head, copy)
  }
  return copy
}

function mergeTwo (source, target) {
  const tag = getObjectTag(source)
  if (source == null || typeof source !== 'object') {
    return source
  } else if (!isObject(source) && !Array.isArray(source)) {
    return target
  } else if (Array.isArray(source) && target) {
    return source.concat(target)
  } else if (tag === BOOL_TAG || tag === STRING_TAG || tag === NUMBER_TAG ||
            tag === FUNC_TAG || tag === DATE_TAG || tag === REGEX_TAG ||
            tag === GEN_TAG || tag === ASYNC_TAG || tag === PROXY_TAG ||
            tag === PROMISE_TAG) {
    return new source.constructor(source)
  }

  target = target || new source.constructor()
  for (var key in source) {
    target[ key ] = typeof target[ key ] === 'undefined'
      ? mergeTwo(source[ key ], null)
      : mergeTwo(source[ key ], target[ key ])
  }
  return target
}

function omit (obj, ...keys) {
  const list = flatten(keys)
  return reduce(obj, (o, v, k) => {
    if (!contains(list, k)) {
      o[k] = v
    }
    return o
  }, {})
}

function noop () {}

function parseFunction (fn) {
  const source = fn.toString().replace(NYC_DEFAULT_REGEX, '')
  const parts = FUNCTION_REGEX.exec(source)
  console.log(source)
  return {
    name: parts[2] ? parts[2].trim() : undefined,
    arguments: filter(parts[3]
      .replace(/(\s|[(])/g, '')
      .split(','))
      .map(x => x.split('=')[0]),
    body: parts[4]
  }
}

function reduce (obj, fn, acc) {
  Object.keys(obj).forEach((k, i) => {
    acc = fn(acc, obj[k], k, i)
  })
  return acc
}

function sequence (...args) {
  const calls = flatten(args)
  if (!calls || calls.length === 0) {
    return Promise.resolve([])
  }
  const list = new Array(calls.length)
  let index = -1
  function invoke () {
    const value = calls[++index]()
    if (isPromisey(value)) {
      return value.then(next, next)
    } else {
      return next(value)
    }
  }
  function next (result) {
    list[index] = result
    if (index < list.length - 1) {
      return invoke()
    } else {
      return list
    }
  }
  return invoke()
}

function sortBy (list, prop) {
  list.sort((a, b) => {
    if (a[prop] < b[prop]) {
      return -1
    } else if (a[prop] > b[prop]) {
      return 1
    } else {
      return 0
    }
  })
  return list
}

function transform (obj, aliases, ...omit) {
  const list = flatten(omit)
  return reduce(obj, (o, v, k) => {
    if (!contains(list, k)) {
      o[aliases[k] || k] = v
    }
    return o
  }, {})
}

function trimString (str) {
  return str.trim()
}

function trim (list) {
  return (list && list.length) ? filter(list.map(trimString)) : []
}

function type (obj) {
  return Object.prototype.toString.call(obj)
}

function uniq (original) {
  return original.reduce((acc, x) => {
    if (!contains(acc, x)) {
      acc.push(x)
    }
    return acc
  }, [])
}

function unique (list, identity = x => x) {
  const ids = []
  return list.reduce((acc, item) => {
    const id = identity(item)
    if (ids.indexOf(id) < 0) {
      ids.push(id)
      acc.push(item)
    }
    return acc
  }, [])
}

function values (obj) {
  return Object.keys(obj).map(k => obj[k])
}

function without (a, b) {
  const a1 = uniq(filter(a))
  const b1 = uniq(filter(b))
  return a1.reduce((acc, x) => {
    if (!contains(b1, x)) {
      acc.push(x)
    }
    return acc
  }, [])
}

module.exports = {
  any: any,
  applyWhen: applyWhen,
  bindAll: bindAll,
  contains: contains,
  clone: clone,
  defaults: defaults,
  each: each,
  exists: exists,
  find: find,
  filter: filter,
  flatten: flatten,
  getArguments: getArguments,
  getObjectTag: getObjectTag,
  has: has,
  intersection: intersection,
  isDate: isDate,
  isEmpty: isEmpty,
  isEqual: isEqual,
  isFunction: isFunction,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isPromisey: isPromisey,
  isStub: isStub,
  isString: isString,
  last: last,
  lift: lift,
  map: map,
  mapCall: mapCall,
  matches: matches,
  melter: melter,
  memoize: memoize,
  merge: merge,
  omit: omit,
  noop: noop,
  parseFunction: parseFunction,
  reduce: reduce,
  sequence: sequence,
  sortBy: sortBy,
  transform: transform,
  trim: trim,
  trimString: trimString,
  type: type,
  uniq: uniq,
  unique: unique,
  values: values,
  without: without
}
