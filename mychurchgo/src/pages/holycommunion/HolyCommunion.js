import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import * as FaIcon from 'react-icons/fa';    
import { withCookies } from 'react-cookie';
import '../../App.css';
import holycommunionImg from "../../assets/holycommunion.png";

class HolyCommunion extends Component {

    render() {        
        return (
            <nav className="navbar-expand-lg">                
            <div className="container">             
               <div className="collpase navbar-collapse">               
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/searchHolyComm" className="nav-link"><FaIcon.FaSearch size={42}/></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createHolyComm" className="nav-link"><FaIcon.FaPlus size={42}/></Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/uploadHolyComm" className="nav-link"><FaIcon.FaFileUpload size={42} /></Link>                        
                        </li>
                        <li className="navbar-item">
                        <img className="photo" src={holycommunionImg} />
                        </li>
                    </ul>                    
                </div>                
            </div>            
        </nav>
        )
    }

}
export default withCookies(HolyCommunion);