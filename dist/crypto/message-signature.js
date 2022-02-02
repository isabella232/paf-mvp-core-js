"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNewIdResponseSigner = exports.PostIdPrefsResponseSigner = exports.GetIdPrefsResponseSigner = exports.GetIdPrefsRequestSigner = exports.PostIdPrefsRequestSigner = exports.MessageSigner = exports.SIGN_SEP = void 0;
exports.SIGN_SEP = '\u2063';
class MessageSigner {
    sign(ecdsaPrivateKey, message) {
        const toSign = this.signatureString(message);
        return ecdsaPrivateKey.sign(toSign);
    }
    verify(ecdsaPublicKey, message) {
        const toVerify = this.signatureString(message);
        const signature = message.signature;
        return ecdsaPublicKey.verify(toVerify, signature);
    }
}
exports.MessageSigner = MessageSigner;
class PostIdPrefsRequestSigner extends MessageSigner {
    signatureString(postIdPrefsRequest) {
        var _a;
        const dataToSign = [
            postIdPrefsRequest.sender,
            postIdPrefsRequest.receiver,
        ];
        if (postIdPrefsRequest.body.preferences) {
            dataToSign.push(postIdPrefsRequest.body.preferences.source.signature);
        }
        for (let id of (_a = postIdPrefsRequest.body.identifiers) !== null && _a !== void 0 ? _a : []) {
            dataToSign.push(id.source.signature);
        }
        dataToSign.push(postIdPrefsRequest.timestamp.toString());
        return dataToSign.join(exports.SIGN_SEP);
    }
}
exports.PostIdPrefsRequestSigner = PostIdPrefsRequestSigner;
class GetIdPrefsRequestSigner extends MessageSigner {
    signatureString(getIdPrefsRequest) {
        return [
            getIdPrefsRequest.sender,
            getIdPrefsRequest.receiver,
            getIdPrefsRequest.timestamp
        ].join(exports.SIGN_SEP);
    }
}
exports.GetIdPrefsRequestSigner = GetIdPrefsRequestSigner;
function getIdPrefSignature(getIdPrefsResponse) {
    var _a;
    const dataToSign = [
        getIdPrefsResponse.sender,
        getIdPrefsResponse.receiver,
    ];
    if (getIdPrefsResponse.body.preferences) {
        dataToSign.push(getIdPrefsResponse.body.preferences.source.signature);
    }
    for (let id of (_a = getIdPrefsResponse.body.identifiers) !== null && _a !== void 0 ? _a : []) {
        dataToSign.push(id.source.signature);
    }
    dataToSign.push(getIdPrefsResponse.timestamp.toString());
    return dataToSign.join(exports.SIGN_SEP);
}
class GetIdPrefsResponseSigner extends MessageSigner {
    signatureString(getIdPrefsResponse) {
        return getIdPrefSignature(getIdPrefsResponse);
    }
}
exports.GetIdPrefsResponseSigner = GetIdPrefsResponseSigner;
class PostIdPrefsResponseSigner extends MessageSigner {
    signatureString(postIdPrefsResponse) {
        return getIdPrefSignature(postIdPrefsResponse);
    }
}
exports.PostIdPrefsResponseSigner = PostIdPrefsResponseSigner;
class GetNewIdResponseSigner extends MessageSigner {
    signatureString(getNewIdResponse) {
        return getIdPrefSignature(getNewIdResponse);
    }
}
exports.GetNewIdResponseSigner = GetNewIdResponseSigner;
//# sourceMappingURL=message-signature.js.map