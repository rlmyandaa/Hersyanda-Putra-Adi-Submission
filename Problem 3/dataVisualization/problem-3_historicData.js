function getHistoricData() {
  var tmp = null;
  $.ajax({
    async: false,
    type: "GET",
    url: "http://127.0.0.1:1212/api?endpoint=historic",
    success: function (data) {
      tmp = data;
    },
  });
  return tmp;
}

let historicData = getHistoricData();

const tempConfig = {
  type: "line",
  data: {
    labels: historicData.timestamp,
    datasets: [
      {
        label: "Room Area 1",
        data: historicData.roomArea1.temperature_data,
        backgroundColor: "rgb(38, 70, 83)",
        borderColor: "rgb(38, 70, 83)",
        pointRadius: 1,
      },
      {
        label: "Room Area 2",
        data: historicData.roomArea2.temperature_data,
        backgroundColor: "rgb(42, 157, 143)",
        borderColor: "rgb(42, 157, 143)",
        pointRadius: 1,
      },
      {
        label: "Room Area 3",
        data: historicData.roomArea3.temperature_data,
        backgroundColor: "rgb(233, 196, 106)",
        borderColor: "rgb(233, 196, 106)",
        pointRadius: 1,
      },
      {
        label: "Room Area 4",
        data: historicData.roomArea4.temperature_data,
        backgroundColor: "rgb(244, 162, 97)",
        borderColor: "rgb(244, 162, 97)",
        pointRadius: 1,
      },
      {
        label: "Room Area 5",
        data: historicData.roomArea5.temperature_data,
        backgroundColor: "rgb(231, 111, 81)",
        borderColor: "rgb(231, 111, 81)",
        pointRadius: 1,
      },
    ],
  },
  options: {
    animation: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
        },
      },
      y: {
        suggestedMin: 15,
        suggestedMax: 50,
      },
    },
  },
};
const humidityConfig = {
  type: "line",
  data: {
    labels: historicData.timestamp,
    datasets: [
      {
        label: "Room Area 1",
        data: historicData.roomArea1.humidity_data,
        backgroundColor: "rgb(38, 70, 83)",
        borderColor: "rgb(38, 70, 83)",
        pointRadius: 1,
      },
      {
        label: "Room Area 2",
        data: historicData.roomArea2.humidity_data,
        backgroundColor: "rgb(42, 157, 143)",
        borderColor: "rgb(42, 157, 143)",
        pointRadius: 1,
      },
      {
        label: "Room Area 3",
        data: historicData.roomArea3.humidity_data,
        backgroundColor: "rgb(233, 196, 106)",
        borderColor: "rgb(233, 196, 106)",
        pointRadius: 1,
      },
      {
        label: "Room Area 4",
        data: historicData.roomArea4.humidity_data,
        backgroundColor: "rgb(244, 162, 97)",
        borderColor: "rgb(244, 162, 97)",
        pointRadius: 1,
      },
      {
        label: "Room Area 5",
        data: historicData.roomArea5.humidity_data,
        backgroundColor: "rgb(231, 111, 81)",
        borderColor: "rgb(231, 111, 81)",
        pointRadius: 1,
      },
    ],
  },
  options: {
    animation: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
        },
      },
      y: {
        suggestedMin: 50,
        suggestedMax: 85,
      },
    },
  },
};
const tempChart = new Chart(document.getElementById("tempChart"), tempConfig);
const humidityChart = new Chart(
  document.getElementById("humidityChart"),
  humidityConfig
);
