import {Modal,Button} from 'react-bootstrap'

import React from 'react';

const customModal = (props)=>{

    const disabled = props.name===""?true:false;
    return (

          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>{props.label} : </label>
                <input type="text" value={props.name} onChange={props.handleChange} required></input>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={()=>{
                    props.handleSave(props.name)
                    props.handleClose()
                }} disabled={disabled}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        );
}

export default customModal;