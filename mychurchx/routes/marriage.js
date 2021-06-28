const express = require('express');
const router = express.Router();
const marriageTemplateCopy = require('../models/marriageModels');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth')


router.route('/').get(auth,(req, res, next)  => {
    marriageTemplateCopy.find()
        .then(marriage => res.json(marriage))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(auth, (req, res, next) => {
    marriageTemplateCopy.findByIdAndDelete(req.params.id)
        .then(marriage => res.json(marriage))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(auth, (req, res, next) => {
    marriageTemplateCopy.findById(req.params.id)
        .then(marriage => {
            marriage.marriageNumber = req.body.marriageNumber;
            marriage.parishNumber = req.body.parishNumber;
            marriage.familyNumber = req.body.familyNumber;
            marriage.dateOfMarriage = req.body.dateOfMarriage;
            //Bridegroom Details
            marriage.groomName = req.body.groomName;
            marriage.bachelorOrWidower = req.body.bachelorOrWidower;
            marriage.groomAge = req.body.groomAge;
            marriage.groomDomicile = req.body.groomDomicile;
            marriage.groomFathersName = req.body.groomFathersName;
            marriage.groomMothersName = req.body.groomMothersName;
            //Bride Details
            marriage.bridesName = req.body.bridesName;
            marriage.spinsterOrWidow = req.body.spinsterOrWidow;
            marriage.brideAge = req.body.brideAge;
            marriage.brideDomicile = req.body.brideDomicile;
            marriage.brideFathersName = req.body.brideFathersName;
            marriage.brideMothersName = req.body.brideMathersName;
            //Other Details            
            marriage.witness1 = req.body.witness1;
            marriage.witness2 = req.body.witness2;
            marriage.ministerFr = req.body.ministerFr;
            marriage.marriedWhen = req.body.marriedWhen;
            marriage.dateCreated = req.body.dateCreated;

            marriage.save()
                .then(() => res.json('Marriage Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(auth, (request, response, next) => {
    const marriage = new marriageTemplateCopy(
        {
            marriageNumber: request.body.marriageNumber,
            parishNumber: request.body.parishNumber,
            familyNumber: request.body.familyNumber,
            dateOfMarriage: request.body.dateOfMarriage,
            //Bridegroom Details
            groomName: request.body.groomName,
            bachelorOrWidower: request.body.bachelorOrWidower,
            groomAge: request.body.groomAge,
            groomDomicile: request.body.groomDomicile,
            groomFathersName: request.body.groomFathersName,
            groomMothersName: request.body.groomMothersName,
            //Bride Details
            bridesName: request.body.bridesName,
            spinsterOrWidow: request.body.spinsterOrWidow,
            brideAge: request.body.brideAge,
            brideDomicile: request.body.brideDomicile,
            brideFathersName: request.body.brideFathersName,
            brideMothersName: request.body.brideMothersName,
            //Other Details            
            witness1: request.body.witness1,
            witness2: request.body.witness2,
            ministerFr: request.body.ministerFr,
            marriedWhen: request.body.marriedWhen,
            dateCreated: request.body.dateCreated
        }
    )
    marriage.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
})

module.exports = router