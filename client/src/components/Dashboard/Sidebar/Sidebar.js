import React,{Component} from 'react';
import Modal from '../../Modal/Modal'
import {Button,Row} from 'react-bootstrap';
import {GiEuropeanFlag} from 'react-icons/gi'
import './Sidebar.css';

class Sidebar extends Component {

    state = {
        folderModalShow:false,
        fileModalShow:false,
        folderName:"",
        fileName:""
    }

    toggleStatus = (index)=>{
        if(index===0)
            this.setState({
                folderModalShow:true
            })
        else
            this.setState({
                fileModalShow:true
            })
    }
    closeModal = (index)=>{
        if(index===0)
            this.setState({
                folderModalShow:false
            })
        else
            this.setState({
                fileModalShow:false
        })
    }

    nameChange = (index,e)=>{
        if(index===0)
            this.setState({
                folderName:e.target.value
            })
        else
            this.setState({
                fileName:e.target.value
        })
    }
        
    render(){

        return (
            <div className="Sidebar">
                <Row className="Logo">
                    <GiEuropeanFlag className="LogoPulse" />
                </Row>
                <Row className="ButtonRow">
                    <Button className="SidebarButton" variant="outline-secondary" onClick={()=>this.toggleStatus(0)}>Create Folder</Button>
                    <Button className="SidebarButton" variant="outline-secondary" onClick={()=>this.toggleStatus(1)}>Create File</Button>
                </Row>
                <Modal 
                    show={this.state.folderModalShow} 
                    handleSave={this.props.addFolder}
                    title="Create New Folder"
                    label="Enter Folder Name"
                    name={this.state.folderName}
                    handleChange={(value)=>this.nameChange(0,value)}
                    handleClose={()=>this.closeModal(0)} />
                <Modal 
                    show={this.state.fileModalShow} 
                    handleSave={this.props.addFile}
                    title="Create New Text File"
                    label="Enter File Name"
                    name={this.state.fileName}
                    handleChange={(value)=>this.nameChange(1,value)}
                    handleClose={()=>this.closeModal(1)} />
            </div>
        );
    }
}

export default Sidebar;