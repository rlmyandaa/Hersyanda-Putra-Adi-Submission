const fs = require('fs');
let sensordata = JSON.parse(fs.readFileSync('json_files/sensor_data.json'));

//Require Main Function in main.js
const main = require('./main.js')

//======================================================================================================================================================
//============================================================ Main Program Call ========================================================================
//======================================================================================================================================================

// filter based on daily data
let uniqueDay = main.findUnique(sensordata);

//process based on uniqueDay found
let processedData = main.process(uniqueDay.uniqueDay, uniqueDay.updatedData);

//print the processed data
main.print(processedData);