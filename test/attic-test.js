var expect = require('expect.js');
var sinon = require('sinon');
var attic = require('../');

describe('Attic', function(done) {

	var response;

	beforeEach(function() {
		response = {
			redirect: sinon.spy()
		};
	});

	it('should export a function', function() {
		expect(attic).to.be.a('function');
	});

	it('should require an object parameter', function() {
		expect(function() {
			attic();
		}).to.throwException('TypeError');
	});

	it('should return a middleware function', function() {
		expect(attic({})).to.be.a('function');
	});

	it('should invoke the next callback given as third parameter when request not match any antique files', function() {
		var nextSpy = sinon.spy();
		var middleware = attic({});

		middleware(requestWithPath('/antique.html'), response, nextSpy);

		expect(nextSpy.calledOnce).to.be.ok();
	});

	it('should do a permanent redirect to new location when request path match an antique file', function() {
		var middleware = attic({
			'/antique.html': '/archive/oldAntique.html'
		});

		middleware(requestWithPath('/antique.html'), response);

		expect(response.redirect.calledWith(301, '/archive/oldAntique.html')).to.be.ok();
	});

	function requestWithPath(path) {
		return { path: path };
	}

});