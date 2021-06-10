import React, {Component} from 'react';
import ListItem from './list-item/ListItem';
import './List.css';
import DataService from "../../services/data.service";
import SortingService from "../../services/sorting.service";
import UtilsService from "../../services/utils.service";
import DeleteModal from "./delete-modal/DeleteModal";
import AddModal from "./add-modal/AddModal";

const $ = window.$;

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {places: [], filteredPlaces: [], asc: false, searchText: ''};
    }

    componentDidMount() {
        this.getPlaces();
    }

    getPlaces() {
        DataService.getAll().then((places) => {
            this.setState({places}, () => this.filterPlaces(this.state.searchText));
        })
    }

    handleDelete = (e) => {
        if (e) {
            this.getPlaces();
        }
    }

    handleDataChange = (currentPlace) => {
        const places = this.state.places.map(place => {
            if (place.id === currentPlace.id) {
                return currentPlace;
            }
            return place;
        })
        this.setState({places}, () => this.filterPlaces(this.state.searchText));
    }

    deleteMultiple = (e) => {
        if (e) {
            let deletePlacesIds = this.state.places.filter((place) => place.del).map((place) => place.id);
            DataService.deleteMultiplePlaces(deletePlacesIds).then(() => {
                $('#deleteModal').modal('hide');
                this.getPlaces();
            });
        }
    }

    handleAddPlace = (place) => {
        const places = [...this.state.places];
        places.push(place);
        this.setState({places}, () => this.filterPlaces(this.state.searchText));
    }

    sort(column) {
        let sortedPlaces = SortingService.sort(this.state.filteredPlaces, column, this.state.asc);
        this.setState({asc: !this.state.asc, filteredPlaces: sortedPlaces})
    }

    filterPlaces(value) {
        let filtered = UtilsService.filterArray(this.state.places, value);
        this.setState({searchText: value, filteredPlaces: filtered});
    }

    render() {
        return (
            <div>
                <div className="col-sm-12" id="head">
                    <form>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="button-group">
                                    <button type="button" className="btn btn-default" data-toggle="modal"
                                            data-target="#deleteModal">Delete
                                    </button>
                                    <button type="button" className="btn btn-default ml-10" data-toggle="modal"
                                            data-target="#addModal">Add place
                                    </button>
                                </div>
                                <div className="input-group-addon"><i className="fas fa-search">&nbsp;</i></div>
                                <input type="text" name="searchCity"
                                       onChange={(event) => this.filterPlaces(event.target.value)}
                                       className="form-control"
                                       placeholder="Search City"/>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-sm-12" id="nopadding">
                    <div className="table-responsive">
                        <table className="capitals-table table table-bordered table-nover table-condensed">
                            <thead>
                            <tr>
                                <th className="text-center">
                                </th>
                                <th id={"capital"} onClick={() => this.sort("capital")}>
                                    Capital
                                    <i className="fas fa-caret-down ml-10">&nbsp;</i>
                                    <i className="fas fa-caret-up ml-10">&nbsp;</i>
                                </th>
                                <th id={"temp"} onClick={() => this.sort("temp")}>
                                    Temperature &deg;C
                                    <i className="fas fa-caret-down ml-10">&nbsp;</i>
                                    <i className="fas fa-caret-up ml-10">&nbsp;</i>
                                </th>
                                <th id={"desq"} onClick={() => this.sort("desq")}>
                                    Weather Condition
                                    <i className="fas fa-caret-down ml-10">&nbsp;</i>
                                    <i className="fas fa-caret-up ml-10">&nbsp;</i>
                                </th>
                                <th className="text-center" id={"status"}>
                                    <div className="dropdown">
                                        <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-ellipsis-v">&nbsp;</i>
                                            <i className="fas fa-caret-down ml-10 sorting-icon">&nbsp;</i>
                                            <i className="fas fa-caret-up ml-10 sorting-icon">&nbsp;</i>
                                        </div>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <button type="button" className="dropdown-item"
                                                    onClick={() => this.sort("status")}>Sort by status
                                            </button>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.filteredPlaces.map(place => <ListItem key={place.id}
                                                                                 onDelete={this.handleDelete}
                                                                                 onDataChange={this.handleDataChange}
                                                                                 place={place}/>)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <DeleteModal confirmDelete={this.deleteMultiple}/>
                <AddModal onAddPlace={this.handleAddPlace}/>
            </div>
        );
    }
}

export default List;
