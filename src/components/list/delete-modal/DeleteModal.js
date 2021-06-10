import React, {Component} from 'react';
import './DeleteModal.css';

class DeleteModal extends Component {

    delPlaces = () => {
        this.props.confirmDelete(true);
    }

    render() {
        return (
            <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Delete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                Delete marked places?
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            <button type="button" className="btn" onClick={() => this.delPlaces()}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteModal;
