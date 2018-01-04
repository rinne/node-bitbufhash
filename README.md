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

console.log(bitBufHash('foo', 'bar', 27, 'sha256'));


Author
======

Timo J. Rinne <tri@iki.fi>


License
=======

GPL-2.0
