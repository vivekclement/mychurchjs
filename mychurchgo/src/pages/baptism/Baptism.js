import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import * as FaIcon from 'react-icons/fa';    
import { withCookies } from 'react-cookie';
import '../../App.css';
import baptismImg from "../../assets/baptism.png";

class Baptism extends Component {

    render() {        
        return (
            <nav className="navbar-expand-lg">                
            <div className="container">             
               <div className="collpase navbar-collapse">               
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/searchBaptism" className="nav-link"><FaIcon.FaSearch size={42}/></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createBaptism" className="nav-link"><FaIcon.FaPlus size={42}/></Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/uploadBaptism" className="nav-link"><FaIcon.FaFileUpload size={42} /></Link>                        
                        </li>
                        <li className="navbar-item">
                        <img className="photo" src={baptismImg} />
                        </li>
                    </ul>                    
                </div>                
            </div>            
        </nav>
        )
    }

}
export default withCookies(Baptism);