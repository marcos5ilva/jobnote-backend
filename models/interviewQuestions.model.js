const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewQuestionsSchema = new Schema({
    question: String,
                
    answer: String,

     card:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Cards',
         required: true
     }
});

const InterviewQuestions = mongoose.model('InterviewQuestions', interviewQuestionsSchema);
module.exports = InterviewQuestions;