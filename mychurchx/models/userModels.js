const mongoose = require('mongoose')
const userTemplate = new mongoose.Schema({
    email:{ type:String,
            required:true,
            unique:true,
            match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
    password:{type:String,required:true}
},
{
    timestamps: true,

})
module.exports = mongoose.model('user', userTemplate);