import { formatDatetimeAsISO, parseDateTimeAsIsoString, isStringIsoDateTime, isStringNumber, formatDateAsISO, split } from '../utils/FormatUtils';

import { isNumber } from 'util';
import * as EJSON from '../utils/EjsonParser';

const STRING_PREFIX = "_"
const OBJECT_PREFIX = "/"
const ENC_OBJECT_PREFIX = "$"
const NULL = "NULL"

export class UrlBuilder {
    url: string;
    separator: string;

    /** The same parameters should not be added multiple times */
    addQueryParameter(param: string, value: number|string|Date|(number|string|Date|Array<any>)[]|null) {
        this.url += this.separator + encodeURIComponent(param) + "=" + encodeURIComponent(QueryParameters.encodeQueryParameterToSingleString(value));
        this.separator = "&";

        return this;
    }

    public build() {
        return this.url;
    }

    constructor(baseUrl: string) {
        this.url = baseUrl;
        this.separator = baseUrl.indexOf("?")>-1 ? "&" : "?";
    }
    
    public static getBuilder(baseUrl:string) {
        return new UrlBuilder(baseUrl);
    }
}

/** 
 * This is a function that breaks the URL into list of string arguemnts. 
 * 
 * Typically this is done by express, but for some testing we needed to write out own implementation 
 */
export function deconstructUrlParameters(url: string) {
    let pos = url.indexOf("?");
    let result: { [name: string]: string|string[]} = {};

    if (pos>-1) {
        let queryParamsString = url.substring(pos+1);

        let pairs = queryParamsString.split("&");

        for (let pair of pairs) {
            let [ name, value ] = pair.split("=");

            value=decodeURIComponent(value);

            if (result[name]===undefined) {
                result[name] = value;
            }
            else if (Array.isArray(result[name])) {
                (result[name] as string[]).push(value);
            }
            else {
                result[name] = [ result[name] as string, value ];
            }
        }
    }

    return result;
}

export class QueryParameters {
    public static encodeQueryParameterToSingleString(value: any, encodeObjects = true): string {
        if (value === null) {
            return NULL;
        }
        
        if (value instanceof Date) {
            if (value.getUTCHours() === 0 && value.getUTCMinutes() === 0 && value.getUTCSeconds() === 0 && value.getUTCMilliseconds() === 0) {
                return formatDateAsISO(value as Date);
            }
            else {
                return formatDatetimeAsISO(value, value.getUTCMilliseconds()!==0);
            }
        }
        
        if (typeof value === "number") {
            return "" + value;
        }

        if (typeof value === "string" ) {
            // Check if the string could be parsed as number. If so, adding the prefix to make sure it won't be casted to number
            if (isStringNumber(value)) {
                return STRING_PREFIX + value;
            }
            
            // Check if the string could be parsed as DateTime. If so, adding the prefix to make sure it won't be casted to DateTime
            if (isStringIsoDateTime(value)) {
                return STRING_PREFIX + value;
            }

            if (value.startsWith('[') || value.endsWith(']') || value.startsWith(STRING_PREFIX) || value.startsWith(ENC_OBJECT_PREFIX) || value.indexOf(OBJECT_PREFIX)>-1) {
                return STRING_PREFIX + value.replace(/\//g, "\\/");
            }

            if (value===NULL) {
                return STRING_PREFIX + value;
            }

            return value;
        }

        if (Array.isArray(value)) {
            return "[" + value.map( (element) => QueryParameters.encodeQueryParameterToSingleString(element) ).join(",") + "]";
        }

        if (typeof value === "object") {
            let result = "";
            
            if (encodeObjects) {
                for (let propName in value) {
                    result += `${OBJECT_PREFIX}${propName}${OBJECT_PREFIX}${QueryParameters.encodeQueryParameterToSingleString(value[propName], false)}`
                }
            }            
            else {
                result = ENC_OBJECT_PREFIX + EJSON.stringify(value);
            }
            return result;

        }

        console.log("Could not determine type of value {}. Will not encode.", value);

        return "" + value;
    }
    
    /** This should be called only for the values returned by express.  */
    public static decodeQueryParameterValue(value: string|string[]): any {
        if (!Array.isArray(value)) {
            return QueryParameters.decodeQueryParameterSingleValue( value );
        }
        else {
            return value.map(QueryParameters.decodeQueryParameterSingleValue);
        }
    }


    public static decodeQueryParameterSingleValue(value: string): any {
        if (value.startsWith(STRING_PREFIX)) {
            return value.substring(STRING_PREFIX.length).replace(/\\(.)/g, "$1");
        }
        
        if (value==='NULL') {
            return null;
        }

        let asDate = parseDateTimeAsIsoString(value);
        if (asDate) {
            return asDate;
        }

        if (isStringNumber(value)) {
            return +value;
        }

        if (value.startsWith(ENC_OBJECT_PREFIX)) {
            value = value.substring(ENC_OBJECT_PREFIX.length);

            return EJSON.parse(value);
        }

        if (value.startsWith(OBJECT_PREFIX)) {
            // We are splitting on slashes that are not escaped by backslashes.
            let list = split(value, "/");
            
            let result: any = {};

            for (let i=1; i<list.length; i+=2) {
                result[list[i]] = QueryParameters.decodeQueryParameterSingleValue(list[i+1]);
            }

            return result;
        }

        if (value.startsWith("[") && value.endsWith("]")) {
            let values = value.substr(1, value.length-2);
            let result = [];

            let tokenStart = 0;
            let depth = 0;
            for (let i=0; i<=values.length; i++) {
                if (i<values.length) {
                    if (values.charAt(i)==='[' ) {
                        depth++;
                    }
                    if (values.charAt(i)===']') {
                        depth--
                    }
                }
            
                if (depth<0) {
                    throw new Error("Parse error. Closing unopened brackets at " + values.substring(0, i));
                }

                if ((i==values.length || values.charAt(i)===',') && depth===0) {
                    result.push( QueryParameters.decodeQueryParameterSingleValue(values.substring(tokenStart, i)));

                    tokenStart = i+1;
                }
            }

            if (depth>0) {
                throw new Error("Parse error. Unclosed bracket at " + values);
            }

            return result;
        } 
        
        return value;
    }
    
    public static getTypedQueryParameter(requestQuery: any, name: string): string|number|Date|null|(string|number|Date)[] {
        let value = requestQuery[name];

        if (value===undefined) {
            throw new Error("Parameter " + name + "is not defined");
        }

        return this.decodeQueryParameterValue( value );
    }

}