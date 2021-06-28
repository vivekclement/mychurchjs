const express = require('express');
const router = express.Router();
const baptismTemplateCopy = require('../models/baptismModels');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth')

router.route('/').get(auth,(req, res, next) => {  
    baptismTemplateCopy.find()
        .then(baptism => res.json(baptism))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(auth,(req, res, next) => {
    console.log(req.headers.authorization)
    baptismTemplateCopy.findById(req.params.id)
        .then(baptism => res.json(baptism))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(auth,(req, res, next) => {
    baptismTemplateCopy.findByIdAndDelete(req.params.id)
        .then(baptism => res.json(baptism))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(auth, (request, response, next) => {
    const baptism = new baptismTemplateCopy(
        {
            baptismNumber: request.body.baptismNumber,
            parishNumber: request.body.parishNumber,
            familyNumber: request.body.familyNumber,
            fullName: request.body.fullName,
            sex: request.body.sex,
            dateOfBaptism: request.body.dateOfBaptism,
            placeOfBaptism: request.body.placeOfBaptism,
            dateOfBirth: request.body.dateOfBirth,
            placeOfBirth: request.body.placeOfBirth,
            fathersName: request.body.fathersName,
            mothersName: request.body.mothersName,
            address: request.body.address,
            godFatherName: request.body.godFatherName,
            godMotherName: request.body.godMotherName,
            ministerBaptismFr: request.body.ministerBaptismFr,
            marriedTo: request.body.marriedTo,
            marriedWhen: request.body.marriedWhen,
            marriedWhere: request.body.marriedWhere
        }
    )
    baptism.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })

    });



    router.route('/update/:id').post(auth,(req, res, next) => {
        baptismTemplateCopy.findById(req.params.id)
            .then(baptism => {
                baptism.baptismNumber = req.body.baptismNumber;
                baptism.parishNumber = req.body.parishNumber;
                baptism.familyNumber = req.body.familyNumber;
                baptism.fullName = req.body.fullName;
                baptism.sex = req.body.sex;
                baptism.dateOfBaptism = req.body.dateOfBaptism;
                baptism.placeOfBaptism = req.body.placeOfBaptism;
                baptism.dateOfBirth = req.body.dateOfBirth;
                baptism.placeOfBirth = req.body.placeOfBirth;
                baptism.fathersName = req.body.fathersName;
                baptism.mothersName = req.body.mothersName;
                baptism.address = req.body.address;
                baptism.godFatherName = req.body.godFatherName;
                baptism.godMotherName = req.body.godMotherName;
                baptism.ministerBaptismFr = req.body.ministerBaptismFr;
                baptism.marriedTo = req.body.marriedTo;
                baptism.marriedWhen = req.body.marriedWhen;
                baptism.marriedWhere = req.body.marriedWhere;

                baptism.save()
                       .then(()=> res.json('Baptism Updated!'))
                       .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    });


module.exports = router