const mongoose = require('mongoose');
require('dotenv').config();

//Database ATLAS connection 
const uri = process.env.ATLAS_URI; //URI from mongoDB Atlas page

mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex:true});

//Database local connection
//mongoose.connect('mongodb://localhost/jobtrackdb',{useNewUrlParser: true, useCreateIndex:true});



module.exports = mongoose;