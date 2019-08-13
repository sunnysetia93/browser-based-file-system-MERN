import React, {Component} from 'react';
import axios from '../../hoc/custom-axios';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
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
                console.log(response.data);
            })
            .catch(err=>{
                console.log(err);
            })

        axios.get('/file')
            .then((response)=>{
                console.log(response.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }
    render(){

        return (
            <div className="Layout">
                <Sidebar/>
                <Navbar/>
            </div>
        );

    }
}

export default Dashboard;