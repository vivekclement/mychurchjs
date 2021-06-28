import React, { Component } from 'react'
import { CSVReader } from "react-papaparse"
import axios from 'axios';
import { withCookies } from 'react-cookie';

const handleOnDrop = (data) => {
    for (let i = 1; i < data.length; i++) {
        let baptismNumber = data[i].data[0]; //0: "Baptism Number"
        let fullName = data[i].data[1]; //1: "Name"
        let sex = data[i].data[2]; //2: "Sex"
        let dateOfBirth = data[i].data[3]; //3: "Date of Birth"
        let dateOfBaptism  = data[i].data[4]; //4: "Date of Baptism"
        let placeOfBaptism = data[i].data[5]; //5: "Place of Baptism"
        let fathersName = data[i].data[6]; //6: "Father's Name"
        let mothersName = data[i].data[7]; //7: "Mother's Name"
        let address = data[i].data[8]; //8: "Residence of Parents"
        let godFatherName = data[i].data[9]; //9: "God Father"
        let godMotherName = data[i].data[10]; //10: "God Mother"
        let ministerBaptis = data[i].data[11]; //11: "Minister of Baptism"
        let marriedTo = data[i].data[12]; //12: "Married ( to whom, when & where)"

        const registered = {
            baptismNumber: baptismNumber
            , fullName: fullName
            , sex: sex
            , dateOfBaptism: dateOfBaptism
            , dateOfBirth: dateOfBirth
            , placeOfBaptism: placeOfBaptism
            , fathersName: fathersName
            , mothersName: mothersName
            , address: address
            , godFatherName: godFatherName
            , godMotherName: godMotherName
            , ministerBaptis: ministerBaptis
            , marriedTo: marriedTo
        }
        console.log('data Value  :' + registered)

        //axios.post(`${process.env.REACT_APP_API_URL}/api/baptism/add`,registered)
        //    .then(response => console.log(response.data))

            axios.post(`${process.env.REACT_APP_API_URL}/api/baptism/add`,registered,{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('xlogin')}` 
                }})
                .then(response => console.log(response.data))


    }    
}


const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
}

const handleOnRemoveFile = (data) => {
    window.location = '/home';
}


export class UploadHolyComm extends Component {

    render() {
        return (
            <div className="container"> <h5>Click and Drag Upload</h5>
                <CSVReader
                    onDrop={handleOnDrop}
                    onError={handleOnError}
                    addRemoveButton
                    onRemoveFile={handleOnRemoveFile}
                >
                    <span>Drop CSV file here or click to upload.</span>
                </CSVReader>
            </div>
        )
    }
}

export default withCookies(UploadHolyComm);
