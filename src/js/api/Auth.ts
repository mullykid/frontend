import {UrlBuilder} from './QueryParametersEnconding'
import * as EJSON from '../utils/EjsonParser'

export async function authFetch(url: string, ...params: any[]) {
    let response = await fetch(buildUrl(url, params));

    if (!response.ok) {
        throw { code: response.status, codeName: 'UnknownError', errmsg: 'Ooops... Something went wrong' };
    }

    return EJSON.parse(await response.text());
}

function buildUrl(url: string, params: any[]) {
    let urlBuilder = new UrlBuilder(url);

    for (let paramArray of params) {
        for (let param in paramArray) {
            let paramValue = paramArray[param];
            // Skiping the parameters that are not actually set.
            if (paramValue !== undefined) {
                if (Array.isArray(paramValue) || paramValue instanceof Date || typeof paramValue === "string" || typeof paramValue === "number") {
                    urlBuilder.addQueryParameter(param, paramArray[param]);
                }
                else {
                    throw new TypeError(`Parameter ${param} cannot be encoded in the URL`);
                }
            }
        }
    }

    return urlBuilder.build();
}