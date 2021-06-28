const express = require('express')
const router = express.Router()
const userTemplateCopy = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

router.route('/').get((req, res, next) => {
    userTemplateCopy.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/login', (req, res, next) => {
    userTemplateCopy.find({email:req.body.email})
    .exec()
    .then( user =>{
        if (user.length < 1){
            return res.status(401).json({
                message : 'Auth Failed !'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
        if (err){
            return res.status(401).json({
                message: 'Auth Failed !'
            });
        }
        if (result) {
            const token =jwt.sign({
                email: user[0].email,
                userId: user[0]._id
            },process.env.JWT_KEY,
            {
                expiresIn: "1h"
            });
           return res.status(200).json({
                 message: 'Auth Successful !', token:token
           });
        }
        res.status(401).json({
            message: 'Auth Failed !'
        })
    })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });

          });
        });

router.post('/signup', (req, res, next) => {
    userTemplateCopy.find({email:req.body.email})
    .exec()
    .then( user=>{
        if (user.length >=1){
             return res.status(409).json({
                 message: 'User already Registered'
             });
            }        else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {console.log('xxx'+err);
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new userTemplateCopy(
                            {
                                email: req.body.email,
                                password: hash
            
                            });
                        user.save().then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'User Created'
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({ error: err })
                        })
                    }
                });
            }
    })
    

    router.route('/:id').get((req, res) => {
        userTemplateCopy.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.status(400).json('Error: ' + err));
    });


});

router.delete('/:id',(req,res,next)=>{
    userTemplateCopy.findByIdAndDelete(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err))
});


module.exports = router