import React from 'react';
import './Navbar.css';
import {Row,Col} from 'react-bootstrap';
import {IoIosArrowBack} from 'react-icons/io'
const navbar = (props) => {
    const folderName = (props.currentFolder==null||props.currentFolder=="")?"Root":props.currentFolder
    return (
        <Row className="Navbar">
            <Col md={6}>
                <div className="BackLogo" onClick={props.clicked}><IoIosArrowBack /></div>
                <div className="CurrFolderName">{folderName}</div>
            </Col>
            <Col>
            </Col>
            <Col md={4}>
                
            </Col>
        </Row>
    )

}

export default navbar;