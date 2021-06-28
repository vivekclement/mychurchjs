import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import * as FaIcon from 'react-icons/fa';    
import { withCookies } from 'react-cookie';
import '../../App.css';
import marriageImg from "../../assets/marriage.png";

class Marriage extends Component {

    render() {        
        return (
            <nav className="navbar-expand-lg">                
            <div className="container">             
               <div className="collpase navbar-collapse">               
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/searchMarriage" className="nav-link"><FaIcon.FaSearch size={42}/></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createMarriage" className="nav-link"><FaIcon.FaPlus size={42}/></Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/uploadMarriage" className="nav-link"><FaIcon.FaFileUpload size={42} /></Link>                        
                        </li>
                        <li className="navbar-item">
                        <img className="photo" src={marriageImg} />
                        </li>
                    </ul>                    
                </div>                
            </div>            
        </nav>
        )
    }

}
export default withCookies(Marriage);