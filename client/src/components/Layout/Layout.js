import React, {Component} from 'react';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import './Layout.css'
class Layout extends Component {

    render(){

        return (
            <div className="Layout">
                <Sidebar/>
                <Navbar/>
            </div>
        );

    }
}

export default Layout;