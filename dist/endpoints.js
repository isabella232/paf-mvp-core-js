"use strict";
// The endpoints exposed by the operator API
Object.defineProperty(exports, "__esModule", { value: true });
exports.uriParams = exports.jsonEndpoints = exports.redirectEndpoints = exports.signAndVerifyEndpoints = void 0;
exports.signAndVerifyEndpoints = {
    verifyRead: '/verify/read',
    signWrite: '/sign/write',
    signPrefs: '/sign/prefs',
};
exports.redirectEndpoints = {
    read: '/redirect/read',
    write: "/redirect/write"
};
exports.jsonEndpoints = {
    read: '/json/read',
    verify3PC: '/json/verify3pc',
    write: "/json/write",
};
exports.uriParams = {
    data: 'prebid',
    returnUrl: 'url',
    signature: 'signature',
    receiver: 'receiver',
    sender: 'sender',
    timestamp: 'timestamp',
    body: 'body'
};
//# sourceMappingURL=endpoints.js.map