import React from 'react';
import './File.css';
import {Col} from 'react-bootstrap';

const file = (props) => {

    return (
        <Col md={1} className="FileLayout" onClick={props.clicked}>
            <div className="File">
            </div>
            <p className="FileName">{props.name}</p>
        </Col>
    );

}

export default file;