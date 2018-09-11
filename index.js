'use strict';

var platforms = {
	amazon: require('./lib/amazon'),
	apple: require('./lib/apple'),
	google: require('./lib/google'),
	roku: require('./lib/roku')
};


exports.verifyPayment = function (platform, payment, cb) {
	function syncError(error) {
		process.nextTick(function () {
			cb(error);
		});
	}

	if (!payment) {
		return syncError(new Error('No payment given'));
	}

	var engine = platforms[platform];

	if (!engine) {
		return syncError(new Error('Platform ' + platform + ' not recognized'));
	}

	engine.verifyPayment(payment, function (error, result) {
		if (error) {
			return cb(error);
		}

		result.platform = platform;

		cb(null, result);
	});
};

exports.verifyPaymentTest = function (param) {
	return console.log('verify Payment Test export', param);
}

exports.verifyPaymentPromise = function (platform, payment) {

	return new Promise(function(resolve,reject) {
		if (!payment) {
			return reject("No payment given");
		}
		
		var engine = platforms[platform];
		if(!engine) {
			return reject("Platform not recognized");
		}

		engine.verifyPayment(payment, function (error, result) {
			if (error) {
				return reject(error);
			}
			result.platform = platform;
			return resolve(result);
		});

	})
	
};
