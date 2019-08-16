import React from 'react';
import './Folder.css';
import {MdFolder} from 'react-icons/md';
import {Col} from 'react-bootstrap';

const folder = (props) => {

    return (
        <Col md={1} className="FolderLayout" onClick={props.clicked}>
            <MdFolder className="Folder" />
            <div className="FolderName">{props.name}</div>
        </Col>
    );

}

export default folder;