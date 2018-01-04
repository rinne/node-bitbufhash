'use strict';

const crypto = require('crypto');
const BitBuf = require('bitbuf');

function bitBufHash(data, key, digestLengthBits, hashName) {
    var rv, i, d, hmac, hash, kb, nb = Buffer.allocUnsafe(6), nb2 = Buffer.allocUnsafe(6);
    if (typeof(key) === 'string') {
		key = Buffer.from(key);
    }
    if ((key === undefined) || (key === null)) {
		hash = undefined;
    } else if (Buffer.isBuffer(key)) {
		if (key.length > 0) {
			nb.writeUIntBE(key.length * 8, 0, 6);
			hash = crypto.createHash(hashName);
			hash.update(nb);
			hash.update(key);
		} else {
			hash = undefined;
		}
    } else if (BitBuf.isBitBuf(key)) {
		if (key.length > 0) {
			nb.writeUIntBE(key.length, 0, 6);
			hash = crypto.createHash(hashName);
			hash.update(nb);
			hash.update(key.buffer());
		} else {
			hash = undefined;
		}
    } else {
		throw new Error("Invalid key material");
    }
	if (! (Number.isSafeInteger(digestLengthBits) && (digestLengthBits >= 0))) {
		throw new Error("Invalid digest length");
	}
    kb = hash ? hash.digest('buffer') : undefined;
    for (i = 0, d = Buffer.allocUnsafe(0); (d.length * 8) < digestLengthBits; i++) {
		hmac = (kb ? crypto.createHmac(hashName, kb) : crypto.createHash(hashName));
		if (i > 0) {
			nb.writeUIntBE(i, 0, 6);
			hmac.update(nb);
		} else {
			if (typeof(data) === 'string') {
				data = Buffer.from(data);
			}
			if (Buffer.isBuffer(data)) {
				nb2.writeUIntBE(data.length * 8, 0, 6);
			} else if (BitBuf.isBitBuf(data)) {
				nb2.writeUIntBE(data.length, 0, 6);
				data = data.buffer();
			} else {
				throw new Error("Invalid data material");
			}
		}
		hmac.update(nb2);
		hmac.update(data);
		d = Buffer.concat([ d, hmac.digest('buffer') ]);
    }
    rv = BitBuf.from(d, digestLengthBits);
    return rv;
}

module.exports = bitBufHash;
