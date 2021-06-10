import React, {Component} from 'react';
import './AddModal.css';
import DataService from "../../../services/data.service";

const google = window.google;
const $ = window.$;


class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {capital: ''}
    }

    changeCapital = (value) => {
        this.setState({capital: value})
    }

    addPlace = () => {
        if (this.state.capital) {
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode({'address': this.state.capital},
                (results, status) => {
                    if (status === 'OK') {
                        for (let i = 0; i < results[0].address_components.length; i++) {
                            if ((results[0].address_components[i].types[0] === 'country') && (results[0].address_components[i].types[1] === 'political') &&
                                (results[0].address_components[i].short_name.length === 2)) {

                                let placeDTO = {
                                    capital: results[0].address_components[0].long_name,
                                    code: results[0].address_components[i].short_name,
                                    del: false,
                                    temp: null,
                                    desq: '',
                                    status: 0
                                }
                                DataService.addPlace(placeDTO).then((res) => {
                                    this.onAddPlaceSuccess(res);
                                });
                            }
                        }
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
        }
    }

    onAddPlaceSuccess(place) {
        this.props.onAddPlace(place);
        $('#addModal').modal('hide');
        this.setState({capital: ''})
    }

    render() {
        return (
            <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="addModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLabel">Add place</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="capital-name" className="col-form-label">City:</label>
                                    <input type="text" className="form-control" id="capital-name"
                                           name="capital-name" onChange={(event) => this.changeCapital(event.target.value)} value={this.state.capital} placeholder=" New York"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.addPlace()}>Add place</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddModal;
