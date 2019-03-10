import React from "react";
import { Bar, Line } from "react-chartjs-2";

const BarGraph = props => {
  const { graphData, text, type } = props;
  switch(type) {
    case 'bar':
    return (
      <div className="chart1">
        <Bar
          data={graphData}
          options={{
            title: {
              display: true,
              text
            },
            legend: {
              display: true
            }
          }}
        />
      </div>
    );
    case 'line':
    return (
      <div className="chart1">
        <Line
          data={graphData}
          options={{
            title: {
              display: true,
              text
            },
            legend: {
              display: true
            }
          }}
        />
      </div>
    );
    default:
      return 'Loading';
  }
  
};

export default BarGraph;
