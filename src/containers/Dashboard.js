import React, { Component } from "react";
import moment from "moment";
import { csv } from "d3-request";
import Graph from "../components/Graph";
import jsonData from "../weatherData/data.json";
import csvData from "../weatherData/data.csv";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surfaceSeaWaterSpeedData: {},
      waveHeightAndWindSpeedData: {}
    };
  }

  componentWillMount() {
    this.getSurfaceSeaWaterSpeed();
    this.getWaveHeightAndWindSpeed();
  }

  getWaveHeightAndWindSpeed = () => {
    csv(csvData, (error, data) => {
      if (error) throw error;
      const dates = data.filter(entry => entry.sea_surface_wave_significant_height !== "null")
      this.setState({
        waveHeightAndWindSpeedData: {
          labels: dates.map(entry => moment(entry.datetime).format("MMM D, h:mm:ss a")),
          datasets: [
            {
              label: "Wave Height M",
              data: data.map(entry => entry.sea_surface_wave_significant_height)
                .filter(entry => entry !== "null")
            },
            {
              label: "Wind Speed m/s",
              data: dates.map(entry => entry.wind_speed_at_10m_above_ground_level)
                .filter(entry => entry !== undefined),
              type: "line"
            }
          ]
        }
      });
    });
  };

  getSurfaceSeaWaterSpeed = () => {
    const dates = Object.keys(jsonData).sort().map(key=> key)
      .filter(key=> jsonData[key].surface_sea_water_speed !==undefined);
    this.setState({
      surfaceSeaWaterSpeedData: {
        labels: dates.map(time =>
          moment(time).format("MMM D, h:mm:ss a")
        ),
        datasets: [
          {
            label: "Speed m/s",
            data: dates.map(key=> jsonData[key].surface_sea_water_speed)
            .filter(entry=> entry !==undefined)
          }
        ]
      }
    });
  };

  render() {
    const { surfaceSeaWaterSpeedData, waveHeightAndWindSpeedData } = this.state;
    return (
      <div>
        <Graph
          graphData={surfaceSeaWaterSpeedData}
          text="Surface Seawater Speed (Nov 7 - 14 2018)"
          type="line"
        />
        <Graph
          graphData={waveHeightAndWindSpeedData}
          text="The Impact of Wind Speed on Wave Height"
          type="bar"
        />
      </div>
    );
  }
}



export default Dashboard;
