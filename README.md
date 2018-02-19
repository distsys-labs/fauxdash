# fauxdash

This is because I got tired of writing the same kinds of things over and didn't want the to import 3-5 full dependencies. This is for Node 6 forward only. It should probably never be used outside my own projects.

## API

### `any(list, [predicate])`

Returns true if anything in the list passes the `predicate`. The `predicate` defaults to unit (`x => x`) so, "is anything in this list truthy?" is the default.

### `applyWhen(fn, args)`

Returns a promise for the application of the function call `fn` where it will apply the `args` passed (an array) but only after resolving any promises in the list first.

### `bindAll(obj)`

Binds _every_ method in the obj's prototype chain to it. Every last one.

### `contains(list, value)`

Returns a boolean indicating the `value`'s presence in the `list`.

### `clone(obj)`

Creates a deep clone of the `obj`.

### `defaults(obj, ...defaults)`

Returns a new object with missing keys backfilled from objects passed in `defaults`. Uses left-to-right ordering. Will *not* over-write values.

### `each(obj, iterator)`

Executes the iterator for every key-value-pair in `obj`. Calls iterator with `value`, `key` arguments.

### `exists(value)`

Shorthand for checking value against `undefined` and `null`.

### `filter(list, [predicate])`

Returns list without 

### `find(list, [predicate])`

Returns the first item in the `list` that matches `predicate` where `predicate` defaults to unit.

### `flatten(nestedArray)`

Returns single dimensional array.

### `getArguments(fn)`

Returns a list of the arguments contained in the function `fn`.

### `has(obj, propertyName)`

Returns a boolean indicating if `obj` has a property named `propertyName`. Ignores properties set to `undefined` or `null`.

### `intersection(list1, list2)`

Returns a list of the items contained in both lists.

### `last(list, [predicate])`

Returns the last occurence of an item matching `predicate` where `predicate` defaults to unit.

### `lift(asyncFn)`

Returns a promisified version of the Node-style async function `asyncFn`.

### `map(obj, iterator)`

Returns an array based on running `iterator` against every key value pair in `obj`. Calls `iterator` with `value`, `key` argument ordering.

### `mapCall(method, map)`

Takes a method that accepts a context arg and then a series of arguments that require a mapping from an incoming object.

Returns a new function that takes a context argument and an object to be mapped across the rest of the arguments.

### `matches(filter)`

Creates a new function that compares a value for deep equality to make comparisons simpler and repeatable.

### `omit(obj, ...keys)`

Returns a new version of `obj` without the `keys`.

### `noop`

### `parseFunction(fn)`

Returns an object with the properties `name` and `arguments`.

### `reduce(obj, iterator, accumulator)`

Returns a reduction over the key value pairs in `obj` calling `iterator`. Calls `iterator` with `accumulator`, `value`, `key` argument order.

### `sequence(...functions)`

Executes the list of `functions` in order and returns a list with the ordered results. Functions can return a promise.

### `sortBy(list, identity)`

Returns `list` sorted by the result returned from `identity` for each item.

### `transform(obj, aliases, [...omit])`

Renames keys in `obj` using the `aliases` lookup. Will omit any key in `omit`.

### `trim(list)`

Returns a new list with the space trimmed from every item.

### `trimString()`

Trims space from `str`.

### `type(obj)`

Returns the `obj`'s prototype name.

### `uniq(list)`

Returns a unique list of values from `list`.

### `unique(list, identity)`

Return a unique list of values from `list` based on the result of the `identity` function for each item.

### `values(obj)`

Return the values from an Object. (like `Object.values`)

### `without(list1, list2)`

Return a unique set of list1 without any of the values from list2.

### Type Tests

All of the following return a boolean based on the type of the `value` passed:

 * `isDate(value)`
 * `isEqual(value)`
 * `isFunction(value)`
 * `isNumber(value)`
 * `isObject(value)`
 * `isPlainObject(value)`
 * `isPromisey(value)`
 * `isStub(value)`
 * `isString(value)`
