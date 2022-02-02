"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateKeyFromString = exports.publicKeyFromString = void 0;
const ECDSA = require("ecdsa-secp256r1");
const ECKey = require("ec-key");
const publicKeyFromString = (keyString) => ECDSA.fromJWK(new ECKey(keyString));
exports.publicKeyFromString = publicKeyFromString;
const privateKeyFromString = (keyString) => ECDSA.fromJWK(new ECKey(keyString));
exports.privateKeyFromString = privateKeyFromString;
//# sourceMappingURL=keys.js.map