const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardsSchema = new Schema ({

    companyName: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        
    },
    salary: {
        type: String,
        
    },
    jobPostURL: {
        type: String,
        
    },
    note:{
        type: String,
    },
    companyNote:{
        type: String,
    },
     interviewQuestions:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'interviewQuestions'
     }],
    labels:String,

    //  board:{
    //      type: mongoose.Schema.Types.ObjectId,
    //      ref: 'Board',
    //      required: true,  
    //  },

    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lists',
        required: true,

    }

})

const Cards = mongoose.model('Cards', cardsSchema);
module.exports = Cards;