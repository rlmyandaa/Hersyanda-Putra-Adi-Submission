let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);


describe("Problem 1 Test", () => {
    describe("Test Ajax Get User Data", () => {
        it("it should return user data", (done) => {
            chai
                .request('http://jsonplaceholder.typicode.com')
                .get("/users")
                .end((err, res) => {
                    res.should.have.status(200);
                    (res.body).should.be.a('array');
                    expect(res.body[0]).to.have.property('id');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('username');
                    expect(res.body[0]).to.have.property('email');
                    expect(res.body[0]).to.have.property('address');
                    expect(res.body[0]).to.have.property('phone');
                    expect(res.body[0]).to.have.property('website');
                    expect(res.body[0]).to.have.property('company');
                    done();
                });
        });
    });
    describe("Test Ajax Get Currency Exchange Ratio", () => {
        it("it should return usd idr exchange ratio", (done) => {
            chai
                .request('https://free.currconv.com/api/v7/convert?q=USD_IDR&compact=ultra&apiKey=d3ad6ffa8e4702f14a1f')
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    (res.body).should.be.a('object');
                    expect(res.body).to.have.property('USD_IDR');
                    done();
                });
        });
    });
});
