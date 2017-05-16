npm-version-bump
===
[![Build Status](https://travis-ci.org/ronapelbaum/npm-version-bump.svg?branch=master)](https://travis-ci.org/ronapelbaum/npm-version-bump)

Increment version of package.json according to git log

## How it works
Parse the latest git commit message, search for regex, then bump `npm version ?` accordingly.
I.e
last commit message: `fixed issue #123 [minor]` => `npm version minor`
last commit message: `fixed typo` => `npm version patch`

## Install
```
npm i -g npm-version-bump
```

## Usage
In `package.json`:
```json
"scripts": {
    "prepublishOnly": "npm-version-bump",
  }
```

### Options
#### `-rgx`
The regex pattern to work on git commit message.
```
npm-version-bump -rgx /\[(major|minor|patch)\]/ig
```
#### `-def`
The default `semver` incase regex did't match.
```
npm-version-bump -def patch
```
