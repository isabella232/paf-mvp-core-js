import {IdsAndOptionalPreferences, Identifier, Preferences, Identifiers, Test3Pc} from "./model/generated-model";

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
 * @param idsCookie
 * @param prefsCookie
 */
export const fromCookieValues = (idsCookie: string, prefsCookie: string): IdsAndOptionalPreferences => {
    return {
        identifiers: fromIdsCookie(idsCookie),
        preferences: fromPrefsCookie(prefsCookie)
    }
}

export const fromIdsCookie = (idsCookie: string): Identifiers => (idsCookie === UNKNOWN_TO_OPERATOR || idsCookie?.length === 0) ? [] : JSON.parse(idsCookie) as Identifiers
export const fromPrefsCookie = (prefsCookie: string): Preferences|undefined => (prefsCookie === UNKNOWN_TO_OPERATOR || prefsCookie === undefined) ? undefined : JSON.parse(prefsCookie) as Preferences
export const fromTest3pcCookie = (test3pcCookie: string): Test3Pc|undefined => (test3pcCookie === undefined) ? undefined : JSON.parse(test3pcCookie) as Test3Pc

export const toIdsCookie = (identifiers: Identifiers): string => JSON.stringify(identifiers)
export const toPrefsCookie = (preferences: Preferences): string => JSON.stringify(preferences)
export const toTest3pcCookie = (test3pc: Test3Pc): string => JSON.stringify(test3pc)
