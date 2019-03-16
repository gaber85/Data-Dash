import React from "react";
import { Bar, Line, Bubble, Radar } from "react-chartjs-2";

const BarGraph = props => {
  const { graphData, text, type, width, height } = props;
  const graphOptions = {
      title: {
        display: true,
        text,
        fontSize: 18
      },
      legend: {
        display: true
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      }
    }
  
  switch (type) {
    case "bar":
      return (
        <div className="chart1">
          <Bar
            data={graphData}
            width={width}
            height={height}
            options={graphOptions}
          />
        </div>
      );
    case "line":
      return (
        <div className="chart1">
          <Line
            data={graphData}
            width={width}
            height={height}
            options={graphOptions}
          />
        </div>
      );
    case "bubble":
      return (
        <div className="chart1">
          <Bubble
            data={graphData}
            width={width}
            height={height}
            options={graphOptions}
          />
        </div>
      );
    case "radar":
      return (
        <div className="chart1">
          <Radar
            data={graphData}
            width={width}
            height={height}
            options={graphOptions}
          />
        </div>
      );
    default:
      return "Loading";
  }
};

export default BarGraph;
