# Changelog
All notable changes to this project will be documented in this file.

## 2.0.1 - [2021-01-29]
### Changed
- Bumped InterfaceVersion

## 2.0.0 - [2021-01-28]
:warning: Rewrote library from scratch, please review README on usage

### Breaking
- `paypageClient.initializePayment` now returns a promise
- updated platform URLs
- dropped support for NodeJS > 12

### Changed
- removed all dependencies, now using NodeJS builtins
- rewrote ES to supported Node syntax
- removed bundler

### Added
- support for platform release 21R1 and below

## 1.0.0-beta.1 - [2017-02-06]

### Added
- Support for _SIPS 2.0_ in payment page mode
- Seal verification for initialization & payment responses
