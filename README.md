npm-version-git-cli

Increment version of `package.json` according to git log

# Fork notice

This is a fork of https://github.com/ronapelbaum/npm-version-git which includes

- a patch to fix executing `npm-version-git` from the cli:
https://github.com/ronapelbaum/npm-version-git/issues/2

- Adding the `--force` flag to `npm version` if there are additional assets pending commit

## How it works
Parse the latest git commit message, search for regex, then bump `npm version ?` accordingly.

I.e:

last commit message: `fixed issue #123 [minor]` => `npm version minor`

last commit message: `fixed typo` => `npm version patch`

## Install
```
npm i -g npm-version-git-cli
```

## Usage
In `package.json`:
```json
"scripts": {
    "prepublishOnly": "npm-version-git-cli",
  }
```

### Options
#### `-rgx`
The regex pattern to work on git commit message.
```
npm-version-git-cli -rgx "\[(major|minor|patch)\]"
```
#### `-def`
The default `semver` incase regex did't match.
```
npm-version-git-cli -def patch
```
