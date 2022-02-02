import { Request, Response } from "express";
import { CookieOptions } from "express-serve-static-core";
export declare const setCookie: (res: Response, cookieName: string, cookieValue: any, expirationDate: Date, optionsOverride?: CookieOptions) => Response<any, Record<string, any>>;
export declare const removeCookie: (req: Request, res: Response, cookieName: string, optionsOverride?: CookieOptions) => Response<any, Record<string, any>>;
export declare const httpRedirect: (res: Response, redirectUrl: string, httpCode?: number) => void;
export declare const metaRedirect: (res: Response, redirectUrl: string, view: string) => void;
export declare const getReturnUrl: (req: Request, res: Response) => URL | undefined;
export declare const getMandatoryQueryStringParam: (req: Request, res: Response, paramName: string) => string | undefined;
