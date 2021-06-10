import React, {Component} from 'react';
import './Place.css';
import DataService from "../../services/data.service";
import {
    Switch,
    Route, Link
} from "react-router-dom"
import Forecast from "./forecast/Forecast";
import Map from "./map/Map";

class Place extends Component {
    constructor(props) {
        super(props);
        const {params = {}, url = ''} = this.props.match
        this.state = {placeId: params.id, url: url, place: null};
    }

    componentDidMount() {
        this.getPlace();
    }

    getPlace() {
        DataService.getPlace(this.state.placeId).then((res) => {
            this.setState({place: res});
        })
    }

    render() {
        const { place, url } = this.state;
        if (place && url) {
            return (
                <div>
                    <div className="col-sm-12" id="head">
                        <Link to={'/'}>
                            <button type="button" className="btn btn-default">
                                Home Page
                            </button>
                        </Link>
                        <h1 className="item-title">
                            {place.capital} , {place.code}
                        </h1>
                        <div className="button-group">
                            <Link to={`${url}/forecast`}>
                                <button type="button" className="btn btn-default child-route">
                                    Forecast
                                </button>
                            </Link>
                            <Link to={`${url}/map`}>
                                <button type="button" className="btn btn-default child-route ml-10">
                                    Map
                                </button>
                            </Link>
                        </div>
                    </div>
                    <Switch>
                        <Route path={`${url}/forecast`}
                               render={(props) => <Forecast {...props} place={place}/>}></Route>
                        <Route path={`${url}/map`}
                               render={(props) => <Map {...props} place={place} />}></Route>
                    </Switch>
                </div>
            );
        }
        return <div>Loading...</div>
    }
}

export default Place;
