import React, {Component} from 'react';
import './Forecast.css';
import WeatherService from "../../../services/weather.service";
import moment from 'moment';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {forecastData: []};
    }

    componentDidMount() {
        this.getForecast(this.props.place.capital, this.props.place.code);
    }

    getForecast(capital, code) {
        WeatherService.getForecast(capital, code).then((res) => {
            let forecastData = [];
            for (let i = 0; i < res.list.length; i += 4) {
                const forecast = {
                    date: res.list[i].dt_txt,
                    icon: res.list[i].weather[0].icon,
                    temp: res.list[i].main.temp,
                    desq: res.list[i].weather[0].description,
                    wind: res.list[i].wind.speed,
                    humidity: res.list[i].main.humidity,
                    winddeg: res.list[i].wind.deg,
                };
                forecastData.push(forecast);
            }
            this.setState({forecastData: forecastData});
        });
    }


    render() {
        return (
            <div className="col-sm-12" id="nopadding">
                <div className="table-responsive">
                    <table className="table table-bordered table-nover table-condensed">
                        <thead>
                        <tr>
                            <th>At (date-time)</th>
                            <th>Temperature &deg;C</th>
                            <th>Humidity</th>
                            <th>Weather Condition</th>
                            <th>Wind (m/s)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.forecastData.map((forecast, index) => {
                                return <tr key={index}>
                                    <td>{moment(forecast.date).format('LLLL')}</td>
                                    <td>{forecast.temp} &deg;C</td>
                                    <td>{forecast.humidity}</td>
                                    <td>
                                        <img src={`https://openweathermap.org/img/w/${forecast.icon}.png`}
                                             className="forecast-icon" alt="forecast"/>
                                        {forecast.desq}
                                    </td>
                                    <td>
                                        {forecast.wind}
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default Forecast;

