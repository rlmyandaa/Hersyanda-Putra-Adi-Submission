//Require Support Function
const support = require('./support.js')

//======================================================================================================================================================
//============================================================ Main Function ========================================================================
//======================================================================================================================================================
//Function for finding unique day
function findUnique(data)
{
    let day = new Set();
    data.array.forEach(function(data) {
        date = new Date(data.timestamp);
        parsed = date.toDateString();
        data.date = parsed;
        day.add(parsed);
    });
    return {
        uniqueDay: day,
        updatedData: data
    };
}


//Function to process aggregating and mmma finding
function process(day, sensordata)
{
    let dataByDate = [];
    day.forEach(function(date) {
        dayData = sensordata.array.filter(data => data.date === date );
        temperature_data = dayData.map(function(sensor){ return sensor.temperature });
        humidity_data = dayData.map(function(sensor){ return sensor.humidity });
        let tmp = {
            day: date,
            data: dayData,
            temperature: support.findMMMA(temperature_data),
            humidity: support.findMMMA(humidity_data)
        }
        dataByDate.push(tmp);
    });
    return dataByDate;
}

//Function for printing all the data
function print(data)
{
    console.log("Day", support.whitespace(String("Day").length), "Min Temp", support.whitespace(String("Min Temp").length), "Max Temp", support.whitespace(String("Max Temp").length), "Median Temp", support.whitespace(String("Median Temp").length), "Avg Temp", support.whitespace(String("Avg Temp").length), "Min Humidity", support.whitespace(String("Min Humidity").length), "Max Humidity", support.whitespace(String("Max Humidity").length), "Median Humidity", support.whitespace(String("Median Humidity").length), "Avg Humidity", support.whitespace(String("Avg Humidity").length) )
    data.forEach(function(data){
        console.log(data.day, support.whitespace(String(data.day.length)), data.temperature.min, support.whitespace(String(data.temperature.min).length), data.temperature.max, support.whitespace(String(data.temperature.max).length), data.temperature.median, support.whitespace(String(data.temperature.median).length),data.temperature.avg, support.whitespace(String(data.temperature.avg).length), data.humidity.min, support.whitespace(String(data.humidity.min).length), data.humidity.max, support.whitespace(String(data.humidity.max).length), data.humidity.median, support.whitespace(String(data.humidity.median).length), data.humidity.avg, support.whitespace(String(data.humidity.avg).length))
    });
}

module.exports = {
    findUnique: function(data) {
        return findUnique(data);
    },
    process: function(day, sensordata) {
        return process(day, sensordata);
    },
    print: function(data) {
        print(data);
    }
}