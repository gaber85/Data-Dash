import React, { Component } from "react";
import moment from "moment";
import { csv } from "d3-request";
import styled from "@emotion/styled";
import Graph from "../components/Graph";
import jsonData from "../weatherData/data.json";
import csvData from "../weatherData/data.csv";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surfaceSeaWaterSpeedData: {},
      waveHeightAndWindSpeedData: {},
      windDirectionAndSpeedData: {},
      dailyAirTemperature: {},
    };
  }

  componentDidMount() {
    this.getSurfaceSeaWaterSpeed();
    this.getWaveHeightAndWindSpeed();
    this.getWindDirectionAndSpeed();
    this.getDailyAirTemperature();
  }

  getWaveHeightAndWindSpeed = () => {
    // takes data from the csv files and sets the state in the graph format
    csv(csvData, (error, data) => {
      if (error) throw error;
      const dates = data.filter(entry => entry.sea_surface_wave_significant_height !== "null")
      this.setState({
        waveHeightAndWindSpeedData: {
          labels: dates.map(entry => moment(entry.datetime).format("MMM D, h:mm a")),
          datasets: [
            {
              label: "Wave Height M",
              data: data.map(entry => entry.sea_surface_wave_significant_height)
                .filter(entry => entry !== "null"),
              backgroundColor: '#2c82c9'
            },
            {
              label: "Wind Speed m/s",
              data: dates.map(entry => entry.wind_speed_at_10m_above_ground_level)
                .filter(entry => entry !== undefined),
              type: "line",
              borderColor: '#3498db',
              pointBackgroundColor: '#ecf0f1',
              backgroundColor: '#c5eff7'
            }
          ]
        }
      });
    });
  };

  getSurfaceSeaWaterSpeed = () => {
    // takes data from the json file and converts it to graph usable format
    const dates = Object.keys(jsonData).sort().map(key=> key)
      .filter(key=> jsonData[key].surface_sea_water_speed !==undefined);
    this.setState({
      surfaceSeaWaterSpeedData: {
        labels: dates.map(time =>
          moment(time).format("MMM D, h:mm a")
        ),
        datasets: [
          {
            label: "Speed m/s",
            data: dates.map(key=> jsonData[key].surface_sea_water_speed)
            .filter(entry=> entry !==undefined),
            backgroundColor: '#f1a9a0'
          }
        ]
      }
    });
  };

  getWindDirectionAndSpeed = () => {
    const dataPoints = [];
    csv(csvData, (error, data) => {
      if (error) throw error;
      data.forEach(entry => {
        const obj = {
          x: entry.wind_speed_at_10m_above_ground_level,
          y: entry.wind_from_direction_at_10m_above_ground_level,
          r: 4
        }
        dataPoints.push(obj);
      })
      this.setState({
        windDirectionAndSpeedData: {
          labels: data.map(entry => moment(entry.datetime).format("MMM D, h:mm a")),
          datasets: [
            {
              label: "Wind Direction",
              data: dataPoints,
              backgroundColor: '#7befb2',
              borderColor: '#3fc380',
              hoverBackgroundColor: '#f1a9a0'
            },
          ]
        }
      });
    });
  }

  getDailyAirTemperature = () => {
    const day = [];
    csv(csvData, (error, data) => {
      if (error) throw error;
      data.forEach(entry=> {
        if (day.indexOf(moment(entry.datetime).format('dddd')) === -1) day.push(moment(entry.datetime).format('dddd'));
      });
      this.setState({
        dailyAirTemperature: {
          labels: day,
          datasets: [
            {
              label: "Daily Temperature",
              data: data.map(entry => Math.floor(entry.air_temperature_at_2m_above_ground_level-273.15))
              .filter(entry=> entry !==undefined),
              backgroundColor: 'rgba(25, 181, 254, 0.2)',
              borderColor: '#19b5fe',
              pointBackgroundColor: '#ecf0f1'
            }
          ]
        }
      });
    })
  }

  render() {
    const { surfaceSeaWaterSpeedData, waveHeightAndWindSpeedData, windDirectionAndSpeedData, dailyAirTemperature } = this.state;
    return (
      <GraphContainer className='graph-container '>
        <div className='wave-height-wind-speed-graph'>
          <Graph
            graphData={waveHeightAndWindSpeedData}
            text="The Impact of Wind Speed on Wave Height"
            type="bar"
            width={900}
            height={400}
          />
        </div>
        <WaterSpeedGraph className='water-speed-graph'>
          <div>
            <Graph
              graphData={surfaceSeaWaterSpeedData}
              text="Surface Seawater Speed (Nov 7 - 14 2018)"
              type="bar"
              width={375}
              height={275}
            />
          </div>
          <div>
            <Graph
              graphData={windDirectionAndSpeedData}
              text="Wind Direction and Speed"
              type="bubble"
              width={375}
              height={275}
            />
          </div>
        </WaterSpeedGraph>
        <div className='wave-height-wind-speed-graph'>
          <Graph
            graphData={dailyAirTemperature}
            text="Daily Temperature Frequency"
            type="radar"
            width={900}
            height={400}
          />
          </div>
      </GraphContainer>
      
    );
  }
}

const GraphContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ecf0f1;
`

const WaterSpeedGraph = styled('div')`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

export default Dashboard;
