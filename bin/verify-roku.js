#!/usr/bin/env node

'use strict';

var argv = require('minimist')(process.argv.slice(2), { string: ['devToken', 'receipt'] });

if (argv.help) {
	console.log('Usage: ./verfiy.js --devToken=\'developer-id\' --receipt=\'transaction-data\'');
	process.exit(1);
}

var iap = require('../index.js');

var platform = 'roku';
var payment = argv;

iap.verifyPayment(platform, payment, function (error, result) {
	if (error) {
		return console.log(error);
	}

	console.log('Verified:');
	console.log(JSON.stringify(result, null, '\t'));
});
