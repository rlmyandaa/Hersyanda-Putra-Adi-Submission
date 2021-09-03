var http = require("http");
const fs = require("fs");
const logPath = "logs/log.json";
var url = require("url");

//======================================================================================================================================================
//============================================================ Main Program Call ========================================================================
//======================================================================================================================================================

// Start Server
http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    //Root Folder for Data Visualization
    var filename = "./dataVisualization" + q.pathname;

    //Routes

    //API Routes
    if (String(q.pathname) === "/api") {
      //Filter by Data Endpoint Type
      if (q.query.endpoint === "realtime") {
        let data = getLatestData(q.query.room, q.query.data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(data);
        return res.end();
      }
      if (q.query.endpoint === "historic") {
        let data = getHistoricData();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(data);
        return res.end();
      }
    } else {
      //Return File Directly (Non API)
      fs.readFile(filename, function (err, data) {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080);

console.log("Server Started at 127.0.0.1:8000");

//Open When Server Start
const open = require("open");
const { time } = require("console");
(async () => {
  await open("http://127.0.0.1:8080/problem-3_realTimeStream.html");
})();

//======================================================================================================================================================
//============================================================ Main Function ========================================================================
//======================================================================================================================================================

//Function to Get Latest Data
function getLatestData(dataKind) {
  let jsonData = JSON.parse(fs.readFileSync("logs/log.json", "utf8"));
  return JSON.stringify(jsonData[jsonData.length - 1]);
}

//Function to Get Historic Data, Limited to last 1000 data @2 minutes push delay
function getHistoricData() {
  let jsonData = JSON.parse(fs.readFileSync("logs/log.json", "utf8"));
  let result = {
    roomArea1: {
      temperature_data: jsonData
        .map((data) => data.roomArea1)
        .map((r) => r.temperature)
        .slice(-1000),
      humidity_data: jsonData
        .map((data) => data.roomArea1)
        .map((r) => r.humidity)
        .slice(-1000),
    },
    roomArea2: {
      temperature_data: jsonData
        .map((data) => data.roomArea2)
        .map((r) => r.temperature)
        .slice(-1000),
      humidity_data: jsonData
        .map((data) => data.roomArea2)
        .map((r) => r.humidity)
        .slice(-1000),
    },
    roomArea3: {
      temperature_data: jsonData
        .map((data) => data.roomArea3)
        .map((r) => r.temperature)
        .slice(-1000),
      humidity_data: jsonData
        .map((data) => data.roomArea3)
        .map((r) => r.humidity)
        .slice(-1000),
    },
    roomArea4: {
      temperature_data: jsonData
        .map((data) => data.roomArea4)
        .map((r) => r.temperature)
        .slice(-1000),
      humidity_data: jsonData
        .map((data) => data.roomArea4)
        .map((r) => r.humidity)
        .slice(-1000),
    },
    roomArea5: {
      temperature_data: jsonData
        .map((data) => data.roomArea5)
        .map((r) => r.temperature)
        .slice(-1000),
      humidity_data: jsonData
        .map((data) => data.roomArea5)
        .map((r) => r.humidity)
        .slice(-1000),
    },
    timestamp: jsonData
      .map((data) => new Date(data.timestamp).toISOString())
      .slice(-1000),
  };
  return JSON.stringify(result);
}
