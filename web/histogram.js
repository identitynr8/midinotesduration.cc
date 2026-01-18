export function drawHistogram(element, data) {
  if (!element || !data || data.length === 0) return;

  const trace = {
    x: data,
    type: 'histogram',
    marker: {
      color: '#4c74af',
    },
    nbinsx: 200
  };

  const latestValue = {
    x: [data[data.length - 1]],
    type: 'histogram',
    marker: {
      color: '#4caf6b',
    },
    nbinsx: 200
  };

  const layout = {
    xaxis: {title: {text: 'Duration (ms)'}},
    yaxis: {title: {text: '# Notes'}},
    showlegend: false,
    barmode: 'overlay'
  };

  const config = {
    editable: false,
    staticPlot: true,
  };

  Plotly.newPlot(element, [trace, latestValue], layout, config);
}
