const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

//Function to Run Ajax Get, async off
function ajaxGet(url) {
  var tmp = null;
  $.ajax({
    async: false,
    type: "GET",
    url: url,
    success: function (data) {
      tmp = data;
    },
  });
  return tmp;
}

//Function for Converting Currency
function convertCurrency(from, exchangeRatio) {
  to = from / exchangeRatio;
  return to;
}

//Function to Join User Data with Salary Data
function join(userdata, salarydata, exchangeRatio) {
  let newdata = [];
  userdata.forEach(function (data) {
    id = data.id;
    data.salaryInIDR = salarydata.array.find((d) => d.id === id).salaryInIDR;
    data.salaryInUSD = convertCurrency(data.salaryInIDR, exchangeRatio);

    //Website and Company Column not Needed as Stated in PDF
    delete data.website;
    delete data.company;

    //Push Joined Record to newdata array
    newdata.push(data);
  });
  return newdata;
}

//Export Module
module.exports = {
  ajaxGet: function (url) {
    return ajaxGet(url);
  },
  convertCurrency: function (from, exchangeRatio) {
    return convertCurrency(from, exchangeRatio);
  },
  join: function (userdata, salarydata, exchangeRatio) {
    return join(userdata, salarydata, exchangeRatio);
  },
};
