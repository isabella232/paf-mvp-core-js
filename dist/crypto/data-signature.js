"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefsSigner = exports.IdSigner = exports.DataSigner = exports.SIGN_SEP = void 0;
exports.SIGN_SEP = '\u2063';
class DataSigner {
    sign(ecdsaPrivateKey, data) {
        const toSign = this.signatureString(data);
        return ecdsaPrivateKey.sign(toSign);
    }
    verify(ecdsaPublicKey, data) {
        const toVerify = this.signatureString(data);
        const signature = data.source.signature;
        return ecdsaPublicKey.verify(toVerify, signature);
    }
}
exports.DataSigner = DataSigner;
class IdSigner extends DataSigner {
    signatureString(data) {
        return [
            data.source.domain,
            data.source.timestamp,
            data.type,
            data.value
        ].join(exports.SIGN_SEP);
    }
}
exports.IdSigner = IdSigner;
class PrefsSigner extends DataSigner {
    signatureString(preferences) {
        const dataToSign = [
            preferences.source.domain,
            preferences.source.timestamp
        ];
        const data = preferences.data;
        for (let key in data) {
            dataToSign.push(key);
            dataToSign.push(JSON.stringify(data[key]));
        }
        return dataToSign.join(exports.SIGN_SEP);
    }
}
exports.PrefsSigner = PrefsSigner;
//# sourceMappingURL=data-signature.js.map