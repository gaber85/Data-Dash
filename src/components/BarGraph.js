import React from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = props => {
  const { graphData, text } = props;

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
};

export default BarGraph;
