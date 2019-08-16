import React from 'react';
import './File.css';
import {GoFileCode} from 'react-icons/go'
import {Col} from 'react-bootstrap';

const file = (props) => {

    return (
        <Col md={1} className="FileLayout" onClick={props.clicked}>
            <GoFileCode className="File" />
            <div className="FileName">{props.name}</div>
        </Col>
    );

}

export default file;