/* eslint-disable */

require('./setup')

const _ = require('../src/index')

describe('fauxdash', function () {
  describe('Array Functions', function () {
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
      return _.parseFunction(function one (a, b, c) {})
        .should.partiallyEql({ name: 'one', arguments: ['a', 'b', 'c'] })
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
      _.each({a: 1, b: 2, c: 3}, (v, k) => {
        keys.push(k)
        values.push(v)
      })
      keys.should.eql(['a','b','c'])
      values.should.eql([1,2,3])
    })

    it('should map on object key/values', function() {
      _.map({a: 1, b: 2, c: 3}, (v, k) => `${k}:${v}`)
        .should.eql(['a:1','b:2','c:3'])
    })

    it('should reduce on object key/values', function() {
      _.reduce({a: 1, b: 2, c: 3}, (acc, v) => acc += v, 0)
        .should.equal(6)
      _.reduce({a: 1, b: 2, c: 3}, (acc, v, k) =>
        acc += `${k}=>${v}`
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
})
