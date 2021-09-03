const fs = require('fs');

//Require Support Function in support.js
const support = require('./support.js')

//Data Uri Constant
const userdataUri = "http://jsonplaceholder.typicode.com/users";
const usdIdrUri = "https://free.currconv.com/api/v7/convert?q=USD_IDR&compact=ultra&apiKey=d3ad6ffa8e4702f14a1f";
const json_salary_data = "json_files/salary_data.json";
    
//Get Salary Data from Json File
let salarydata = JSON.parse(fs.readFileSync(json_salary_data));

//Ajax Get USD IDR Exchange Ratio from free.currconv.com
let exchangeRatio = support.ajaxGet(usdIdrUri).USD_IDR;

//Ajax Get User Data
let userdata = support.ajaxGet(userdataUri);

//Join User Data and Salary Data
let joinedData = support.join(userdata, salarydata, exchangeRatio);

//Output to Console
console.log(joinedData);



