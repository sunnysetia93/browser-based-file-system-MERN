import React, {Component} from 'react';

import axios from '../../hoc/custom-axios';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import Folder from '../Folder/Folder';
import File from '../File/File';

import {Row,Button} from 'react-bootstrap';

import './Dashboard.css'

class Dashboard extends Component {
    state = {
        folders : [],
        files : [],
        parentFolder: null
    }
    componentDidMount(){
        axios.get('/folder')
            .then((response)=>{
                const {folders} = response.data;
                this.setState({
                    folders:folders,
                    parentFolder:null
                })
            })
            .catch(err=>{
                console.log(err);
            })

        axios.get('/file')
            .then((response)=>{
                console.log(response.data);
                this.setState({
                    files:response.data
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }

    onClickFolder = (id,parentId)=>{
        axios.get('/folder/'+id)
            .then((response)=>{
                console.log(response.data);
                const {folders,files} = response.data;
                this.setState({
                    folders:folders,
                    files:files,
                    parentFolder:parentId
                })

            })
            .catch(err=>{
                console.log(err);
            })
    }

    backClickHandler = ()=>{

        console.log(this.state.parentFolder);
        const parentId = this.state.parentFolder==null?"":this.state.parentFolder._id
        axios.get('/folder/'+parentId)
            .then((response)=>{
                console.log(response.data);
                const {folders,files} = response.data;
                const grandParentFolder= (folders.length!=0 && folders[0]._parentFolder!=null && folders[0]._parentFolder._parentFolder!=null)?folders[0]._parentFolder._parentFolder:null
                
                this.setState({
                    folders:folders,
                    files:files,
                    parentFolder:grandParentFolder
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }
    render(){

        let updatedFolders = null;
        let updatedFiles = null;
        const updatedFilesFolders = [];
        if(this.state.folders){
            updatedFolders = this.state.folders.map(folder=>{
                console.log(folder);
                return <Folder key={folder._id} name={folder.name} clicked={()=>this.onClickFolder(folder._id,folder._parentFolder)}/>
            })
            updatedFilesFolders.push(...updatedFolders)
        }
        if(this.state.files){
            updatedFiles = this.state.files.map(file=>{
                console.log(file);
                return <File key={file._id} name={file.name} clicked={()=>this.onClickFile(file._id)}/>
            })
            updatedFilesFolders.push(...updatedFiles)

        }
        // const updatedFilesFolders = [...updatedFolders,...updatedFiles];
        return (
            <div className="Layout">
                <Sidebar/>
                <Navbar/>
                <Row className="BackRow">
                    <Button variant="primary" onClick={this.backClickHandler}>Back</Button>
                </Row>
                <Row className="FolderSection">
                    {updatedFilesFolders}
                </Row>
            </div>
        );

    }
}

export default Dashboard;