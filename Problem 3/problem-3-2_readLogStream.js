const fs = require("fs");
const logPath = "logs/log.json";

//======================================================================================================================================================
//============================================================ Main Program Call ========================================================================
//======================================================================================================================================================

//Set Log Reading Interval -> 15 Minutes converted to second
let interval = 5;
setInterval(function () {
  try {
    print(getRoomSummary(interval));
  } catch (error) {
    console.log("Error. Possible Cause : Dummy Data Logger didn't started yet");
  }
}, interval * 1000);

//======================================================================================================================================================
//============================================================ Main Function ========================================================================
//======================================================================================================================================================

//Function to Get Min Max Median Average from Each Room and Averaging Sensor Value
function getRoomSummary(seconds) {
  //Load Room Sensor Data in x seconds range before now
  let roomData = getDataInRangeSeconds(seconds);

  //Aggregating Sensor Data for Each Room
  let roomSensorData1 = roomData.map(function (data) {
    return data.roomArea1;
  });
  let roomSensorData2 = roomData.map(function (data) {
    return data.roomArea2;
  });
  let roomSensorData3 = roomData.map(function (data) {
    return data.roomArea3;
  });
  let roomSensorData4 = roomData.map(function (data) {
    return data.roomArea4;
  });
  let roomSensorData5 = roomData.map(function (data) {
    return data.roomArea5;
  });

  //Process to Get Min Max Median Average from Sensor in Each Room, and Push to Result
  let result = Array();
  result.push({
    room: "roomArea1",
    data: processRoom(roomSensorData1),
  });
  result.push({
    room: "roomArea2",
    data: processRoom(roomSensorData2),
  });
  result.push({
    room: "roomArea3",
    data: processRoom(roomSensorData3),
  });
  result.push({
    room: "roomArea4",
    data: processRoom(roomSensorData4),
  });
  result.push({
    room: "roomArea5",
    data: processRoom(roomSensorData5),
  });

  //Finding Sensor Average Value
  let temperatureAll = Array();
  let humidityAll = Array();

  //Get RAW Sensor Value from Result Object
  result.forEach(function (obj) {
    temperatureAll.push(...obj.data.temperature_data);
    humidityAll.push(...obj.data.humidity_data);
  });

  //Repack Data for Output
  let all = {
    byRoom: result,
    averageTemperature: averaging(temperatureAll),
    averageHumidity: averaging(humidityAll),
  };
  return all;
}

//Function to Get All Data within x Seconds before now
function getDataInRangeSeconds(seconds) {
  let data = openLog(logPath).filter(function (data) {
    let timeData = new Date(data.timestamp);
    //console.log("Data ",timeData.getTime());
    let now = new Date(Date.now()).getTime();
    //console.log("Now ",now - 5000);
    return timeData.getTime() >= now - seconds * 1000;
  });
  return data;
}

//Function for Processing Data from a Room
function processRoom(room) {
  //Get All Temperature Data from Room
  temperature_data = room.map((r) => r.temperature);

  //Get All Temperature Data from Room
  humidity_data = room.map((h) => h.humidity);

  let tmp = {
    //Temperature Min Max Median Average Data
    temperature: findMMMA(temperature_data),
    //Humidity Min Max Median Average Data
    humidity: findMMMA(humidity_data),
    //RAW Temperature Data for Sensor Value Averaging Later
    temperature_data: temperature_data,
    //RAW Humidity Data for Sensor Value Averaging Later
    humidity_data: humidity_data,
  };
  return tmp;
}

//======================================================================================================================================================
//============================================================ Support Function ========================================================================
//======================================================================================================================================================

//Function to Get Log Data from logs/log.json
function openLog(path) {
  let logContent = fs.readFileSync(path, "utf8");
  return JSON.parse(logContent);
}

//Function for Calculating Min Max Median Average
function findMMMA(data) {
  let mmma = new Object();
  mmma.min = Math.min.apply(null, data);
  mmma.max = Math.max.apply(null, data);
  mmma.avg = averaging(data);
  mmma.median = findMedian(data);

  return mmma;
}

//Function to Get Median Data
function findMedian(data) {
  let median = null;

  //Sorting with Rule
  data.sort(function (a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  });

  //If the Data Count is Even
  if (data.length % 2 === 0) {
    median = (data[data.length / 2 -1] + data[data.length / 2]) / 2;
  }
  //If the Data Count is Odd
  else if (data.length % 2 === 1) {
    median = data[Math.ceil(data.length / 2)];
  }
  //If there's only 1 Data
  else if (data.length == 1) {
    median = data[0];
  }

  return median;
}

//Function for Averaging Data
function averaging(data) {
  let average =
    data.reduce(function (a, b) {
      return a + b;
    }) / data.length;
  return average;
}

//Function for Giving Whitespace in Output to Get Evenly Written Output
function whitespace(count) {
  tmp = "";
  for (let i = 0; i < 18 - count; i++) {
    tmp += " ";
  }
  return tmp + "|";
}

//Function to Print Data to Console
function print(data) {
  console.log("15 minutes Report, Report Time: " + new Date(Date.now()));

  //Print Table
  console.log(
    "Room",
    whitespace(String("Room").length),
    "Min Temp",
    whitespace(String("Min Temp").length),
    "Max Temp",
    whitespace(String("Max Temp").length),
    "Median Temp",
    whitespace(String("Median Temp").length),
    "Avg Temp",
    whitespace(String("Avg Temp").length),
    "Min Humidity",
    whitespace(String("Min Humidity").length),
    "Max Humidity",
    whitespace(String("Max Humidity").length),
    "Median Humidity",
    whitespace(String("Median Humidity").length),
    "Avg Humidity",
    whitespace(String("Avg Humidity").length)
  );
  let i = 0;
  data.byRoom.forEach(function (d) {
    console.log(
      d.room,
      whitespace(d.room.length),
      d.data.temperature.min,
      whitespace(String(d.data.temperature.min).length),
      d.data.temperature.max,
      whitespace(String(d.data.temperature.max).length),
      d.data.temperature.median,
      whitespace(String(d.data.temperature.median).length),
      d.data.temperature.avg,
      whitespace(String(d.data.temperature.avg).length),
      d.data.humidity.min,
      whitespace(String(d.data.humidity.min).length),
      d.data.humidity.max,
      whitespace(String(d.data.humidity.max).length),
      d.data.humidity.median,
      whitespace(String(d.data.humidity.median).length),
      d.data.humidity.avg,
      whitespace(String(d.data.humidity.avg).length)
    );
  });

  //Print Average Sensor Value
  console.log(
    "Average Temp : ",
    data.averageTemperature,
    " Average Humidity : ",
    data.averageHumidity
  );
}
