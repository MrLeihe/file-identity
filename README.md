## file-identity

[![npm version](https://badge.fury.io/js/file-identity.svg)](https://badge.fury.io/js/file-identity) [![Build Status](https://travis-ci.com/MrLeihe/file-identity.svg?branch=master)](https://travis-ci.com/MrLeihe/file-identity) [![codecov](https://codecov.io/gh/MrLeihe/file-identity/branch/master/graph/badge.svg?token=FKA5QY36FS)](https://codecov.io/gh/MrLeihe/file-identity)

The file type is detected by checking the magic number of the buffer.

### Install

```bash
$ yarn add file-identity
```

```bash
$ npm install file-identity --save
```

### Methods

```js
FT.fromFile(file)
FT.fromBuffer(buffer)
```

### Usage

Take Vue for example

html

```html
<input type="file" @input="handleFileInput" />
```

js

```js
import FT from 'file-identity'

async handleFileInput(event) {
  const result = await FT.fromFile(event.target.files[0])
  console.log(result)
}
```
