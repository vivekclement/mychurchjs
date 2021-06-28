import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { withCookies } from 'react-cookie';
import Baptism from './Baptism';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class CreateBaptism extends Component {
    constructor() {
        super()
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
            marriedWhen: new Date(),
            marriedWhere: ''
        }
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
        event.preventDefault()
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
        console.log('data :' + registered)
        axios.post(`${process.env.REACT_APP_API_URL}/api/baptism/add`,registered,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('xlogin')}` 
            }})
            .then(response => console.log(response.data))

        this.setState({
            baptismNumber: '',
            parishNumber: '',
            familyNumber: '',
            fullName: '',
            sex: '',
            dateOfBaptism: '',
            placeOfBaptism: '',
            dateOfBirth: '',
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
        })

        window.location = '/searchBaptism';
    }
    render() {
        return (
            <div >
                <Baptism />
                <div className='container'>
                    <div className='form-div'>
                        <h3>Enter New Baptism</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-inputs'> <label htmlFor='baptismnumber' className='form-label'>Baptism Number</label><input type='text' name='baptismnumber' placeholder='Baptism Number' onChange={this.changebaptismNumber} value={this.state.baptismNumber} className='form-control form-group' /></div>
                            <div className='form-inputs'> <label htmlFor='parishnumber' className='form-label'>Parish Number</label><input type='text' name='parishnumber' placeholder='Parish Number' onChange={this.changeParishNumber} value={this.state.parishNumber} className='form-control form-group' /></div>
                            <div className='form-inputs'> <label htmlFor='familynumber' className='form-label'>Family Number</label><input type='text' name='familynumber' placeholder='Family Number' onChange={this.changefamilyNumber} value={this.state.familyNumber} className='form-control form-group' /></div>
                            <div className='form-inputs'> <label htmlFor='fullname' className='form-label'>Full Name    </label><input type='text' name='fullname' placeholder='Full Name' onChange={this.changefullName} value={this.state.fullName} className='form-control form-group' /></div>
                            <div className='form-inputs'> <label htmlFor='sex' className='form-label'>Sex          </label><input type='text' name='sex' placeholder='Sex' onChange={this.changesex} value={this.state.sex} className='form-control form-group' /></div>
                            <div className='form-group'> <label> Date Of Baptism</label> </div>
                            <div><DatePicker selected={this.state.dateOfBaptism} onChange={this.changedateOfBaptism} /></div>
                            <div className='form-inputs'> <label htmlFor='placeOfBaptism' className='form-label'>Place of Baptism</label><input type='text' name='placeOfBaptism' placeholder='Place Of Baptism' onChange={this.changeplaceOfBaptism} value={this.state.placeOfBaptism} className='form-control form-group' /></div>
                            <div className='form-group'> <label> Date Of Birth</label> </div>
                            <div><DatePicker selected={this.state.dateOfBirth} onChange={this.changedateOfBirth} /></div>
                            <div className='form-inputs'> <label htmlFor='placeOfBirth' className='form-label'>Place of Birth         </label>  <input type='text' name='placeOfBirth' placeholder='Place Of Birth' onChange={this.changeplaceOfBirth} value={this.state.placeOfBirth} className='form-control form-group' /> </div>
                            <div className='form-inputs'> <label htmlFor='fathersName' className='form-label'>Fathers Name           </label>  <input type='text' name='fathersName' placeholder='Fathers Name' onChange={this.changefathersName} value={this.state.fathersName} className='form-control form-group' /></div>
                            <div className='form-inputs'> <label htmlFor='mothersName' className='form-label'>Mothers Name           </label>  <input type='text' name='mothersName' placeholder='Mothers Name' onChange={this.changemothersName} value={this.state.mothersName} className='form-control form-group' /></div>
                            <div className='form-inputs'> <label htmlFor='Address' className='form-label'>Address                </label>  <input type='text' name='Address' placeholder='Address' onChange={this.changeaddress} value={this.state.address} className='form-control form-group' /></div>
                            <div className='form-inputs'> <label htmlFor='godfathername' className='form-label'>GodFather Name         </label>  <input type='text' name='godfathername' placeholder='Godfather Name' onChange={this.changegodFatherName} value={this.state.godFatherName} className='form-control form-group' /></div>
                            <div className='form-inputs'> <label htmlFor='godmothername' className='form-label'>GodMother Name         </label>  <input type='text' name='godmothername' placeholder='GodMother Name' onChange={this.changegodMotherName} value={this.state.godMotherName} className='form-control form-group' /></div>
                            <div className='form-inputs'> <label htmlFor='minister' className='form-label'>Minister of Baptism Fr.</label>  <input type='text' name='minister' placeholder='Minister of Baptism Fr.' onChange={this.changeministerBaptismFr} value={this.state.ministerBaptismFr} className='form-control form-group' /></div>
                            <div className='form-inputs'> <label htmlFor='marriedto' className='form-label'>Married To             </label>  <input type='text' name='marriedto' placeholder='Married To' onChange={this.changemarriedTo} value={this.state.marriedTo} className='form-control form-group' /></div>
                            <div className='form-group'> <label> Married When</label> </div>
                            <div><DatePicker selected={this.state.marriedWhen} onChange={this.changemarriedWhen} /></div>
                            <div className='form-inputs'> <label htmlFor='marriedWhere' className='form-label'>Married Where          </label>   <input type='text' name='marriedWhere' placeholder='Married Where' onChange={this.changemarriedWhere} value={this.state.marriedWhere} className='form-control form-group' /></div>
                            <input type='submit' className='btn btn-danger btn-block' value='Submit' />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(CreateBaptism);