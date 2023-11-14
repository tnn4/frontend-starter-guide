// Library used: https://www.chartjs.org/docs/latest/
import Chart from 'chart.js/auto';


let myChart;

function drawPieChart(value, maxValue) {
  const ctx = document.getElementById('countdown').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [value, maxValue - value],
          backgroundColor: ['green', 'red'],
        },
      ],
    },
    options: {
      tooltips: {
        enabled: false,
      },
      plugins: {
        datalabels: {
          backgroundColor: function (context) {
            return context.dataset.backgroundColor;
          },
          display: function (context) {
            var dataset = context.dataset;
            var value = dataset.data[context.dataIndex];
            return value > 0;
          },
          color: 'white',
        },
      },
    },
  });
}

function updateChart(chart, counter) {
  chart.data.datasets[0].data[1] = counter;
  chart.update();
}

const init = () => {
  drawPieChart(60, 60);

  let counter = 0;
  setInterval(() => {
    counter = counter + 1;
    updateChart(myChart, counter);
  }, 1000);
};

init();