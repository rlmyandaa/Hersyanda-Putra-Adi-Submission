const fs = require("fs");
const logPath = "logs/log.json";

//======================================================================================================================================================
//============================================================ Main Program Call ========================================================================
//======================================================================================================================================================

//Check if Log already exist
if (!fs.existsSync(logPath)) {
  let data = [];
  fs.appendFileSync("logs/log.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

//Check if Log already exist, but content is empty
if (fs.existsSync(logPath) && fs.readFileSync(logPath, "utf8").length === 0) {
  let data = [];
  fs.writeFileSync("logs/log.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

//Push Data / Write Log in Every 2 Minute
let interval = 2*60;

console.log("Write in 2 Minute Push Rate")
writeLog();

setInterval(writeLog, interval*1000);

//======================================================================================================================================================
//============================================================ Main Function ========================================================================
//======================================================================================================================================================

//Function for Writing Random Dummy Log Data
function writeLog() {
  //Load current Log Data
  let log = loadLog();

  //Get Current Timestamp
  let timestamp = Date.now();

  //Create Dummy Data as an Object
  let obj = {
    timestamp: timestamp,
    roomArea1: {
      temperature: random(30, 36),
      humidity: random(60, 70),
    },
    roomArea2: {
      temperature: random(30, 36),
      humidity: random(60, 70),
    },
    roomArea3: {
      temperature: random(30, 36),
      humidity: random(60, 70),
    },
    roomArea4: {
      temperature: random(30, 36),
      humidity: random(60, 70),
    },
    roomArea5: {
      temperature: random(30, 36),
      humidity: random(60, 70),
    },
  };

  //Push new Dummy Data to Log Data
  log.push(obj);

  //Write to Logs/log.json file
  fs.writeFileSync("logs/log.json", JSON.stringify(log), (err) => {
    if (err) {
      console.error(err);
    }
  });

  //Output Log Writing Time
  console.log("Write Log : ", new Date(timestamp));
}


//======================================================================================================================================================
//============================================================ Support Function ========================================================================
//======================================================================================================================================================

//Function to Get Current Log Data
function loadLog() {
  let logContent = fs.readFileSync("logs/log.json", "utf8");
  return JSON.parse(logContent);
}

// Function to Generate Random Number in a Range
function random(low, high) {
  val = low + Math.random() * (high - low);
  return val;
}

