function getLatestData() {
  var tmp = null;
  $.ajax({
    async: false,
    type: "GET",
    url: "http://127.0.0.1:8080/api?endpoint=realtime&data=temperature&room=1",
    success: function (data) {
      tmp = data;
    },
  });
  return tmp;
}

const tempConfig = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Room Area 1",
        data: [],
        backgroundColor: "rgb(38, 70, 83)",
        borderColor: "rgb(38, 70, 83)",
        pointRadius: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
      {
        label: "Room Area 2",
        data: [],
        backgroundColor: "rgb(42, 157, 143)",
        borderColor: "rgb(42, 157, 143)",
        pointRadius: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
      {
        label: "Room Area 3",
        data: [],
        backgroundColor: "rgb(233, 196, 106)",
        borderColor: "rgb(233, 196, 106)",
        pointRadius: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
      {
        label: "Room Area 4",
        data: [],
        backgroundColor: "rgb(244, 162, 97)",
        borderColor: "rgb(244, 162, 97)",
        pointRadius: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
      {
        label: "Room Area 5",
        data: [],
        backgroundColor: "rgb(231, 111, 81)",
        borderColor: "rgb(231, 111, 81)",
        pointRadius: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
    ],
  },
  options: {
    
    scales: {
      x: {
        type: "realtime",
        realtime: {
          duration: 180000,
          refresh: 5000,
          delay: 1000, 
          ttl: undefined,
          frameRate: 10,

          // a callback to update datasets
          onRefresh: (chart) => {
            console.log(chart.data.datasets[0].data);
            // query your data source and get the array of {x: timestamp, y: value} objects
            let newData = getLatestData();
            // // append the new data array to the existing chart data
            chart.data.datasets[0].data.push({
              x: Date.now(),
              y: newData.roomArea1.temperature,
            });
            chart.data.datasets[1].data.push({
              x: Date.now(),
              y: newData.roomArea2.temperature,
            });
            chart.data.datasets[2].data.push({
              x: Date.now(),
              y: newData.roomArea3.temperature,
            });
            chart.data.datasets[3].data.push({
              x: Date.now(),
              y: newData.roomArea4.temperature,
            });
            chart.data.datasets[4].data.push({
              x: Date.now(),
              y: newData.roomArea5.temperature,
            });
          },
        },
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 50,
      },
      
    },
  },
};
const humidityConfig = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Room Area 1",
        data: [],
        backgroundColor: "rgb(38, 70, 83)",
        borderColor: "rgb(38, 70, 83)",
        pointRadius: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
      {
        label: "Room Area 2",
        data: [],
        backgroundColor: "rgb(42, 157, 143)",
        borderColor: "rgb(42, 157, 143)",
        pointRadius: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
      {
        label: "Room Area 3",
        data: [],
        backgroundColor: "rgb(233, 196, 106)",
        borderColor: "rgb(233, 196, 106)",
        pointRadius: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
      {
        label: "Room Area 4",
        data: [],
        backgroundColor: "rgb(244, 162, 97)",
        borderColor: "rgb(244, 162, 97)",
        pointRadius: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
      {
        label: "Room Area 5",
        data: [],
        backgroundColor: "rgb(231, 111, 81)",
        borderColor: "rgb(231, 111, 81)",
        pointRadius: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "realtime",
        realtime: {
          duration: 180000,
          refresh: 5000,
          delay: 1000, 
          ttl: undefined, // data will be automatically deleted as it disappears off the chart
          frameRate: 10,

          // a callback to update datasets
          onRefresh: (chart) => {
            console.log(chart.data.datasets[0].data);
            // query your data source and get the array of {x: timestamp, y: value} objects
            let newData = getLatestData();
            // // append the new data array to the existing chart data
            chart.data.datasets[0].data.push({
              x: Date.now(),
              y: newData.roomArea1.humidity,
            });
            chart.data.datasets[1].data.push({
              x: Date.now(),
              y: newData.roomArea2.humidity,
            });
            chart.data.datasets[2].data.push({
              x: Date.now(),
              y: newData.roomArea3.humidity,
            });
            chart.data.datasets[3].data.push({
              x: Date.now(),
              y: newData.roomArea4.humidity,
            });
            chart.data.datasets[4].data.push({
              x: Date.now(),
              y: newData.roomArea5.humidity,
            });
          },
        },
      },
      y: {
        suggestedMin: 30,
        suggestedMax: 100,
      },
    },
  },
};
const tempChart = new Chart(document.getElementById("tempChart"), tempConfig);
const humidityChart = new Chart(
  document.getElementById("humidityChart"),
  humidityConfig
);
