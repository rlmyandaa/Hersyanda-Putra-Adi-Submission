//======================================================================================================================================================
//============================================================ Support Function ========================================================================
//======================================================================================================================================================

//Function for finding min max median average
function findMMMA(data) {
  let mmma = new Object();
  mmma.min = Math.min.apply(null, data);
  mmma.max = Math.max.apply(null, data);
  mmma.avg =
    data.reduce(function (a, b) {
      return a + b;
    }) / data.length;
  mmma.median = findMedian(data);

  return mmma;
}

//Function for finding  median data
function findMedian(data) {
  let median = null;
  //sorting rule
  data.sort(function (a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
  //If the Data Count is Even
  if (data.length % 2 === 0) {
    median = (data[data.length / 2 - 1] + data[data.length / 2]) / 2;
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

//Function to give whitespace for evenly written output
function whitespace(count) {
  tmp = "";
  for (let i = 0; i < 18 - count; i++) {
    tmp += " ";
  }
  return tmp + "|";
}

module.exports = {
  findMMMA: function (data) {
    return findMMMA(data);
  },
  whitespace: function (count) {
    return whitespace(count);
  },
};
