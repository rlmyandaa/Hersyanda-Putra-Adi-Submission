let chai = require("chai");
var should = chai.should();
var expect = chai.expect;
const main = require("../main");

const fs = require('fs');
let sensordata = JSON.parse(fs.readFileSync('json_files/sensor_data.json'));

describe("MainFunction", () => {
  describe("Find Unique Day Function", () => {
    it("it should return correct unique day return format", () => {
      var unique = main.findUnique(sensordata)
      //console.log(unique);
      expect(unique).to.have.property('uniqueDay');
      expect(unique).to.have.property('updatedData');
    });
  });
  describe("Process Data Function", () => {
    it("it should return a valid array output", () => {
      var uniqueDay = main.findUnique(sensordata);
      let processedData = main.process(uniqueDay.uniqueDay, uniqueDay.updatedData);
      expect(processedData).be.a('array');
      expect(processedData[0]).to.have.property('day');
      expect(processedData[0]).to.have.property('data');
      expect(processedData[0]).to.have.property('temperature');
      expect(processedData[0]).to.have.property('humidity');
    });
  });
});
