# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.9.0](https://github.com/distsys-labs/fauxdash/compare/fauxdash-v1.8.6...fauxdash-v1.9.0) (2026-08-30)


### Features

* add additional methods, improve resilience during coverage testing ([235d05a](https://github.com/distsys-labs/fauxdash/commit/235d05ab95dd80f7803f0ad1cad26bef18b15f9e))
* add bindAll ([49db2e7](https://github.com/distsys-labs/fauxdash/commit/49db2e78f9465e3e34952845bd8eccb046d5d287))
* add deep merge ([d4c7a9f](https://github.com/distsys-labs/fauxdash/commit/d4c7a9f54e16a61bb410ddaca4b8ba8fff257efa))
* add futures ([7a33ea9](https://github.com/distsys-labs/fauxdash/commit/7a33ea906fd7bc1497c67f8885bfd703d53e1a02))
* add melter ([6c5c325](https://github.com/distsys-labs/fauxdash/commit/6c5c3253ded3c4b282bb8b7e7f8512a4a6fc6e26))
* add memoization ([d4da42d](https://github.com/distsys-labs/fauxdash/commit/d4da42d9a5b1ae6c26b5d3a7e34ef0e3d00db181))
* add uniq, instersection, without, isEqual, matches, map, reduce, each (for object iteration) and noop ([a870f9e](https://github.com/distsys-labs/fauxdash/commit/a870f9e1e640e4b07d4c4c709dfb39069ca54646))
* initial commit ([d241a08](https://github.com/distsys-labs/fauxdash/commit/d241a082578b79c853175beb5a77d5b207198bbd))
* rewrite as TypeScript with vitest for testing ([b1efbe3](https://github.com/distsys-labs/fauxdash/commit/b1efbe3dd8f393de0df50c0a7be2490e2c29d234))


### Bug Fixes

* add index args to object iterators ([ea5f165](https://github.com/distsys-labs/fauxdash/commit/ea5f1656185bd20bd331c8bd4526ed0eac048fa4))
* change to module type and esnext target ([cac7388](https://github.com/distsys-labs/fauxdash/commit/cac7388b4abc2c35b45798dc6ecb9a083ae6ce37))
* cleanup audit warnings ([e081b2f](https://github.com/distsys-labs/fauxdash/commit/e081b2fe19d27a5ac539e25cdefcbc7df5639ab4))
* correct bad export style ([83e48da](https://github.com/distsys-labs/fauxdash/commit/83e48da07b002a73c5a901770783e283450572d7))
* correct mapCall implementation ([b61eea9](https://github.com/distsys-labs/fauxdash/commit/b61eea981ddf5a032f4db62cbff2d6261648528c))
* correct use of mapCall to default to passing an object when no properties were found ([c32bac8](https://github.com/distsys-labs/fauxdash/commit/c32bac81924189cb7a8ef58af34ba0b68ab5fb3c))
* correctly parse arguments when default values are included ([1888838](https://github.com/distsys-labs/fauxdash/commit/1888838d7c5cc21597646b1a0c590bad20a17ebd))
* guard against prototype pollution in object-manipulation helpers ([216228d](https://github.com/distsys-labs/fauxdash/commit/216228d1805546f8271f77166983741a7963e874))
* improve calls that iterate instance properties by including first prototype as well ([1f8ca9d](https://github.com/distsys-labs/fauxdash/commit/1f8ca9d8cde22f4f45d31c575a935084acffdd5a))
* improve handling of bindAll to work with objects that have no prototype ([16db7e6](https://github.com/distsys-labs/fauxdash/commit/16db7e60203ae6fe1bba5f907f55226579f6aa32))
* prototype pollution guard + release-please/trusted publishing ([90ee9e2](https://github.com/distsys-labs/fauxdash/commit/90ee9e2a68b3ba7358c41181b49621a649904d42))
* small fix to behavior in mapCall and added simple API summary ([4cd7636](https://github.com/distsys-labs/fauxdash/commit/4cd76368459afa46dcc5bca8e2b91731e0714174))
* use ESM import condition in package exports ([ee4e1bc](https://github.com/distsys-labs/fauxdash/commit/ee4e1bcfdd8e0024c062792e521c0e8bf2659c7d))

### [1.8.6](https://github.com/deftly/fauxdash/compare/v1.8.5...v1.8.6) (2026-01-30)


### Bug Fixes

* use ESM import condition in package exports ([ee4e1bc](https://github.com/deftly/fauxdash/commit/ee4e1bcfdd8e0024c062792e521c0e8bf2659c7d))

### [1.8.5](https://github.com/deftly/fauxdash/compare/v1.8.4...v1.8.5) (2026-01-08)


### Bug Fixes

* change to module type and esnext target ([cac7388](https://github.com/deftly/fauxdash/commit/cac7388b4abc2c35b45798dc6ecb9a083ae6ce37))

### [1.8.4](https://github.com/deftly/fauxdash/compare/v1.8.3...v1.8.4) (2026-01-04)

### [1.8.3](https://github.com/deftly/fauxdash/compare/v1.8.2...v1.8.3) (2026-01-01)

### [1.8.2](https://github.com/deftly/fauxdash/compare/v1.8.1...v1.8.2) (2026-01-01)


### Bug Fixes

* correct bad export style ([83e48da](https://github.com/deftly/fauxdash/commit/83e48da07b002a73c5a901770783e283450572d7))

### [1.8.1](https://github.com/deftly/fauxdash/compare/v1.8.0...v1.8.1) (2025-12-31)

## [1.8.0](https://github.com/deftly/fauxdash/compare/v1.7.3...v1.8.0) (2025-12-31)


### Features

* rewrite as TypeScript with vitest for testing ([b1efbe3](https://github.com/deftly/fauxdash/commit/b1efbe3dd8f393de0df50c0a7be2490e2c29d234))

### [1.7.3](https://github.com/deftly/fauxdash/compare/v1.7.1...v1.7.3) (2022-03-31)


### Bug Fixes

* correct use of mapCall to default to passing an object when no properties were found ([c32bac8](https://github.com/deftly/fauxdash/commit/c32bac81924189cb7a8ef58af34ba0b68ab5fb3c))
* improve calls that iterate instance properties by including first prototype as well ([1f8ca9d](https://github.com/deftly/fauxdash/commit/1f8ca9d8cde22f4f45d31c575a935084acffdd5a))

### [1.7.2](https://github.com/deftly/fauxdash/compare/v1.7.1...v1.7.2) (2021-04-11)


### Bug Fixes

* improve calls that iterate instance properties by including first prototype as well ([1f8ca9d](https://github.com/deftly/fauxdash/commit/1f8ca9d8cde22f4f45d31c575a935084acffdd5a))

### [1.7.1](https://github.com/deftly/fauxdash/compare/v1.7.0...v1.7.1) (2021-01-30)


### Bug Fixes

* cleanup audit warnings ([e081b2f](https://github.com/deftly/fauxdash/commit/e081b2fe19d27a5ac539e25cdefcbc7df5639ab4))

<a name="1.7.0"></a>
# [1.7.0](https://github.com/deftly/fauxdash/compare/v1.6.0...v1.7.0) (2021-01-22)


### Features

* add futures ([7a33ea9](https://github.com/deftly/fauxdash/commit/7a33ea9))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/deftly/fauxdash/compare/v1.5.0...v1.6.0) (2021-01-21)


### Features

* add melter ([6c5c325](https://github.com/deftly/fauxdash/commit/6c5c325))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/deftly/fauxdash/compare/v1.4.1...v1.5.0) (2021-01-21)


### Features

* add memoization ([d4da42d](https://github.com/deftly/fauxdash/commit/d4da42d))



<a name="1.4.1"></a>
## [1.3.3](https://github.com/deftly/fauxdash/compare/v1.3.2...v1.3.3) (2021-01-20)

### Bug Fixes

* improve handling of bindAll to work with objects that have no prototype ([16db7e6](https://github.com/deftly/fauxdash/commit/16db7e6))
<a name="1.4.0"></a>
# [1.4.0](https://github.com/deftly/fauxdash/compare/v1.3.2...v1.4.0) (2018-11-04)

### Features

* add deep merge ([d4c7a9f](https://github.com/deftly/fauxdash/commit/d4c7a9f))

<a name="1.3.2"></a>
## [1.3.2](https://github.com/deftly/fauxdash/compare/v1.3.1...v1.3.2) (2018-03-09)


### Bug Fixes

* add index args to object iterators ([ea5f165](https://github.com/deftly/fauxdash/commit/ea5f165))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/deftly/fauxdash/compare/v1.3.0...v1.3.1) (2018-02-21)


### Bug Fixes

* correct mapCall implementation ([b61eea9](https://github.com/deftly/fauxdash/commit/b61eea9))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/deftly/fauxdash/compare/v1.2.1...v1.3.0) (2018-02-19)


### Features

* add bindAll ([49db2e7](https://github.com/deftly/fauxdash/commit/49db2e7))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/deftly/fauxdash/compare/v1.2.0...v1.2.1) (2018-02-19)


### Bug Fixes

* small fix to behavior in mapCall and added simple API summary ([4cd7636](https://github.com/deftly/fauxdash/commit/4cd7636))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/deftly/fauxdash/compare/v1.1.1...v1.2.0) (2018-02-19)


### Features

* add additional methods, improve resilience during coverage testing ([235d05a](https://github.com/deftly/fauxdash/commit/235d05a))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/deftly/fauxdash/compare/v1.1.0...v1.1.1) (2017-07-16)


### Bug Fixes

* correctly parse arguments when default values are included ([1888838](https://github.com/deftly/fauxdash/commit/1888838))



<a name="1.1.0"></a>
# 1.1.0 (2017-07-15)


### Features

* add uniq, instersection, without, isEqual, matches, map, reduce, each (for object iteration) and noop ([a870f9e](https://github.com/deftly/fauxdash/commit/a870f9e))
* initial commit ([d241a08](https://github.com/deftly/fauxdash/commit/d241a08))
