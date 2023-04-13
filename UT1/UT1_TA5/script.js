setTimeout(function() {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}, Math.floor(Math.random() * (12000 - 5000) + 5000))

new Chartist.Line('#traffic-chart', {
    labels: ['January', 'Februrary', 'March', 'April', 'May', 'June'],
    series: [
      [23000, 25000, 19000, 34000, 56000, 64000]
    ]
  }, {
  low: 0,
  showArea: true
});