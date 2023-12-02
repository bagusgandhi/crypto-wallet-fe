export const chartOptions = (series: Array<any>) => ({
    series: [{
      name: 'transfer',
      data: series ? series[0]['data'].map((data: Array<any>) => data[0]) : []
    }, {
      name: 'topup',
      data: series ? series[1]['data'].map((data: Array<any>) => data[0]) : []
    }],
    chart: {
      height: 450,
      type: 'line'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      lineCap: 'butt',
      width: 2
    },
    xaxis: {
      type: 'datetime',
      categories: series ? [...series[0]['data'].map((data: Array<any>) => data[1]), ...series[1]['data'].map((data: Array<any>) => data[1])] : []
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    colors: ['#f07f06', '#bce8ad'],
  });