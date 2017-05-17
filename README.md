npm-version-git
===
[![Build Status](https://travis-ci.org/ronapelbaum/npm-version-bump.svg?branch=master)](https://travis-ci.org/ronapelbaum/npm-version-bump)

Increment version of `package.json` according to git log

## How it works
Parse the latest git commit message, search for regex, then bump `npm version ?` accordingly.

I.e:

last commit message: `fixed issue #123 [minor]` => `npm version minor`

last commit message: `fixed typo` => `npm version patch`

## Install
```
npm i -g npm-version-git
```

## Usage
In `package.json`:
```json
"scripts": {
    "prepublishOnly": "npm-version-git",
  }
```

### Options
#### `-rgx`
The regex pattern to work on git commit message.
```
npm-version-git -rgx "\[(major|minor|patch)\]"
```
#### `-def`
The default `semver` incase regex did't match.
```
npm-version-git -def patch
```
