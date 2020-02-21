const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;



//  cardsSchema = new Schema ({
//      id: {
//          type: Number,
//          required: false,
//      },
//      content:{
//          type: String,
//      },
//      labels:String,

//      user: {
//          type: String,

//      }

//  });

 
//  const listSchema =  new Schema({

//     title :{
//         type: String,
//          required: true,  
//      },

//     creatable: {
//          type: Boolean,
//      },

//      cards: [cardsSchema]
//  });

 const boardSchema = new Schema({
    //lists: [listSchema]
    title: String,
    description: String,
    userID: mongoose.Schema.Types.ObjectId,
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lists',
    }],
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;