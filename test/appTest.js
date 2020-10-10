// ENV Variables Mockup
require('./envHandle')

const chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    request = require('supertest'),
    app = require('../server/index')

// Starting the server before running the tests
before(function () {
    app.on("Server Started: Ready For Testing", function () {
        done()
    })
});

describe('HOME API', () => {
    // Should return a categorized list of cars
    it('Home Page API', function (done) {
        request(app).get('/api/')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })
})