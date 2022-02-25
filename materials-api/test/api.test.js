const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')

describe('Unit testing /materials route', function() {

    it('request should return OK', function() {
      return request(app)
        .get('/materials')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    })

    it('response should be JSON', function() {
      return request(app)
        .get('/materials')
        .expect('Content-Type', /json/)
    })

    it('response should be an array', function() {
      return request(app)
        .get('/materials')
        .then(function(response){
          expect(response._body).to.be.an('array')
      })
  })

})