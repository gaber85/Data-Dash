import React, { Component } from "react";
import moment from "moment";
import LineGraph from "../components/LineGraph";
import jsonData from "../weatherData/data.json";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    this.getSurfaceSeaWaterSpeed();
  }

  async getSurfaceSeaWaterSpeed() {
    const surfaceSeaWaterSpeed = [];
    Object.keys(jsonData)
      .sort()
      .forEach(key => {
        if (key && jsonData[key].surface_sea_water_speed) {
          surfaceSeaWaterSpeed.push({
            key,
            value: jsonData[key].surface_sea_water_speed
          });
        }
      });
    await this.setState({
      data: {
        labels: surfaceSeaWaterSpeed.map(entry =>
          moment(entry.key).format("MMM D, h:mm:ss a")
        ),
        datasets: [
          {
            label: "Speed m/s",
            data: surfaceSeaWaterSpeed.map(entry => entry.value)
          }
        ]
      }
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <LineGraph
          graphData={data}
          text="Surface Seawater Speed (Nov 7 - 14 2018)"
        />
      </div>
    );
  }
}

export default Dashboard;
