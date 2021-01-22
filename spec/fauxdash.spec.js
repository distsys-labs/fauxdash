/* eslint-disable */

require('./setup')

const _ = require('../src/index')

describe('fauxdash', function () {
  describe('Array functions', function () {
    it('should correctly evaluate any', function () {
      _.any([,,, 5]).should.equal(true)
      _.any([,,,, ]).should.equal(false)
      _.any([1,,,, ]).should.equal(true)
      _.any([,, 10,, ], x => x > 5).should.equal(true)
      _.any([,,,, 10], x => x < 5).should.equal(false)
    })

    it('should correctly evaluate contains', function () {
      _.contains(['a', 'b', 'c', 'd'], 'b').should.equal(true)
      _.contains(['a', 'b', 'c', 'd'], 'e').should.equal(false)
      _.contains([1, 2, 3, 4, 5], 6).should.equal(false)
      _.contains([1, 2, 3, 4, 5], 3).should.equal(true)
    })

    it('should filter correctly', function () {
      _.filter([,, 4,, 1]).should.eql([4, 1])
      _.filter(['a',,,, 'b']).should.eql(['a', 'b'])
      _.filter([1, 2, 3, 4, 5, 6], x => x % 2 === 0).should.eql([2, 4, 6])
    })

    it('should find correctly', function () {
      _.find([,,, 10,,, ]).should.equal(10)
      _.find([9, 3, 1, 10, 4, 2, 8], x => x >= 10).should.equal(10)
      _.find(['cat', 'bat', 'hat', 'rat', 'mat'], x => x === 'bat').should.equal('bat')
      expect(_.find(['a', 'b', 'c'], x => x === 'd')).equal(undefined)
    })

    it('should flatten correctly', function () {
      _.flatten([1, 2, 3, 4]).should.eql([1, 2, 3, 4])
      _.flatten([1, [2, 3], [4]]).should.eql([1, 2, 3, 4])
      _.flatten([1, [2, [3]], [4], [[[5, 6, 7]]]]).should.eql([1, 2, 3, 4, 5, 6, 7])
    })

    it('should find intersections correctly', function () {
      _.intersection([1,7,4,6,2,3,5,9],[8,6,4,2]).should.eql([4,6,2])
      _.intersection(
        [,,,,'a',1,,,,1,1,1,1,'b',,,,,2,3,4,true,true,true,,,,,'c'],
        ['a','b','c']
      ).should.eql(['a','b','c'])
    })

    it('should get last', function() {
      expect(_.last(undefined)).to.equal(undefined)
      expect(_.last([])).to.equal(undefined)
      _.last([1]).should.equal(1)
      _.last([1,2,3,4,5]).should.equal(5)
    })

    it('should eliminate duplicates', function() {
      _.uniq([1,2,3,4,1,2,3,1,5,6,7,8,1,1,1,2,6,5,3,3,5,1,1,4,5,1,8,9,7,6,2,3,2,1,4])
        .should.eql([1,2,3,4,5,6,7,8,9])
      _.uniq(['alice','bob','clarice','dan','erica','frank','alice','erica','dan','felicia','dan','frank'])
        .should.eql(['alice','bob','clarice','dan','erica','frank','felicia'])

      _.unique([
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
        ], x => x.name)
      .should.eql([
        { name: 'elizabeth' },
        { name: 'alice' },
        { name: 'francesca' },
        { name: 'barbara' },
        { name: 'clarice' },
        { name: 'daria' },
        { name: 'gloria' }
      ])
    })

    it('should apply without correctly', function () {
      _.without([1,7,4,6,2,3,5,9],[8,6,4,2]).should.eql([1,7,3,5,9])
      _.without(
        [,,,,'a',1,,,,1,1,1,1,'b',,,,,2,3,4,true,true,true,,,,,'c'],
        ['a','b','c']
      ).should.eql([1,2,3,4,true])
    })
  })

  describe('Is', function () {
    it('should correctly identify dates', function () {
      _.isDate(new Date()).should.equal(true)
      _.isDate('01/01/2010').should.equal(false)
    })

    it('should correctly identify functions', function () {
      _.isFunction(function () {}).should.equal(true)
      _.isFunction(() => {}).should.equal(true)
      _.isFunction(x => x).should.equal(true)
      _.isFunction('').should.equal(false)
    })

    it('should correctly identify numbers', function () {
      _.isNumber(100).should.equal(true)
      _.isNumber(100.5).should.equal(true)
      _.isNumber('5').should.equal(false)
    })

    it('should correctly identify objects', function () {
      _.isObject(new Object()).should.equal(true)
      _.isObject({}).should.equal(true)
      _.isObject(new Date()).should.equal(true)
      _.isObject(() => {}).should.equal(true)
      _.isObject('hi').should.equal(false)
    })

    it('should correctly identify plain objects', function () {
      _.isObject(new Object()).should.equal(true)
      _.isObject({}).should.equal(true)
      _.isObject(() => {}).should.equal(true)
      _.isObject(5).should.equal(false)
      _.isObject('hi').should.equal(false)
    })

    it('should correctly identify promisey objects', function () {
      _.isPromisey(new Promise(() => {})).should.equal(true)
      _.isPromisey({then: () => {}}).should.equal(true)
      _.isPromisey(new Object()).should.equal(false)
      _.isPromisey('no').should.equal(false)
    })

    it('should correctly identify strings', function () {
      _.isString('yay').should.equal(true)
      _.isString(5).should.equal(false)
      _.isString(['a', 'b', 'c']).should.equal(false)
    })
  })

  describe('Function tools', function () {
    it('should get arguments correctly', function () {
      _.getArguments(function (a, b, c) {}).should.eql(['a', 'b', 'c'])
      _.getArguments((a, b, c, d) => {}).should.eql(['a', 'b', 'c', 'd'])
      _.getArguments(a => {}).should.eql(['a'])
      _.getArguments(function(a = 1) {}).should.eql(['a'])
      _.getArguments((a = 1) => {}).should.eql(['a'])
      _.getArguments((a = 1, b = true) => {}).should.eql(['a', 'b'])
      _.getArguments((a = 'hello', b = 2) => {}).should.eql(['a', 'b'])
    })

    it('should parse function correctly', function () {
      var results = _.parseFunction(function one (a, b, c) {})
      console.log(results)
      return results.should.partiallyEql({ name: 'one', arguments: ['a', 'b', 'c'] })
    })

    it('should parse function correctly', function () {
      return _.parseFunction((a, b) => {})
        .should.partiallyEql({ name: undefined, arguments: ['a', 'b'] })
    })

    it('should parse function correctly', function () {
      return _.parseFunction(a => {})
        .should.partiallyEql({ name: undefined, arguments: ['a'] })
    })

    it('should parse function correctly', function () {
      return _.parseFunction(function one (a = 1, b = true, c = 'hi') {})
        .should.partiallyEql({ name: 'one', arguments: ['a', 'b', 'c'] })
    })

    it('should parse function correctly', function () {
      return _.parseFunction((a, b={ c: 1 }) => {})
        .should.partiallyEql({ name: undefined, arguments: ['a', 'b'] })
    })

    it('should parse function correctly', function () {
      return _.parseFunction((a = 1) => {})
        .should.partiallyEql({ name: undefined, arguments: ['a'] })
    })

    it('should memoize a function correctly', function () {
      var fn1 = (a, b) => a + b
      var fn2 = (b, c) => b - c

      var m1 = _.memoize(fn1)
      var m2 = _.memoize(fn2)

      m1(1, 2).should.equal(3)
      m2(1, 2).should.equal(-1)
      m1(4, 3).should.equal(7)
      m2(4, 3).should.equal(1)
    })
  })

  describe('Utility functions', function () {
    let lifted
    before(function () {
      function asyncCall (a, cb) {
        if (!a) { cb(new Error('nope')) }
        cb(null, a)
      }
      lifted = _.lift(asyncCall)
    })

    it('should trim and filter list of strings correctly', function () {
      _.trim([]).should.eql([])
      _.trim([,, '', '']).should.eql([])
      _.trim([,, '  ', ' ']).should.eql([])
      _.trim(['a ', '     b', 'c', ' d ', 'e ']).should.eql(['a', 'b', 'c', 'd', 'e'])
    })

    it('should reject on failed async function', function () {
      return lifted(null).should.be.rejectedWith('nope')
    })

    it('should resolved on successful function', function () {
      return lifted(100).should.eventually.equal(100)
    })
  })

  describe('Object iterators', function () {
    it('should iterate on object key/values', function() {
      const keys = []
      const values = []
      _.each({a: 1, b: 1, c: 1}, (v, k, i) => {
        keys.push(k)
        values.push(v + i)
      })
      keys.should.eql(['a','b','c'])
      values.should.eql([1,2,3])
    })

    it('should map on object key/values', function() {
      _.map({a: 1, b: 2, c: 3}, (v, k) => `${k}:${v}`)
        .should.eql(['a:1','b:2','c:3'])

      _.map({a: 1, b: 1, c: 1}, (v, k, i) => `${k}:${v+i}`)
        .should.eql(['a:1','b:2','c:3'])      
    })

    it('should reduce on object key/values', function() {
      _.reduce({a: 1, b: 2, c: 3}, (acc, v) => acc += v, 0)
        .should.equal(6)
      _.reduce({a: 1, b: 2, c: 3}, (acc, v, k) =>
        acc += `${k}=>${v}`
      , '').should.equal('a=>1b=>2c=>3')
      _.reduce({a: 1, b: 1, c: 1}, (acc, v, k, i) =>
        acc += `${k}=>${v+i}`
      , '').should.equal('a=>1b=>2c=>3')
    })

    it('should get values from object keys', function () {
      _.values({a: 1, b: 2, c: 'test', d: true}).should.eql(
        [1, 2, 'test', true]
      )
    })

    it('should get valid matches function', function() {
      const m1 = _.matches({a: 1, b: 2, c: 3})
      const m2 = _.matches({a: true, b: 'string', c: { d: 1 }})
      m1({a: 1, b: 2, c: 3}).should.equal(true)
      m1({a: 2, b: 2, c: 3}).should.equal(false)
      m1({a: 1, b: 1, c: 3}).should.equal(false)
      m1({a: 1, b: 2, c: 2}).should.equal(false)

      m2({a: true, b: 'string', c: { d: 1 }}).should.equal(true)
      m2({a: true, b: 'string', c: { d: 2 }}).should.equal(false)
    })
  })

  describe('Sorting by property', () => {
    it('should sort numeric properties correctly', () => {
      _.sortBy([ { age: 30 }, { age: 10 }, { age: 40 }, { age: 19 }, { age: 2 } ], 'age')
        .should.eql([ { age: 2 }, { age: 10 }, { age: 19 }, { age: 30 }, { age: 40 } ])
    })

    it('should sort alphabetic properties correctly', () => {
      _.sortBy([ { name: 'zak' }, { name: 'ed' }, { name: 'amy' }, { name: 'jim' }, { name: 'pam' } ], 'name')
        .should.eql([ { name: 'amy' }, { name: 'ed' }, { name: 'jim' }, { name: 'pam' }, { name: 'zak' } ])
    })
  })

  describe('MapCall: Spreading hash properties over function parameters', () => {
    function testCall (actor, argOne, argTwo, argThree) {
      return [ actor, argOne, argTwo, argThree ]
    }

    var model = {
      test: testCall
    }
    var actor = { id: 'testing' }

    describe('with exact matches', () => {
      var message = { argOne: 1, argTwo: 'two', argThree: true }
      var result

      before(() => {
        var fn = _.mapCall(model.test, true)
        result = fn(actor, message)
      })

      it('should call the function with correct arguments', () => {
        result.should.eql([ actor, 1, 'two', true ])
      })
    })

    describe('with partial matches and a map', () => {
      describe('and a map', () => {
        var message = { argOne: 1, arg2: 'two', argThree: true }
        var result

        before(() => {
          var fn = _.mapCall(model.test, {
            argTwo: 'arg2'
          })

          result = fn(actor, message)
        })

        it('should call the function with correct arguments', () => {
          result.should.eql([ actor, 1, 'two', true ])
        })
      })

      describe('and no map', () => {
        var message = { argOne: 1, arg2: 'two', argThree: true }
        var result

        before(() => {
          var fn = _.mapCall(model.test, true)
          result = fn(actor, message)
        })

        it('should call the function with correct arguments', () => {
          result.should.eql([ actor, 1, undefined, true ])
        })
      })
    })

    describe('with no matches', () => {
      describe('and a map', () => {
        var message = { arg1: 1, arg2: 'two', arg3: true }
        var result

        before(() => {
          var fn = _.mapCall(model.test, {
            argOne: 'arg1',
            argTwo: 'arg2',
            argThree: 'arg3'
          })

          result = fn(actor, message)
        })

        it('should call the function with correct arguments', () => {
          result.should.eql([ actor, 1, 'two', true ])
        })
      })

      describe('and no valid map', () => {
        var message = { arg1: 1, arg2: 'two', arg3: true }
        var result

        before(() => {
          var fn = _.mapCall(model.test, true)
          result = fn(actor, message)
        })

        it('should call the function with undefined arguments', () => {
          result.should.eql([ actor, undefined, undefined, undefined ])
        })
      })
    })
  })

  describe('Object manipulation', function () {
    it('should omit keys', function () {
      _.omit({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}, 'c', 'f', 'i')
        .should.eql({a: 1, b: 2, d: 4, e: 5})

      _.omit({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}, ['a', 'd', 'g'])
        .should.eql({b: 2, c: 3, e: 5, f: 6})
    })

    it('should transform object', function () {
      _.transform({a: 1, b: 2, c: 3, d: 4}, {b: 'beta', c: 'gamma'})
        .should.eql({a: 1, beta: 2, gamma: 3, d: 4})

      _.transform({a: 1, b: 2, c: 3, d: 4}, {b: 'beta', c: 'gamma', d: 'delta', e: 'echo'}, 'a', 'd')
        .should.eql({beta: 2, gamma: 3})
    })

    it('should populate missing keys from defaults', function () {
      const default1 = { b: 2, c: 4, d: 4 }
      const default2 = { a: 1, b: 1 }
      const settings = { c: 3 }
      const result = _.defaults(settings, default1, default2)
      result.should.eql({ a: 1, b: 2, c: 3, d: 4 })
    })

    it('should create a valid deep clone', function () {
      class Item {
        constructor (a, b, c) {
          this.a = a
          this.b = b
          this.c = c
        }
      }
      const source = {
        a: 1,
        b: 'two',
        c: true,
        d: [1, 'two', true],
        e: {
          a: 2, 
          b: [ 'three', 'four', [5, 6, 7] ]
        },
        f: [
          { a: 'one', b: 'two' },
          { a: 'one', b: 'two', c: [ 1, 2, 3, Date.now() ] },
          { a: 'one', b: 'two' },
          { items: [
            new Item(1, 2, 3),
            new Item('4', 'five', {six: 6}),
            new Item(true, Date.now(), 9),
          ]}
        ]
      }
      const copy = _.clone(source)
      copy.should.eql(source)
      copy.f[3].items[1].c.six = 7
      copy.should.not.eql(source)
    })

    it('should merge objects', function () {
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
      }
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
      }
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
      }
      const merge = _.merge(one, two, three)
      merge.should.eql({
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
      })
    })

    it('should melter objects', function () {
      var a = {
        one: 1,
        all: function () {
          return [this.one, this.two, this.three]
        }
      }
      var b = {
        two: 2,
      }
      var c = {
        three: 3,
      }
      var d = _.melter({}, a, b, c)
      d.all().should.eql([1, 2, 3])
    })
  })

  describe('Promise helpers', function () {
    describe('when applying promises to a function call', function () {
      it('should resolve arguments first', function () {
        return _.applyWhen((a, b, c, d) => {
          return (a + b + c) / d
        }, [
          1,
          Promise.resolve(2),
          Promise.resolve(3),
          2
        ]).should.eventually.equal(3)
      })

      it('should reject on failed argument', function () {
        return _.applyWhen((a, b, c, d) => {
          return (a + b + c) / d
        }, [
          1,
          Promise.reject(new Error('no')),
          Promise.resolve(3),
          2
        ]).should.be.rejectedWith('no')
      })
    })

    describe('when calling promise functions in a sequence', function () {
      describe('calling functions from an array', function () {
        it('should resolve to an ordered array', function () {
          return _.sequence([
            () => Promise.resolve(1),
            () => 2,
            () => Promise.resolve(3)
          ]).should.eventually.eql([1,2,3])
        })
      })

      describe('calling function arguments', function () {
        it('should resolve to an ordered array', function () {
          return _.sequence(
            () => Promise.resolve(1),
            () => 2,
            () => Promise.resolve(3)
          ).should.eventually.eql([1,2,3])
        })
      })
    })

    describe('when creating futures', function () {
      it('should resolve correctly', function (done) {
        var { promise, resolve } = _.future()
        promise.then(() => done())
        resolve()
      })
      
      it('should reject correctly', function (done) {
        var { promise, reject } = _.future()
        promise.then(null, () => done())
        reject()
      })
    })
  })
})
