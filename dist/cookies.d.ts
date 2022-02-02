import { IdAndOptionalPreferences } from "./model/generated-model";
export declare enum Cookies {
    ID = "PrebidId",
    PREFS = "PrebidPrefs",
    TEST_3PC = "Prebid-test_3pc"
}
export declare const UNKNOWN_TO_OPERATOR = "UNKNOWN_TO_OPERATOR";
export declare const getPrebidDataCacheExpiration: (date?: Date) => Date;
/**
 * @param idCookie
 * @param prefsCookie
 */
export declare const fromCookieValues: (idCookie: string, prefsCookie: string) => IdAndOptionalPreferences;
