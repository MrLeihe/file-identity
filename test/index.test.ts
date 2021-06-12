const fs = require('fs')
const path = require('path')
import test from 'ava'
import FT from '../src/index'

test('FT.fromBuffer can detect file type', t => {
  const buffer = fs.readFileSync(path.resolve('assets/test.png'))
  const fileType = FT.fromBuffer(buffer)
  if (fileType) {
    t.is(fileType.ext, 'png')
  } else {
    t.
  }
})
