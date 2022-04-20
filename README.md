# `sharec-prettier-hook`

<img src="https://raw.githubusercontent.com/lamartire/sharec/d91504a64409b3f3db531a7bca749295a3b20d92/packages/sharec-docs/static/images/logo-alt.svg" alt="Sharec logo by Ivashkina Xenia <xeniaowl112@mail.ru>" align="right" width="100">

[![.github/workflows/main.yml](https://github.com/sharecjs/sharec-prettier-hook/workflows/.github/workflows/main.yml/badge.svg)](https://github.com/sharecjs/sharec-prettier-hook/actions)
[![npm](https://img.shields.io/npm/v/sharec-prettier-hook)](https://npmjs.com/sharec-prettier-hook)
![MIT License](https://camo.githubusercontent.com/4481c7672053be9c676fbc983c040ca59fddfa19/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f6c6f6775782d70726f636573736f722e737667)

Allows to format your [sharec](https://github.com/sharecjs/sharec) configs with `prettier`.

## Usage

Install the hook:

```shell
npm i --save-dev sharec-prettier-hook
# or with yarn
yarn add -D sharec-prettier-hook
```

Create `.sharecrc.js` file in your project with following content:

```js
const perttierHook = require('sharec-prettier-hook')

module.exports = {
  afterMerge: perttierHook,
}
```

## How it works

The hook is looking for `prettier` config inside upcoming configs or inside a target project.
