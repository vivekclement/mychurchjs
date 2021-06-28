import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { withCookies } from 'react-cookie';
import axios from 'axios';
import HolyCommunion from './HolyCommunion';
import { Link } from 'react-router-dom';
import { renderToString } from "react-dom/server";
import * as FaIcon from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


//<tr><th>Baptism Number    				</th><td> {props.baptism.baptismNumber} </td> </tr>

const XPrints = props => (
  <div>
    <table id='my-table'>
      <tr><th>Baptism</th><td> Details</td> </tr>
      <tr><th>Full Name                       </th> <td>{props.baptism.fullName}  </td> </tr>
      <tr><th>Sex                             </th> <td> {props.baptism.sex}</td> </tr>
      <tr><th>Date Of Baptism                 </th> <td> {props.baptism.dateOfBaptism.substr(0, 10)}</td> </tr>
      <tr><th>Place Of Baptism                 </th> <td> {props.baptism.placeOfBaptism}</td> </tr>
      <tr><th>Date Of Birth                   </th> <td> {props.baptism.dateOfBirth.substr(0, 10)}</td> </tr>
      <tr><th>Fathers Name                    </th> <td> {props.baptism.fathersName}</td> </tr>
      <tr><th>Mothers Name                    </th> <td> {props.baptism.mothersName}</td> </tr>
      <tr><th>Residence Of Parents            </th> <td> {props.baptism.address} </td> </tr>
      <tr><th>Godfather                       </th> <td> {props.baptism.godFatherName} </td> </tr>
      <tr><th>Godmother                       </th> <td> {props.baptism.godMotherName}</td> </tr>
      <tr><th>Minister Of Baptism Rev. Fr.       </th> <td> {props.baptism.ministerBaptismFr} </td> </tr>
      <tr><th>Married (to whom, when & where) </th> <td>{props.baptism.marriedTo} {props.baptism.marriedWhen} {props.baptism.marriedWhere} </td> </tr>
    </table>
  </div>
);

const GetBaptism = props => (
  <tr>
    <td>{props.baptism.baptismNumber}  </td>
    <td>{props.baptism.fullName}  </td>
    <td>{props.baptism.sex}  </td>
    <td>{props.baptism.dateOfBaptism && props.baptism.dateOfBaptism.substr(0, 10)}  </td>
    <td>{props.baptism.placeOfBaptism}  </td>
    <td>{props.baptism.dateOfBirth && props.baptism.dateOfBirth.substr(0, 10)}  </td>
    <td>{props.baptism.fathersName}  </td>
    <td>{props.baptism.mothersName}  </td>
    <td>
      <a href="javascript:;" onClick={() => { props.printBaptism(props.baptism._id) }}><FaIcon.FaPrint size={28} /></a> |
                <Link to={"/editBaptism/" + props.baptism._id}><FaIcon.FaEdit size={28} /></Link>|
                <a href="javascript:;" onClick={() => { props.deleteBaptism(props.baptism._id) }}><FaIcon.FaTrashAlt size={28} /></a>
    </td>
  </tr>
)

class SearchHolyComm extends Component {

  constructor(props) {
    super(props);
    this.deleteBaptism = this.deleteBaptism.bind(this);
    this.printBaptism = this.printBaptism.bind(this);
    this.state = { baptisms: [], searchName: '', token: this.props.cookies.get('my-token') };
  }

  handleInput = (e) => {
    this.setState({ searchName: e.target.value })
  }


  componentDidMount() {
    if (this.state.token) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/baptism/`, {headers: {'Authorization': `Bearer ${this.state.token}`}}
      )
        .then(response => {
          this.setState({ baptisms: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      window.location.assign("/")
    }

  }


  printBaptism(id) {
    //this.setState({baptisms: this.state.baptisms.filter(el => el._id == id)})
    const bap = this.state.baptisms.filter(currentBaptism => currentBaptism._id === id).map(currentBaptism => {
      return <XPrints baptism={currentBaptism} key={currentBaptism._id} />;
    });
    const printPDF = renderToString(bap);
    const setup = {
      orientation: 'p',
      unit: 'mm',
      format: 'a3',
      compress: true,
      fontSize: 8,
      lineHeight: 0.75,
      autoSize: false,
      printHeaders: false
    };

    const pdf = new jsPDF(setup, '', '', '');
    pdf.autoTable({ html: 'my-table' })
    pdf.setFontSize(35);
    pdf.text(90, 10, "St. Theresa's Church");
    pdf.setFontSize(18);
    pdf.text(50, 20, 'Arockiasamy Pillai Street Crawford Trichy-620012 Tamilnadu India');
    pdf.setFontSize(30);
    pdf.text(80, 45, 'CERTIFICATE OF BAPTISM');
    pdf.text(78, 50, '________________________');
    pdf.fromHTML(printPDF, 50, 50);
    pdf.text(50, 310, 'I certify that the above extract is a true copy from the Register of Baptism kept at _____')
    pdf.text(49, 320, '______________________________________________________________________');
    pdf.text(50, 350, 'Date:')
    pdf.text(230, 350, 'Parish Priest')
    pdf.text(200, 370, 'Seal')
    pdf.save(id + ".pdf");
    
  }

  deleteBaptism(id) {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/baptism/` + id,{
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      }})
      .then(response => { console.log(response.data) });

    this.setState({
      baptisms: this.state.baptisms.filter(el => el._id !== id)
    })
  }

  baptismList() {
    return this.state.baptisms.filter((val) => {
      if (this.state.searchName === "") {
        return val
      }
      else if (!! val.fullName && val.fullName.toLowerCase().includes(this.state.searchName.toLowerCase())) {
        return val
      }
    }).map(currentBaptism => {
      return <GetBaptism baptism={currentBaptism} printBaptism={this.printBaptism} deleteBaptism={this.deleteBaptism} key={currentBaptism._id} />;
    })
  }

  render() {
    return (
      <div className='SearchBaptism'>
        <Baptism />
        <h3>Name : <input type="text" value={this.state.searchName} placeholder="Search..." onChange={this.handleInput} /></h3>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Baptism Number 	   </th>
              <th>Full Name    	   </th>
              <th>Sex         	   </th>
              <th>Date Of Baptism  	   </th>
              <th>Place of Baptism</th>
              <th>Date Of Birth 	   </th>
              <th>Fathers Name  	   </th>
              <th>Mothers Name 	   </th>
              <th>Print|Edit|Delete  </th>
            </tr>
          </thead>
          <tbody>
            {this.baptismList()}
          </tbody>
        </table>
      </div>
    )
  }
}
export default withCookies(SearchHolyComm);