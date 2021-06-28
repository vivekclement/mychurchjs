import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import HolyCommunion from './HolyCommunion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { withCookies } from 'react-cookie';

class EditHolyComm extends Component {
    constructor(props) {        
        super(props);
        this.changebaptismNumber = this.changebaptismNumber.bind(this)
        this.changeParishNumber = this.changeParishNumber.bind(this)
        this.changefamilyNumber = this.changefamilyNumber.bind(this)
        this.changefullName = this.changefullName.bind(this)
        this.changesex = this.changesex.bind(this)
        this.changedateOfBaptism = this.changedateOfBaptism.bind(this)
        this.changeplaceOfBaptism = this.changeplaceOfBaptism.bind(this)
        this.changedateOfBirth = this.changedateOfBirth.bind(this)
        this.changeplaceOfBirth = this.changeplaceOfBirth.bind(this)
        this.changefathersName = this.changefathersName.bind(this)
        this.changemothersName = this.changemothersName.bind(this)
        this.changeaddress = this.changeaddress.bind(this)
        this.changegodFatherName = this.changegodFatherName.bind(this)
        this.changegodMotherName = this.changegodMotherName.bind(this)
        this.changeministerBaptismFr = this.changeministerBaptismFr.bind(this)
        this.changemarriedTo = this.changemarriedTo.bind(this)
        this.changemarriedWhen = this.changemarriedWhen.bind(this)
        this.changemarriedWhere = this.changemarriedWhere.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            baptismNumber: '',
            parishNumber: '',
            familyNumber: '',
            fullName: '',
            sex: '',
            dateOfBaptism: new Date(),
            placeOfBaptism: '',
            dateOfBirth: new Date(),
            placeOfBirth: '',
            fathersName: '',
            mothersName: '',
            address: '',
            godFatherName: '',
            godMotherName: '',
            ministerBaptismFr: '',
            marriedTo: '',
            marriedWhen: '',
            marriedWhere: ''
        }
       

    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/baptism/`+this.props.match.params.id,{headers: {'Authorization': `Bearer ${this.props.cookies.get('my-token')}`}}
        )
          .then(response => {
            this.setState({
                baptismNumber 		: response.data.baptismNumber     ,
                parishNumber        : response.data.parishNumber      ,
                familyNumber	    : response.data.familyNumber	  ,
                fullName    	    : response.data.fullName    	  ,
                sex         	    : response.data.sex         	  ,
                dateOfBaptism       : new Date(response.data.dateOfBaptism) ,
                placeOfBaptism      : response.data.placeOfBaptism,
                dateOfBirth 	    : new Date(response.data.dateOfBirth)  ,
                placeOfBirth	    : response.data.placeOfBirth	  ,
                fathersName         : response.data.fathersName       ,
                mothersName 	    : response.data.mothersName 	  ,
                address             : response.data.address           ,
                godFatherName       : response.data.godFatherName     ,
                godMotherName       : response.data.godMotherName     ,
                ministerBaptismFr   : response.data.ministerBaptismFr    ,
                marriedTo  		    : response.data.marriedTo  		  ,
                marriedWhen         : new Date()||new Date(response.data.marriedWhen),
                marriedWhere        : response.data.marriedWhere      
            })   
          })
          .catch(function (error) {
            console.log('Error : '+ error);
          })  
    
      }

    changebaptismNumber(event) { this.setState({ baptismNumber: event.target.value }) }
    changeParishNumber(event) { this.setState({ parishNumber: event.target.value }) }
    changefamilyNumber(event) { this.setState({ familyNumber: event.target.value }) }
    changefullName(event) { this.setState({ fullName: event.target.value }) }
    changesex(event) { this.setState({ sex: event.target.value }) }
    changedateOfBaptism(date) { this.setState({ dateOfBaptism: date }) }
    changeplaceOfBaptism(event) { this.setState({ placeOfBaptism: event.target.value }) }
    changedateOfBirth(date) { this.setState({ dateOfBirth: date }) }
    changeplaceOfBirth(event) { this.setState({ placeOfBirth: event.target.value }) }
    changefathersName(event) { this.setState({ fathersName: event.target.value }) }
    changemothersName(event) { this.setState({ mothersName: event.target.value }) }
    changeaddress(event) { this.setState({ address: event.target.value }) }
    changegodFatherName(event) { this.setState({ godFatherName: event.target.value }) }
    changegodMotherName(event) { this.setState({ godMotherName: event.target.value }) }
    changeministerBaptismFr(event) { this.setState({ ministerBaptismFr: event.target.value }) }
    changemarriedTo(event) { this.setState({ marriedTo: event.target.value }) }
    changemarriedWhen(date) { this.setState({ marriedWhen: date }) }
    changemarriedWhere(event) { this.setState({ marriedWhere: event.target.value }) }

    onSubmit(event) {
        event.preventDefault();
        console.log('Entering on submit');
        const registered = {
            baptismNumber: this.state.baptismNumber,
            parishNumber: this.state.parishNumber,
            familyNumber: this.state.familyNumber,
            fullName: this.state.fullName,
            sex: this.state.sex,
            dateOfBaptism: this.state.dateOfBaptism,
            placeOfBaptism: this.state.placeOfBaptism,
            dateOfBirth: this.state.dateOfBirth,
            placeOfBirth: this.state.placeOfBirth,
            fathersName: this.state.fathersName,
            mothersName: this.state.mothersName,
            address: this.state.address,
            godFatherName: this.state.godFatherName,
            godMotherName: this.state.godMotherName,
            ministerBaptismFr: this.state.ministerBaptismFr,
            marriedTo: this.state.marriedTo,
            marriedWhen: this.state.marriedWhen,
            marriedWhere: this.state.marriedWhere
        }

        console.log('to edit :'+ registered);

        axios.post(`${process.env.REACT_APP_API_URL}/api/baptism/update/`+this.props.match.params.id,
        registered,{
            headers: {
              'Authorization': `Bearer ${this.props.cookies.get('my-token')}` 
            }})
            .then(response => console.log(response.data))
            .catch((error) => {
                console.error(error);
            })

        window.location = '/home';
        
    }
    
    render() {
        return (
            <div >
                <HolyCommunion />
                <div className='container'>
                    <div className='form-div'>
                        <h3>Edit Baptism</h3>
                        <form onSubmit={this.onSubmit}>
                            <input type='text' placeholder='Baptism Number' onChange={this.changebaptismNumber} value={this.state.baptismNumber|| ''} className='form-control form-group' />
                            <input type='text' placeholder='Parish Number' onChange={this.changeParishNumber} value={this.state.parishNumber|| ''} className='form-control form-group' />
                            <input type='text' placeholder='Family Number' onChange={this.changefamilyNumber} value={this.state.familyNumber|| ''} className='form-control form-group' />
                            <input type='text' placeholder='Full Name' onChange={this.changefullName} value={this.state.fullName|| ''} className='form-control form-group' />
                            <input type='text' placeholder='Sex' onChange={this.changesex} value={this.state.sex|| ''} className='form-control form-group' />
                            <div className='form-group'> <label> Date Of Baptism</label> </div>
                            <div><DatePicker selected={this.state.dateOfBaptism|| ''} onChange={this.changedateOfBaptism}/></div>
                            <input type='text' placeholder='Place Of Baptism' onChange={this.changeplaceOfBaptism} value={this.state.placeOfBaptism} className='form-control form-group' />
                            <div className='form-group'> <label> Date Of Birth</label> </div>
                            <div><DatePicker selected={this.state.dateOfBirth|| ''} onChange={this.changedateOfBirth}/></div>
                            <input type='text' placeholder='Place Of Birth' onChange={this.changeplaceOfBirth} value={this.state.placeOfBirth|| ''} className='form-control form-group' />
                            <input type='text' placeholder='Fathers Name' onChange={this.changefathersName} value={this.state.fathersName|| ''} className='form-control form-group' />
                            <input type='text' placeholder='Mothers Name' onChange={this.changemothersName} value={this.state.mothersName|| ''} className='form-control form-group' />
                            <input type='text' placeholder='Address' onChange={this.changeaddress} value={this.state.address|| ''} className='form-control form-group' />
                            <input type='text' placeholder='Godfather Name' onChange={this.changegodFatherName} value={this.state.godFatherName|| ''} className='form-control form-group' />
                            <input type='text' placeholder='GodMother Name' onChange={this.changegodMotherName} value={this.state.godMotherName|| ''} className='form-control form-group' />
                            <input type='text' placeholder='Minister of Baptism Fr.' onChange={this.changeministerBaptismFr} value={this.state.ministerBaptismFr|| ''} className='form-control form-group' />
                            <input type='text' placeholder='Married To' onChange={this.changemarriedTo} value={this.state.marriedTo|| ''} className='form-control form-group' />
                            <div className='form-group'> <label> Married When</label> </div>
                            <div><DatePicker selected={this.state.marriedWhen|| ''} onChange={this.changemarriedWhen}/></div>
                            <input type='text' placeholder='Married Where' onChange={this.changemarriedWhere} value={this.state.marriedWhere|| ''} className='form-control form-group' />
                            <input type='submit' className='btn btn-danger btn-block' value='Save' />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(EditHolyComm);