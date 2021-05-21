"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const dotenvPath = process.env.LOAD_DEV_DOTENV ? '.env.dev' : '.env';
dotenv.config({ path: dotenvPath });
//# sourceMappingURL=dotenv.js.map