(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FT = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    // A fair amount of file-types are detectable within this range
    var minimumBytes = 4100;
    /**
     * 读取文件中指定范围的二进制数据
     */
    function readBuffer(file, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = minimumBytes; }
        return new Promise(function (resolve, reject) {
            if (!(file instanceof File)) {
                return reject("Expected the file argument to File, got " + typeof file);
            }
            var reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file.slice(start, end));
        });
    }
    function _check(buffer, headers, options) {
        options = __assign({ offset: 0 }, options);
        for (var index in headers) {
            if (headers[index] !== buffer[Number(index) + options.offset]) {
                return false;
            }
        }
        return true;
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
    function fromFile(file) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, readBuffer(file)];
                    case 1:
                        buffer = _a.sent();
                        return [2 /*return*/, fromBuffer(buffer)];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
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
    function fromBuffer(input) {
        if (!(input instanceof Uint8Array || input instanceof ArrayBuffer)) {
            throw new TypeError("Expected the `input` argument to be of type `Uint8Array`  or `ArrayBuffer`, got `" + typeof input + "`");
        }
        var buffer = input instanceof Uint8Array ? input : new Uint8Array(input);
        if (!buffer || buffer.byteLength < 1) {
            return;
        }
        return _fromTokenizer(buffer);
    }
    // UTF-16
    function stringToBytes(string) {
        return __spreadArray([], __read(string)).map(function (character) { return character.charCodeAt(0); });
    }
    function _fromTokenizer(buffer) {
        var check = function (header, options) { return _check(buffer, header, options); };
        var checkString = function (header, options) { return check(stringToBytes(header), options); };
        // -- 2-byte signatures --
        if (check([0x42, 0x4d])) {
            return {
                ext: 'bmp',
                mime: 'image/bmp',
            };
        }
        // -- 3-byte signatures --
        if (check([0xff, 0xd8, 0xff])) {
            return {
                ext: 'jpg',
                mime: 'image/jpeg',
            };
        }
        // -- 4-byte signatures --
        if (check([0x47, 0x49, 0x46])) {
            return {
                ext: 'gif',
                mime: 'image/gif',
            };
        }
        if (checkString('WEBP', { offset: 8 })) {
            return {
                ext: 'webp',
                mime: 'image/webp',
            };
        }
        // -- 8-byte signatures --
        if (check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
            return {
                ext: 'png',
                mime: 'image/png',
            };
        }
    }
    var index = {
        readBuffer: readBuffer,
        fromFile: fromFile,
        fromBuffer: fromBuffer,
    };

    exports.default = index;
    exports.fromBuffer = fromBuffer;
    exports.fromFile = fromFile;
    exports.readBuffer = readBuffer;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
