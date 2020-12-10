import * as Crypto from "crypto";

export function hash(filter: any, force = false) {
    if (!force && (!filter || typeof filter !== 'object')) {
        return "" + filter
    }

    let hash_ = Crypto.createHash('md5');

    hash_.update(JSON.stringify(filter), 'utf8');
    return hash_.digest("hex");
}