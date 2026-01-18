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

  const layout = {
    xaxis: {
      title: 'Duration (ms)',
      automargin: true
    },
    responsive: true
  };

  const config = {
    responsive: true,
    displayModeBar: false
  };

  Plotly.newPlot(element, [trace], layout, config);
}
