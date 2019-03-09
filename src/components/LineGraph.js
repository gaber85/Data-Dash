import React from "react";
import { Line } from "react-chartjs-2";

const LineGraph = props => {
  const { graphData, text } = props;

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
};

export default LineGraph;
