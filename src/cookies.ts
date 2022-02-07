import {IdsAndOptionalPreferences, Identifier, Preferences} from "./model/generated-model";

export enum Cookies {
    ID = "PrebidId",
    PREFS = 'PrebidPrefs',
    TEST_3PC = 'Prebid-test_3pc'
}

export const UNKNOWN_TO_OPERATOR = 'UNKNOWN_TO_OPERATOR'

// 1st party cookie expiration: 10 min
export const getPrebidDataCacheExpiration = (date: Date = new Date()) => {
    const expirationDate = new Date(date);
    expirationDate.setTime(expirationDate.getTime() + 1000 * 60 * 10)
    return expirationDate;
}

/**
 * @param idCookie
 * @param prefsCookie
 */
export const fromCookieValues = (idCookie: string, prefsCookie: string): IdsAndOptionalPreferences => {
    return {
        identifiers: (idCookie === UNKNOWN_TO_OPERATOR || idCookie === undefined) ? [] : [JSON.parse(idCookie) as Identifier],
        preferences: (prefsCookie === UNKNOWN_TO_OPERATOR || prefsCookie === undefined) ? undefined : JSON.parse(prefsCookie) as Preferences
    }
}
