import React, { Component } from "react";
import moment from "moment";
import { csv } from "d3-request";
import BarGraph from "../components/BarGraph";
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
      this.setState({
        waveHeightAndWindSpeedData: {
          labels: data.filter(entry => entry.sea_surface_wave_significant_height !== "null")
            .map(entry => moment(entry.datetime).format("MMM D, h:mm:ss a")),
          datasets: [
            {
              label: "Wave Height M",
              data: data.map(entry => entry.sea_surface_wave_significant_height)
                .filter(entry => entry !== "null")
            },
            {
              label: "Wind Speed m/s",
              data: data.filter(entry => entry.sea_surface_wave_significant_height !== "null")
                .map(entry => entry.wind_speed_at_10m_above_ground_level)
                .filter(entry => entry !== undefined),
              type: "line"
            }
          ]
        }
      });
    });
  };

  getSurfaceSeaWaterSpeed = () => {
    const timeStamp = Object.keys(jsonData).sort().map(key=> key)
      .filter(key=> jsonData[key].surface_sea_water_speed !==undefined);
    this.setState({
      surfaceSeaWaterSpeedData: {
        labels: timeStamp.map(entry =>
          moment(entry.key).format("MMM D, h:mm:ss a")
        ),
        datasets: [
          {
            label: "Speed m/s",
            data: timeStamp.map(key=> jsonData[key].surface_sea_water_speed)
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
        <BarGraph
          graphData={surfaceSeaWaterSpeedData}
          text="Surface Seawater Speed (Nov 7 - 14 2018)"
        />
        <BarGraph
          graphData={waveHeightAndWindSpeedData}
          text="The Impact of Wind Speed on Wave Height"
        />
      </div>
    );
  }
}

export default Dashboard;
