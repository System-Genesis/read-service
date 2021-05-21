"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divide3 = exports.multiply3 = exports.subtract3 = exports.add3 = void 0;
const math = require("./simpleModuleToMock");
const add3 = (a) => math.add(a, 3);
exports.add3 = add3;
const subtract3 = (a) => math.subtract(a, 3);
exports.subtract3 = subtract3;
const multiply3 = (a) => math.multiply(a, 3);
exports.multiply3 = multiply3;
const divide3 = (a) => math.divide(a, 3);
exports.divide3 = divide3;
//# sourceMappingURL=simpleModuleUsingMocked.js.map