let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);

let server = require('../problem-3-3_dataVisualization.js').server;

describe("DataVisualization", () => {
    describe("Get Real Time Page", () => {
        it("it should GET Real Time Page", (done) => {
            chai
                .request(server)
                .get("/problem-3_realTimeStream.html")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("Get Historic Chart Page", () => {
        it("it should GET Historic Chart Page", (done) => {
            chai
                .request(server)
                .get("/problem-3_historicData.html")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("Test Real Time API", () => {
        it("it should GET Latest Temperature and Humidity Data", (done) => {
            chai
                .request(server)
                .get("/api?endpoint=realtime")
                .end((err, res) => {
                    res.should.have.status(200);
                    (res.body).should.be.a('object');
                    expect(res.body).to.have.property('timestamp');
                    expect(res.body).to.have.property('roomArea1');
                    expect(res.body).to.have.property('roomArea2');
                    expect(res.body).to.have.property('roomArea3');
                    expect(res.body).to.have.property('roomArea4');
                    expect(res.body).to.have.property('roomArea5');
                    done();
                });
        });
    });
    describe("Test Historic API", () => {
        it("it should GET Historic Data", (done) => {
            chai
                .request(server)
                .get("/api?endpoint=historic")
                .end((err, res) => {
                    res.should.have.status(200);
                    (res.body).should.be.a('object');
                    expect(res.body).to.have.property('timestamp');
                    expect(res.body).to.have.property('roomArea1');
                    expect(res.body).to.have.property('roomArea2');
                    expect(res.body).to.have.property('roomArea3');
                    expect(res.body).to.have.property('roomArea4');
                    expect(res.body).to.have.property('roomArea5');
                    done();
                });
        });
    });
});
