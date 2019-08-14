import React from 'react';
import './Folder.css';
import {Col} from 'react-bootstrap';

const folder = (props) => {

    return (
        <Col md={1} className="FolderLayout" onClick={props.clicked}>
            <div className="Folder">
            </div>
            <p className="FolderName">{props.name}</p>
        </Col>
    );

}

export default folder;