"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMandatoryQueryStringParam = exports.getReturnUrl = exports.metaRedirect = exports.httpRedirect = exports.removeCookie = exports.setCookie = void 0;
const endpoints_1 = require("./endpoints");
const setCookie = (res, cookieName, cookieValue, expirationDate, optionsOverride = {}) => {
    const options = Object.assign({ expires: expirationDate, 
        // @ts-ignore FIXME wrong typing: is supported property and is mandatory to work on Chrome
        sameSite: 'none', secure: true, encode: (v) => v }, optionsOverride);
    return res.cookie(cookieName, cookieValue, options);
};
exports.setCookie = setCookie;
const removeCookie = (req, res, cookieName, optionsOverride = {}) => {
    return (0, exports.setCookie)(res, cookieName, null, new Date(0), optionsOverride);
};
exports.removeCookie = removeCookie;
const httpRedirect = (res, redirectUrl, httpCode = 303) => {
    res.redirect(httpCode, redirectUrl);
};
exports.httpRedirect = httpRedirect;
const metaRedirect = (res, redirectUrl, view) => {
    res.render(view, {
        metaRedirect: redirectUrl
    });
};
exports.metaRedirect = metaRedirect;
const getReturnUrl = (req, res) => {
    const redirectStr = (0, exports.getMandatoryQueryStringParam)(req, res, endpoints_1.uriParams.returnUrl);
    return redirectStr ? new URL(redirectStr) : undefined;
};
exports.getReturnUrl = getReturnUrl;
const getMandatoryQueryStringParam = (req, res, paramName) => {
    const stringValue = req.query[paramName];
    if (stringValue === undefined) {
        res.sendStatus(400);
        return undefined;
    }
    return stringValue;
};
exports.getMandatoryQueryStringParam = getMandatoryQueryStringParam;
//# sourceMappingURL=express.js.map