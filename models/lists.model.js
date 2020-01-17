const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listsSchema =  new Schema({

    title :{
        type: String,
         required: true,  
     },

    creatable: {
         type: Boolean,
     },

     board: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Board',
         required: true,
     },

     //cards: [cardsSchema]
     cards: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Cards',
     }]
 });

const Lists = mongoose.model('Lists', listsSchema);
module.exports = Lists;