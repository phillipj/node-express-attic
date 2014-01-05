module.exports = function(config) {
	if (typeof(config) !== 'object') {
		throw new TypeError('Configuration was missing while creating attic middleware');
	}

	return function(request, response, next) {
		var antique = config[request.path];
		if (antique) {
			return response.redirect(301, antique);
		}

		next();
	};
};