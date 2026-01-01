import { beforeAll, describe, expect, it } from 'vitest';
import _ from '../src/index';

describe('fauxdash', () => {
  describe('Array functions', () => {
    it('should correctly evaluate any', () => {
      expect(_.any([,,, 5])).toBe(true);
      expect(_.any([,,,,])).toBe(false);
      expect(_.any([1,,,,])).toBe(true);
      expect(_.any([,, 10,,], (x) => x > 5)).toBe(true);
      expect(_.any([,,,, 10], (x) => x < 5)).toBe(false);
    });

    it('should correctly evaluate contains', () => {
      expect(_.contains(['a', 'b', 'c', 'd'], 'b')).toBe(true);
      expect(_.contains(['a', 'b', 'c', 'd'], 'e')).toBe(false);
      expect(_.contains([1, 2, 3, 4, 5], 6)).toBe(false);
      expect(_.contains([1, 2, 3, 4, 5], 3)).toBe(true);
    });

    it('should filter correctly', () => {
      expect(_.filter([,, 4,, 1])).toEqual([4, 1]);
      expect(_.filter(['a',,,, 'b'])).toEqual(['a', 'b']);
      expect(_.filter([1, 2, 3, 4, 5, 6], (x) => x % 2 === 0)).toEqual([2, 4, 6]);
    });

    it('should find correctly', () => {
      expect(_.find([,,, 10,,,])).toBe(10);
      expect(_.find([9, 3, 1, 10, 4, 2, 8], (x) => x >= 10)).toBe(10);
      expect(_.find(['cat', 'bat', 'hat', 'rat', 'mat'], (x) => x === 'bat')).toBe('bat');
      expect(_.find(['a', 'b', 'c'], (x) => x === 'd')).toBeUndefined();
    });

    it('should flatten correctly', () => {
      expect(_.flatten([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(_.flatten([1, [2, 3], [4]])).toEqual([1, 2, 3, 4]);
      expect(_.flatten([1, [2, [3]], [4], [[[5, 6, 7]]]])).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should find intersections correctly', () => {
      expect(_.intersection([1, 7, 4, 6, 2, 3, 5, 9], [8, 6, 4, 2])).toEqual([4, 6, 2]);
      expect(_.intersection(
        [,,,, 'a', 1,,,, 1, 1, 1, 1, 'b',,,,, 2, 3, 4, true, true, true,,,,, 'c'],
        ['a', 'b', 'c']
      )).toEqual(['a', 'b', 'c']);
    });

    it('should get last', () => {
      expect(_.last(undefined)).toBeUndefined();
      expect(_.last([])).toBeUndefined();
      expect(_.last([1])).toBe(1);
      expect(_.last([1, 2, 3, 4, 5])).toBe(5);
    });

    it('should eliminate duplicates', () => {
      expect(_.uniq([1, 2, 3, 4, 1, 2, 3, 1, 5, 6, 7, 8, 1, 1, 1, 2, 6, 5, 3, 3, 5, 1, 1, 4, 5, 1, 8, 9, 7, 6, 2, 3, 2, 1, 4]))
        .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(_.uniq(['alice', 'bob', 'clarice', 'dan', 'erica', 'frank', 'alice', 'erica', 'dan', 'felicia', 'dan', 'frank']))
        .toEqual(['alice', 'bob', 'clarice', 'dan', 'erica', 'frank', 'felicia']);

      expect(_.unique([
        { name: 'elizabeth' },
        { name: 'alice' },
        { name: 'francesca' },
        { name: 'barbara' },
        { name: 'clarice' },
        { name: 'francesca' },
        { name: 'clarice' },
        { name: 'daria' },
        { name: 'barbara' },
        { name: 'elizabeth' },
        { name: 'francesca' },
        { name: 'gloria' },
        { name: 'gloria' }
      ], (x) => x.name)).toEqual([
        { name: 'elizabeth' },
        { name: 'alice' },
        { name: 'francesca' },
        { name: 'barbara' },
        { name: 'clarice' },
        { name: 'daria' },
        { name: 'gloria' }
      ]);
    });

    it('should apply without correctly', () => {
      expect(_.without([1, 7, 4, 6, 2, 3, 5, 9], [8, 6, 4, 2])).toEqual([1, 7, 3, 5, 9]);
      expect(_.without(
        [,,,, 'a', 1,,,, 1, 1, 1, 1, 'b',,,,, 2, 3, 4, true, true, true,,,,, 'c'],
        ['a', 'b', 'c']
      )).toEqual([1, 2, 3, 4, true]);
    });
  });

  describe('Is', () => {
    it('should correctly identify dates', () => {
      expect(_.isDate(new Date())).toBe(true);
      expect(_.isDate('01/01/2010')).toBe(false);
    });

    it('should correctly identify functions', () => {
      expect(_.isFunction(function () {})).toBe(true);
      expect(_.isFunction(() => {})).toBe(true);
      expect(_.isFunction((x) => x)).toBe(true);
      expect(_.isFunction('')).toBe(false);
    });

    it('should correctly identify numbers', () => {
      expect(_.isNumber(100)).toBe(true);
      expect(_.isNumber(100.5)).toBe(true);
      expect(_.isNumber('5')).toBe(false);
    });

    it('should correctly identify objects', () => {
      expect(_.isObject(new Object())).toBe(true);
      expect(_.isObject({})).toBe(true);
      expect(_.isObject(new Date())).toBe(true);
      expect(_.isObject(() => {})).toBe(true);
      expect(_.isObject('hi')).toBe(false);
    });

    it('should correctly identify plain objects', () => {
      expect(_.isObject(new Object())).toBe(true);
      expect(_.isObject({})).toBe(true);
      expect(_.isObject(() => {})).toBe(true);
      expect(_.isObject(5)).toBe(false);
      expect(_.isObject('hi')).toBe(false);
    });

    it('should correctly identify promisey objects', () => {
      expect(_.isPromisey(new Promise(() => {}))).toBe(true);
      expect(_.isPromisey({ then: () => {} })).toBe(true);
      expect(_.isPromisey(new Object())).toBe(false);
      expect(_.isPromisey('no')).toBe(false);
    });

    it('should correctly identify strings', () => {
      expect(_.isString('yay')).toBe(true);
      expect(_.isString(5)).toBe(false);
      expect(_.isString(['a', 'b', 'c'])).toBe(false);
    });
  });

  describe('Function tools', () => {
    it('should get arguments correctly', () => {
      expect(_.getArguments(function (a, b, c) {})).toEqual(['a', 'b', 'c']);
      expect(_.getArguments((a, b, c, d) => {})).toEqual(['a', 'b', 'c', 'd']);
      expect(_.getArguments((a) => {})).toEqual(['a']);
      expect(_.getArguments(function (a = 1) {})).toEqual(['a']);
      expect(_.getArguments((a = 1) => {})).toEqual(['a']);
      expect(_.getArguments((a = 1, b = true) => {})).toEqual(['a', 'b']);
      expect(_.getArguments((a = 'hello', b = 2) => {})).toEqual(['a', 'b']);
    });

    it('should parse function correctly', async () => {
      const results = _.parseFunction(function one (a, b, c) {});
      await expect(results).partiallyEql({ name: 'one', arguments: ['a', 'b', 'c'] });
    });

    it('should parse function correctly', async () => {
      await expect(_.parseFunction((a, b) => {}))
        .partiallyEql({ name: undefined, arguments: ['a', 'b'] });
    });

    it('should parse function correctly', async () => {
      await expect(_.parseFunction((a) => {}))
        .partiallyEql({ name: undefined, arguments: ['a'] });
    });

    it('should parse function correctly', async () => {
      await expect(_.parseFunction(function one (a = 1, b = true, c = 'hi') {}))
        .partiallyEql({ name: 'one', arguments: ['a', 'b', 'c'] });
    });

    it('should parse function correctly', async () => {
      await expect(_.parseFunction((a, b = { c: 1 }) => {}))
        .partiallyEql({ name: undefined, arguments: ['a', 'b'] });
    });

    it('should parse function correctly', async () => {
      await expect(_.parseFunction((a = 1) => {}))
        .partiallyEql({ name: undefined, arguments: ['a'] });
    });

    it('should memoize a function correctly', () => {
      const fn1 = (a: number, b: number) => a + b;
      const fn2 = (b: number, c: number) => b - c;

      const m1 = _.memoize(fn1);
      const m2 = _.memoize(fn2);

      expect(m1(1, 2)).toBe(3);
      expect(m2(1, 2)).toBe(-1);
      expect(m1(4, 3)).toBe(7);
      expect(m2(4, 3)).toBe(1);
    });
  });

  describe('Utility functions', () => {
    let lifted: (value: number | null) => Promise<number>;

    beforeAll(() => {
      function asyncCall (a: number | null, cb: (err: Error | null, result?: number) => void) {
        if (!a) { cb(new Error('nope')); }
        cb(null, a);
      }
      lifted = _.lift(asyncCall);
    });

    it('should trim and filter list of strings correctly', () => {
      expect(_.trim([])).toEqual([]);
      expect(_.trim([,, '', ''])).toEqual([]);
      expect(_.trim([,, '  ', ' '])).toEqual([]);
      expect(_.trim(['a ', '     b', 'c', ' d ', 'e '])).toEqual(['a', 'b', 'c', 'd', 'e']);
    });

    it('should reject on failed async function', async () => {
      await expect(lifted(null)).rejects.toThrow('nope');
    });

    it('should resolved on successful function', async () => {
      await expect(lifted(100)).resolves.toBe(100);
    });
  });

  describe('Object iterators', () => {
    it('should iterate on object key/values', () => {
      const keys: string[] = [];
      const values: number[] = [];
      _.each({ a: 1, b: 1, c: 1 }, (v, k, i) => {
        keys.push(k);
        values.push((v as number) + i);
      });
      expect(keys).toEqual(['a', 'b', 'c']);
      expect(values).toEqual([1, 2, 3]);
    });

    it('should map on object key/values', () => {
      expect(_.map({ a: 1, b: 2, c: 3 }, (v, k) => `${k}:${v}`))
        .toEqual(['a:1', 'b:2', 'c:3']);

      expect(_.map({ a: 1, b: 1, c: 1 }, (v, k, i) => `${k}:${(v as number) + i}`))
        .toEqual(['a:1', 'b:2', 'c:3']);
    });

    it('should reduce on object key/values', () => {
      expect(_.reduce({ a: 1, b: 2, c: 3 }, (acc, v) => acc + (v as number), 0))
        .toBe(6);
      expect(_.reduce({ a: 1, b: 2, c: 3 }, (acc, v, k) =>
        acc + `${k}=>${v}`
      , ''))
        .toBe('a=>1b=>2c=>3');
      expect(_.reduce({ a: 1, b: 1, c: 1 }, (acc, v, k, i) =>
        acc + `${k}=>${(v as number) + i}`
      , ''))
        .toBe('a=>1b=>2c=>3');
    });

    it('should get values from object keys', () => {
      expect(_.values({ a: 1, b: 2, c: 'test', d: true })).toEqual(
        [1, 2, 'test', true]
      );
    });

    it('should get valid matches function', () => {
      const m1 = _.matches({ a: 1, b: 2, c: 3 });
      const m2 = _.matches({ a: true, b: 'string', c: { d: 1 } });
      expect(m1({ a: 1, b: 2, c: 3 })).toBe(true);
      expect(m1({ a: 2, b: 2, c: 3 })).toBe(false);
      expect(m1({ a: 1, b: 1, c: 3 })).toBe(false);
      expect(m1({ a: 1, b: 2, c: 2 })).toBe(false);

      expect(m2({ a: true, b: 'string', c: { d: 1 } })).toBe(true);
      expect(m2({ a: true, b: 'string', c: { d: 2 } })).toBe(false);
    });
  });

  describe('Sorting by property', () => {
    it('should sort numeric properties correctly', () => {
      expect(_.sortBy([{ age: 30 }, { age: 10 }, { age: 40 }, { age: 19 }, { age: 2 }], 'age'))
        .toEqual([{ age: 2 }, { age: 10 }, { age: 19 }, { age: 30 }, { age: 40 }]);
    });

    it('should sort alphabetic properties correctly', () => {
      expect(_.sortBy([{ name: 'zak' }, { name: 'ed' }, { name: 'amy' }, { name: 'jim' }, { name: 'pam' }], 'name'))
        .toEqual([{ name: 'amy' }, { name: 'ed' }, { name: 'jim' }, { name: 'pam' }, { name: 'zak' }]);
    });
  });

  describe('MapCall: Spreading hash properties over function parameters', () => {
    function testCallOne (actor: any, argOne: any, argTwo: any, argThree: any) {
      return [actor, argOne, argTwo, argThree];
    }

    function testCallTwo (actor: any, data: { argOne: number; argTwo: string; argThree: boolean }) {
      return [actor, data.argOne, data.argTwo, data.argThree];
    }

    const model = {
      testOne: testCallOne,
      testTwo: testCallTwo
    };
    const actor = { id: 'testing' };

    describe('with exact matches', () => {
      const message = { argOne: 1, argTwo: 'two', argThree: true };
      let result: any[];

      beforeAll(() => {
        const fn = _.mapCall(model.testOne, true);
        result = fn(actor, message);
      });

      it('should call the function with correct arguments', () => {
        expect(result).toEqual([actor, 1, 'two', true]);
      });
    });

    describe('with partial matches and a map', () => {
      describe('and a map', () => {
        const message = { argOne: 1, arg2: 'two', argThree: true };
        let result: any[];

        beforeAll(() => {
          const fn = _.mapCall(model.testOne, {
            argTwo: 'arg2'
          });

          result = fn(actor, message);
        });

        it('should call the function with correct arguments', () => {
          expect(result).toEqual([actor, 1, 'two', true]);
        });
      });

      describe('and no map', () => {
        const message = { argOne: 1, arg2: 'two', argThree: true };
        let result: any[];

        beforeAll(() => {
          const fn = _.mapCall(model.testOne, true);
          result = fn(actor, message);
        });

        it('should call the function with correct arguments', () => {
          expect(result).toEqual([actor, 1, undefined, true]);
        });
      });
    });

    describe('with no matches', () => {
      describe('and a map', () => {
        const message = { arg1: 1, arg2: 'two', arg3: true };
        let result: any[];

        beforeAll(() => {
          const fn = _.mapCall(model.testOne, {
            argOne: 'arg1',
            argTwo: 'arg2',
            argThree: 'arg3'
          });

          result = fn(actor, message);
        });

        it('should call the function with correct arguments', () => {
          expect(result).toEqual([actor, 1, 'two', true]);
        });
      });

      describe('and no valid map', () => {
        const message = { arg1: 1, arg2: 'two', arg3: true };
        let result: any[];

        beforeAll(() => {
          const fn = _.mapCall(model.testOne, true);
          result = fn(actor, message);
        });

        it('should call the function with undefined arguments', () => {
          expect(result).toEqual([actor, undefined, undefined, undefined]);
        });
      });

      describe('and no valid map but only two arguments', () => {
        const message = { argOne: 1, argTwo: 'two', argThree: true };
        let result: any[];

        beforeAll(() => {
          const fn = _.mapCall(model.testTwo, true);
          result = fn(actor, message);
        });

        it('should call the function with message', () => {
          expect(result).toEqual([actor, 1, 'two', true]);
        });
      });
    });
  });

  describe('Object manipulation', () => {
    it('should omit keys', () => {
      expect(_.omit({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, 'c', 'f', 'i'))
        .toEqual({ a: 1, b: 2, d: 4, e: 5 });

      expect(_.omit({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, ['a', 'd', 'g']))
        .toEqual({ b: 2, c: 3, e: 5, f: 6 });
    });

    it('should transform object', () => {
      expect(_.transform({ a: 1, b: 2, c: 3, d: 4 }, { b: 'beta', c: 'gamma' }))
        .toEqual({ a: 1, beta: 2, gamma: 3, d: 4 });

      expect(_.transform({ a: 1, b: 2, c: 3, d: 4 }, { b: 'beta', c: 'gamma', d: 'delta', e: 'echo' }, 'a', 'd'))
        .toEqual({ beta: 2, gamma: 3 });
    });

    it('should populate missing keys from defaults', () => {
      const default1 = { b: 2, c: 4, d: 4 };
      const default2 = { a: 1, b: 1 };
      const settings = { c: 3 };
      const result = _.defaults(settings, default1, default2);
      expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });

    it('should create a valid deep clone', () => {
      class Item {
        a: number | string | boolean;
        b: number | string;
        c: any;

        constructor (a: number | string | boolean, b: number | string, c: any) {
          this.a = a;
          this.b = b;
          this.c = c;
        }
      }
      const source = {
        a: 1,
        b: 'two',
        c: true,
        d: [1, 'two', true],
        e: {
          a: 2,
          b: ['three', 'four', [5, 6, 7]]
        },
        f: [
          { a: 'one', b: 'two' },
          { a: 'one', b: 'two', c: [1, 2, 3, Date.now()] },
          { a: 'one', b: 'two' },
          {
            items: [
              new Item(1, 2, 3),
              new Item('4', 'five', { six: 6 }),
              new Item(true, Date.now(), 9)
            ]
          }
        ]
      };
      const copy = _.clone(source);
      expect(copy).toEqual(source);
      (copy as any).f[3].items[1].c.six = 7;
      expect(copy).not.toEqual(source);
    });

    it('should merge objects', () => {
      const one = {
        a: {
          c: 1,
          e: {
            f: [
              { g: { a: 1 } }
            ]
          }
        },
        b: {
          i: [
            { j: 'one' }
          ]
        }
      };
      const two = {
        a: {
          d: 2,
          e: {
            f: [
              { c: 3 }
            ]
          }
        },
        b: {
          i: [
            { k: 'two' }
          ]
        }
      };
      const three = {
        a: {
          d: 2,
          e: {
            f: [
              { h: { b: 2 } }
            ]
          }
        },
        b: {
          i: [
            { l: 'three' }
          ]
        }
      };
      const merge = _.merge(one as any, two as any, three as any);
      expect(merge).toEqual({
        a: {
          c: 1,
          d: 2,
          e: {
            f: [
              { h: { b: 2 } },
              { c: 3 },
              { g: { a: 1 } }
            ]
          }
        },
        b: {
          i: [
            { l: 'three' },
            { k: 'two' },
            { j: 'one' }
          ]
        }
      });
    });

    it('should melter objects', () => {
      const a = {
        one: 1,
        all: function () {
          return [this.one, this.two, this.three];
        }
      };
      const b = {
        two: 2
      };
      const c = {
        three: 3
      };
      const d = _.melter({}, a, b, c);
      expect(d.all()).toEqual([1, 2, 3]);
    });
  });

  describe('Promise helpers', () => {
    describe('when applying promises to a function call', () => {
      it('should resolve arguments first', async () => {
        await expect(_.applyWhen((a: number, b: number, c: number, d: number) => {
          return (a + b + c) / d;
        }, [
          1,
          Promise.resolve(2),
          Promise.resolve(3),
          2
        ])).resolves.toBe(3);
      });

      it('should reject on failed argument', async () => {
        await expect(_.applyWhen((a: number, b: number, c: number, d: number) => {
          return (a + b + c) / d;
        }, [
          1,
          Promise.reject(new Error('no')),
          Promise.resolve(3),
          2
        ])).rejects.toThrow('no');
      });
    });

    describe('when calling promise functions in a sequence', () => {
      describe('calling functions from an array', () => {
        it('should resolve to an ordered array', async () => {
          await expect(_.sequence([
            () => Promise.resolve(1),
            () => 2,
            () => Promise.resolve(3)
          ])).resolves.toEqual([1, 2, 3]);
        });
      });

      describe('calling function arguments', () => {
        it('should resolve to an ordered array', async () => {
          await expect(_.sequence(
            () => Promise.resolve(1),
            () => 2,
            () => Promise.resolve(3)
          )).resolves.toEqual([1, 2, 3]);
        });
      });
    });

    describe('when creating futures', () => {
      it('should resolve correctly', async () => {
        const { promise, resolve } = _.future();
        resolve();
        await expect(promise).resolves.toBeUndefined();
      });

      it('should reject correctly', async () => {
        const { promise, reject } = _.future();
        reject();
        await expect(promise).rejects.toBeUndefined();
      });
    });
  });
});
