type magicNumber = number

interface Options {
  offset: number
}

interface FileType {
  ext: string
  mime: string
}

type Result = FileType | undefined

// A fair amount of file-types are detectable within this range
const minimumBytes: number = 4100

/**
 * 读取文件中指定范围的二进制数据
 */
function readBuffer(file: File, start = 0, end = minimumBytes) {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      return reject(`Expected the file argument to File, got ${typeof file}`)
    }

    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file.slice(start, end))
  })
}

function _check(buffer: Uint8Array, headers: magicNumber[], options?: Options) {
  options = {
    offset: 0,
    ...options,
  }

  for (let index in headers) {
    if (headers[index] !== buffer[Number(index) + options.offset]) {
      return false
    }
  }

  return true
}

/**
 * 根据文件对象检测文件类型
 *
 * @param {File} file 文件对象
 * @returns {promise} 返回一个 Promise 对象
 * @example
 *
 * fromFile(file)
 *
 * // Promise<Result>
 */
async function fromFile(file: File): Promise<Result> {
  try {
    const buffer = await readBuffer(file)
    return fromBuffer(buffer)
  } catch (e) {
    console.error(e)
  }
}

/**
 * 根据 buffer 检测文件类型
 *
 * @param {any} input buffer 对象
 * @returns {Result} 检测成功则返回 FileType，否则返回 undefined
 * @example
 *
 * fromFile(input)
 *
 * // {ext: "jpg", mime: "image/jpeg"}
 */
function fromBuffer(input: any): Result {
  if (!(input instanceof Uint8Array || input instanceof ArrayBuffer)) {
    throw new TypeError(
      `Expected the \`input\` argument to be of type \`Uint8Array\`  or \`ArrayBuffer\`, got \`${typeof input}\``,
    )
  }

  const buffer = input instanceof Uint8Array ? input : new Uint8Array(input)

  if (!buffer || buffer.byteLength < 1) {
    return
  }

  return _fromTokenizer(buffer)
}

// UTF-16
function stringToBytes(string: string) {
  return [...string].map(character => character.charCodeAt(0))
}

function _fromTokenizer(buffer: Uint8Array): Result {
  const check = (header: magicNumber[], options?: Options) => _check(buffer, header, options)
  const checkString = (header: string, options?: Options) => check(stringToBytes(header), options)

  // -- 2-byte signatures --
  if (check([0x42, 0x4d])) {
    return {
      ext: 'bmp',
      mime: 'image/bmp',
    }
  }

  // -- 3-byte signatures --
  if (check([0xff, 0xd8, 0xff])) {
    return {
      ext: 'jpg',
      mime: 'image/jpeg',
    }
  }

  // -- 4-byte signatures --
  if (check([0x47, 0x49, 0x46])) {
    return {
      ext: 'gif',
      mime: 'image/gif',
    }
  }

  if (checkString('WEBP', { offset: 8 })) {
    return {
      ext: 'webp',
      mime: 'image/webp',
    }
  }

  // -- 8-byte signatures --
  if (check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return {
      ext: 'png',
      mime: 'image/png',
    }
  }
}

export { readBuffer, fromFile, fromBuffer }

export default {
  readBuffer,
  fromFile,
  fromBuffer,
}
