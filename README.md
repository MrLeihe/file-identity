## file-types [![codecov](https://codecov.io/gh/MrLeihe/file-types/branch/main/graph/badge.svg?token=FKA5QY36FS)](https://codecov.io/gh/MrLeihe/file-types)

The file type is detected by checking the magic number of the buffer.

### Install

```bash
yarn add file-types // npm install file-types --save
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
import FT from 'file-types'

async handleFileInput(event) {
  const result = await FT.fromFile(event.target.files[0])
  console.log(result)
}
```
