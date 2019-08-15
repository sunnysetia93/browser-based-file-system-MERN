import React, {Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import axios from '../../hoc/custom-axios';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import Folder from '../Folder/Folder';
import File from '../File/File';
import Modal from '../Modal/Modal';

import {Row,Button} from 'react-bootstrap';

import './Dashboard.css'

class Dashboard extends Component {
    state = {
        folders : [],
        files : [],
        parentFolder: null,
        currentFolderId:null,
        renameModalShow:false,
        rename:"",
        renameId:null,
        renameFileType:null
    }
    componentDidMount(){
        axios.get('/folder')
            .then((response)=>{
                const {folders,files} = response.data;
                this.setState({
                    folders:folders,
                    files:files,
                    parentFolder:null,
                    currentFolderId:null
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }

    onClickFolder = (id)=>{
        const folder = this.state.folders.filter(folder=>folder._id===id);
        const parentFolder = folder[0]._parentFolder;
        axios.get('/folder/'+id)
            .then((response)=>{
                const {folders,files} = response.data;
                this.setState({
                    folders:folders,
                    files:files,
                    parentFolder:parentFolder,
                    currentFolderId:id
                })

            })
            .catch(err=>{
                console.log(err);
            })
    }

    backClickHandler = ()=>{

        const pId = this.state.parentFolder==null?"":this.state.parentFolder._id
        axios.get('/folder/'+pId)
            .then((response)=>{
                const {folders,files} = response.data;
                const parentFolder = (this.state.parentFolder!=null)?this.state.parentFolder._parentFolder:null;
                
                this.setState({
                    folders:folders,
                    files:files,
                    parentFolder:parentFolder,
                    currentFolderId:pId===""?null:pId
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }

    onAddFolderHandler = (folderName)=>{
        const newFolder = {
            parentId:this.state.currentFolderId,
            name:folderName
        }
        axios.post('/folder',newFolder)
            .then((response)=>{
                const updatedFolders = this.state.folders.concat(response.data);
                this.setState({
                    folders:updatedFolders
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }

    onAddFileHandler = (fileName)=>{
        const newFile = {
            parentId:this.state.currentFolderId,
            name:fileName,
            extension:".txt",
            fileType:"text",
            content:"sample data"
        }
        axios.post('/file',newFile)
            .then((response)=>{
                const updatedFiles = this.state.files.concat(response.data);
                this.setState({
                    files:updatedFiles
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }

    onRenameClickHandler = (id,type)=>{
        console.log("rename handler");
        console.log(id,type);
        this.setState({
            renameModalShow:true,
            renameId:id,
            renameFileType:type
        })
    }
    onRenameSaveHandler = ()=>{
        if(this.state.renameFileType==="file"){
            axios.put('/',{updatedName:this.state.rename,id:id})
                .then(response=>{
                    const updatedFiles = this.state.files.map(file=>{
                        // if(file.)
                    })
                })
        }
        else if(this.state.renameFileType==="folder"){

        }
    }
    onDeleteClickHandler = (id,type)=>{
        const body={
            id:id
        }
        if(type==="file"){
            axios.delete("/file",{data:body})
                .then((response)=>{
                    const updatedFiles = this.state.files.filter(file=>file._id!=id);
                    console.log(updatedFiles);
                    this.setState({
                        files:updatedFiles
                    })
                })            
                .catch(err=>{
                    console.log(err);
                })
        }
        else if(type==="folder"){
            axios.delete("/folder",{data:body})
                .then(response=>{
                    const updatedFolders = this.state.folders.filter(folder=>folder._id!=id);
                    console.log(updatedFolders);
                    this.setState({
                        folders:updatedFolders
                    })
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    }
    closeModal = ()=>{
        this.setState({
            renameModalShow:false
        })
    }

    nameChange = (e)=>{
        this.setState({
            rename:e.target.value
        })
    }

    render(){

        let updatedFolders = null;
        let updatedFiles = null;
        const updatedFilesFolders = [];
        if(this.state.folders){
            updatedFolders = this.state.folders.map(folder=>{
                return (
                    <React.Fragment key={folder._id}>
                        <ContextMenuTrigger  id={folder._id}>
                                <Folder  name={folder.name} clicked={()=>this.onClickFolder(folder._id)}/>
                        </ContextMenuTrigger>
                        <ContextMenu className="ContextMenu" id={folder._id}>
                            <MenuItem onClick={()=>this.onRenameClickHandler(folder._id,"folder")} className="MenuItem">
                                Rename
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem className="MenuItem" onClick={()=>this.onDeleteClickHandler(folder._id,"folder")}>
                                Delete
                            </MenuItem>
                        </ContextMenu>
                    </React.Fragment>
                )
            })
            updatedFilesFolders.push(...updatedFolders)
        }
        if(this.state.files){
            updatedFiles = this.state.files.map(file=>{
                return ( 
                <React.Fragment key={file._id}>
                    <ContextMenuTrigger id={file._id}>
                            <File name={file.name} clicked={()=>this.onClickFile(file._id)}/>
                    </ContextMenuTrigger>
                    <ContextMenu className="ContextMenu" id={file._id}>
                        <MenuItem onClick={()=>this.onRenameClickHandler(file._id,"file")} className="MenuItem">
                            Rename
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem className="MenuItem" onClick={()=>this.onDeleteClickHandler(file._id,"file")}>
                            Delete
                        </MenuItem>
                    </ContextMenu>
                </React.Fragment>
                )
                        
            })
            updatedFilesFolders.push(...updatedFiles)

        }
        return (
            <div className="Layout">

                <Sidebar addFolder={this.onAddFolderHandler} addFile={this.onAddFileHandler}/>
                <Navbar parentFolder={this.state.parentFolder}/>
                <Row className="BackRow">
                    <Button variant="primary" onClick={this.backClickHandler}>Back</Button>
                </Row>
                <Row className="FolderSection">
                    {updatedFilesFolders}
                </Row>

                <Modal 
                    show={this.state.renameModalShow} 
                    handleSave={this.props.addFile}
                    title="Rename"
                    label="Enter new title"
                    name={this.state.rename}
                    handleChange={(value)=>this.nameChange(value)}
                    handleClose={()=>this.closeModal(1)} />
            </div>
        );

    }
}

export default Dashboard;