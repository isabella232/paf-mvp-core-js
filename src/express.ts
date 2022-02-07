import {Request, Response} from "express";
import {CookieOptions} from "express-serve-static-core";
import {uriParams} from "./endpoints";
import {decodeBase64, encodeBase64, QSParam} from "./query-string";
import {MessageBase} from "./model/generated-model";

export const setCookie = (res: Response, cookieName: string, cookieValue: any, expirationDate: Date, optionsOverride: CookieOptions = {}) => {
    const options: CookieOptions = {
        expires: expirationDate,
        // @ts-ignore FIXME wrong typing: is supported property and is mandatory to work on Chrome
        sameSite: 'none',
        secure: true,
        encode: (v: string) => v, // to avoid the string to be encoded @see https://stackoverflow.com/questions/63205599/prevent-url-encode-in-response-set-cookie-nodejs
        ...optionsOverride
    };
    return res.cookie(cookieName, cookieValue, options);
}

export const removeCookie = (req: Request, res: Response, cookieName: string, optionsOverride: CookieOptions = {}) => {
    return setCookie(res, cookieName, null, new Date(0), optionsOverride)
}

export const httpRedirect = (res: Response, redirectUrl: string, httpCode = 303) => {
    res.redirect(httpCode, redirectUrl);
}

export const metaRedirect = (res: Response, redirectUrl: string, view: string) => {
    res.render(view, {
        metaRedirect: redirectUrl
    })
}

export const getReturnUrl = (req: Request, res: Response): URL | undefined => {
    const redirectStr = getMandatoryQueryStringParam(req, res, uriParams.returnUrl)
    return redirectStr ? new URL(redirectStr) : undefined
}

export const getMandatoryQueryStringParam = (req: Request, res: Response, paramName: string): string | undefined => {
    const stringValue = req.query[paramName] as string;
    if (stringValue === undefined) {
        res.sendStatus(400)
        return undefined;
    }
    return stringValue
}

/**
 * Get request or response object from query string
 * @param req
 */
export const getFromQueryString = <T extends MessageBase>(req: Request): T => {
    return JSON.parse(decodeBase64(req.query[QSParam.PAF] as string)) as T
}

/**
 * Set request or response object in query string
 * @param req
 */
export const setInQueryString = <T extends MessageBase>(req: Request, requestOrResponse: T): Request => {
    req.params[QSParam.PAF] = encodeBase64(JSON.stringify(requestOrResponse))
    return req;
}
