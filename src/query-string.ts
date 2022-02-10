import {Error, ResponseCode} from "./model/generated-model";

export enum QSParam {
    paf = "paf"
}

export const encodeBase64 = (data: string): string => {
    return Buffer.from(data).toString('base64');
}
export const decodeBase64 = (data: string): string => {
    return Buffer.from(data, 'base64').toString('ascii');
}

export const getPafDataFromQueryString = <T>(urlParams: URLSearchParams|{[key: string]: string}): T | undefined => {
    const data = typeof urlParams.get === 'function' ? urlParams.get(QSParam.paf) : (urlParams as {[key: string]: string})[QSParam.paf] // Not super elegant
    return data ? JSON.parse(data) as T : undefined
}
