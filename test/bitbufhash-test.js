'use strict';

const bitBufHash = require('../bitbufhash.js');
const BitBuf = require('bitbuf');
const assert = require('assert');

(function() {
	assert.equal(bitBufHash('foo', 'bar', 27, 'sha512').toString(),
				 '101011000000111000011111110');
	assert.equal(bitBufHash('foo', 'bar', 10, 'sha512').toString(),
				 '1010110000');
	assert.equal(bitBufHash('foo', 'bar', 7, 'sha512').toString(),
				 '1010110');
	assert.equal(bitBufHash('foo', 'bar', 200, 'md5').toString(),
				 '10111011010101111101111101101010101011111000001111' +
				 '01000100101101000011010101101101011101001011011010' +
				 '01111101011011010011110110110000101100100111111101' +
				 '01000111101110100111101110001010000100011111001001');
	assert.equal(bitBufHash('foo', 'bar', 33, 'sha1').toString(),
				 '010011011011100111010000111000001');
	assert.equal(bitBufHash('foo', 'baz', 33, 'sha1').toString(),
				 '101101100100101011100110100000101');
	assert.equal(bitBufHash(BitBuf.from('01010101010101010'),
							BitBuf.from('1010101010101010101'),
							11,
							'sha1').toString(),
				 '00010110110');
	console.log('ok');
	process.exit(0);
})();
