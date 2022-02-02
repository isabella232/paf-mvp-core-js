"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromCookieValues = exports.getPrebidDataCacheExpiration = exports.UNKNOWN_TO_OPERATOR = exports.Cookies = void 0;
var Cookies;
(function (Cookies) {
    Cookies["ID"] = "PrebidId";
    Cookies["PREFS"] = "PrebidPrefs";
    Cookies["TEST_3PC"] = "Prebid-test_3pc";
})(Cookies = exports.Cookies || (exports.Cookies = {}));
exports.UNKNOWN_TO_OPERATOR = 'UNKNOWN_TO_OPERATOR';
// 1st party cookie expiration: 10 min
const getPrebidDataCacheExpiration = (date = new Date()) => {
    const expirationDate = new Date(date);
    expirationDate.setTime(expirationDate.getTime() + 1000 * 60 * 10);
    return expirationDate;
};
exports.getPrebidDataCacheExpiration = getPrebidDataCacheExpiration;
/**
 * @param idCookie
 * @param prefsCookie
 */
const fromCookieValues = (idCookie, prefsCookie) => {
    return {
        identifiers: (idCookie === exports.UNKNOWN_TO_OPERATOR || idCookie === undefined) ? [] : [JSON.parse(idCookie)],
        preferences: (prefsCookie === exports.UNKNOWN_TO_OPERATOR || prefsCookie === undefined) ? undefined : JSON.parse(prefsCookie)
    };
};
exports.fromCookieValues = fromCookieValues;
//# sourceMappingURL=cookies.js.map