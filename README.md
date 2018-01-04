In a Nutshell
=============

This is a single function package implementing an arbitrary bit length
hash and hmac from arbitrary length input and key. Input and key can
be either string, Buffer, or in case of non-byte-aligned cases, a
BitBuf object. This entire function is an extension to BitBuf.

Reference
=========

bitBufHash(data, key, digestBitLength)
--------------------------------------

```
const bitBufHash = require('bitbufhash');
console.log(bitBufHash('foo', 'bar', 27, 'sha256').toString());
```

```
const bitBufHash = require('bitbufhash');
const BitBuf = require('bitbuf');
console.log(bitBufHash(BitBuf.from('010101'), BitBuf.from('1001001101'), 13, 'md5').toString());
```

Just figure it out. Length of the hash is calculated into the hash, so
same key and same data produce totally different hash values, if the
length differs (i.e. the hash is not just truncated ans therefore
share a common prefix).

Author
======

Timo J. Rinne <tri@iki.fi>


License
=======

GPL-2.0
