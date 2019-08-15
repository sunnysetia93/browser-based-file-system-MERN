import React from 'react';
import './Navbar.css';
import {Row} from 'react-bootstrap';
const navbar = (props) => {
    const parentFolderName = props.parentFolder==null?<p>Root</p>:props.parentFolder.name
    return (
        <Row className="Navbar">
            {parentFolderName}
        </Row>
    )

}

export default navbar;