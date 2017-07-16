const FUNCTION_REGEX = /(function)?(\s[a-zA-Z0-9_]*)?[(]?([^>)]*)[)]?\W*[{=>]*\W*([\s\S]+)?[};]{0,}/m
const ARGUMENT_REGEX = /^(function\s*\w*\s*)?[(]?([^)>]*)[)]?\s*(=>)?\s*[{]/
/**
 * Object Comparison Approach Copied & Adapted from Lodash
 * Lodash <https://lodash.com/>
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
/** `Object#toString` result references. */
const ASYNC_TAG = '[object AsyncFunction]'
const BOOL_TAG = '[object Boolean]'
const DATE_TAG = '[object Date]'
const FUNC_TAG = '[object Function]'
const GEN_TAG = '[object GeneratorFunction]'
const NUMBER_TAG = '[object Number]'
const PROMISE_TAG = '[object Promise]'
const PROXY_TAG = '[object Proxy]'
const REGEX_TAG = '[object RegExp]'
const STRING_TAG = '[object String]'
const NOT_AN_OBJECT = ''

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
    return Promise.all(args.map(arg => isPromisey(arg) ? arg : arg))
      .then(values => fn.apply(null, values))
  }
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
  for (var key in source) {
    target[ key ] = typeof target[ key ] === 'undefined' ? clone(source[ key ], null) : target[ key ]
  }
  return target
}

function contains (list, value) {
  return list.indexOf(value) >= 0
}

function each (obj, fn) {
  return Object.keys(obj).forEach(k => fn(obj[k], k))
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
  var item
  do {
    item = list[ ++index ]
    found = predicate(item)
  } while (!found && index < list.length - 1)
  return found ? item : undefined
}

function flatten (list) {
  return list.reduce((a, b) =>
    a.concat(Array.isArray(b) ? flatten(b) : b)
  , [])
}

function getArguments (fn) {
  const match = ARGUMENT_REGEX.exec(fn.toString())
  return filter(match[ 2 ].replace(/\s/g, '').split(','))
    .map(x => x.split('=')[0])
}

function getObjectTag (value) {
  if (!isObject(value)) {
    return NOT_AN_OBJECT
  }
  return Object.prototype.toString.call(value)
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
  return Object.keys(obj).map(k => fn(obj[k], k))
}

function matches (filter) {
  return isEqual.bind(null, filter)
}

function noop () {}

function parseFunction (fn) {
  const parts = FUNCTION_REGEX.exec(fn.toString())
  return {
    name: parts[ 2 ] ? parts[ 2 ].trim() : undefined,
    arguments: filter(parts[ 3 ]
      .replace(/\s/g, '')
      .split(','))
      .map(x => x.split('=')[0]),
    body: parts[ 4 ]
  }
}

function reduce (obj, fn, acc) {
  Object.keys(obj).forEach(k => {
    acc = fn(acc, obj[k], k)
  })
  return acc
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
  contains: contains,
  clone: clone,
  each: each,
  find: find,
  filter: filter,
  flatten: flatten,
  getArguments: getArguments,
  getObjectTag: getObjectTag,
  intersection: intersection,
  isDate: isDate,
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
  matches: matches,
  noop: noop,
  parseFunction: parseFunction,
  reduce: reduce,
  trim: trim,
  trimString: trimString,
  type: type,
  uniq: uniq,
  values: values,
  without: without
}
