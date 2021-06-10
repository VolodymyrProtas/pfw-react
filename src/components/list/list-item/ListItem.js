import React, {Component} from 'react';
import WeatherService from "../../../services/weather.service";
import DataService from "../../../services/data.service";
import './ListItem.css';
import { Link } from 'react-router-dom';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {rowClass: ''};
    }

    componentDidMount() {
        this.getCurrentWeather(this.props.place.capital, this.props.place.code);
    }

    getCurrentWeather(capital, code) {
        WeatherService.getCurrentWeather(capital, code).then((res) => {
            const place = {
                ...this.props.place,
                icon: res.weather[0].icon,
                desq: res.weather[0].description,
                temp: res.main.temp
            }
            this.handleDataChange(place);
            this.getClassNames(place);
        });
    }

    handleVisit(place) {
        let currentPlace = {...place};
        currentPlace.status = 1;
        this.updatePlace(currentPlace);
    }

    handleVisited(place) {
        let currentPlace = {...place};
        currentPlace.status = 2;
        this.updatePlace(currentPlace);
    }

    updatePlace(place) {
        DataService.updatePlace(place, place.id).then((res) => {
            this.handleDataChange(res);
            this.getClassNames(res);
        });
    }

    handleDelete(place) {
        DataService.deletePlace(place.id).then(() => {
            this.props.onDelete(true);
        });
    }

    handleDataChange(place) {
        this.props.onDataChange(place);
    }

    getClassNames(place) {
        let rowClass = '';
        if (place.status === 1) {
            rowClass = 'visit';
        } else if (place.status === 2) {
            rowClass = 'visited';
        }
        this.setState({rowClass})
    }

    handleSelect(value) {
        const place = {
            ...this.props.place,
            del: value
        }
        this.handleDataChange(place);
    }

    render() {
        return (
            <tr className={this.state.rowClass}>
                <td className="text-center">
                    <input type="checkbox" className="taskCheckbox" onChange={(event) => this.handleSelect(event.target.checked)} checked={this.props.place.del}/>
                </td>
                <td><Link to={'/' + this.props.place.id}>{this.props.place.capital}, {this.props.place.code}</Link></td>
                <td>{this.props.place.temp}  &deg;C</td>
                <td>
                    { this.props.place.icon ? <img src={`https://openweathermap.org/img/w/${this.props.place.icon}.png`}
                        className="forecast-icon" alt="forecast"/> : ''
                    }
                    {this.props.place.desq}</td>
                <td className="text-center">
                    <div className="dropdown">
                        <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button" onClick={() => this.handleVisit(this.props.place)}>Visit
                            </button>
                            <button className="dropdown-item" type="button" onClick={() => this.handleVisited(this.props.place)}>Visited
                            </button>
                            <button className="dropdown-item" type="button" onClick={() => this.handleDelete(this.props.place)}>Delete
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}

export default ListItem;
