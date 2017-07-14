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
    })

    it('should parse function correctly', function () {
      _.parseFunction(function one (a, b, c) {})
        .should.eql({ name: 'one', arguments: ['a', 'b', 'c'], body: undefined })
    })

    it('should parse function correctly', function () {
      _.parseFunction((a, b) => {})
        .should.eql({ name: undefined, arguments: ['a', 'b'], body: undefined })
    })

    it('should parse function correctly', function () {
      _.parseFunction(a => {})
        .should.eql({ name: undefined, arguments: ['a'], body: undefined })
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
})
