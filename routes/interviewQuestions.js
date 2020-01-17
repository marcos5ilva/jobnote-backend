const router = require('express').Router();
let InterviewQuestions = require('../models/interviewQuestions.model');
let Cards = require('../models/cards.model');

router.route('/').get(async (req, res)=>{
    try{
        const interviewQuestions = await InterviewQuestions.find();
        return res.send({interviewQuestions});
    } catch(e){
        return res.status(400).send({error: 'Error loading Interview Questions'})
    }
})

 router.route('/add/:id').patch( async (req, res)=>{
      
    
    try{
        const {interviewQuestions} = req.body;
        const card = await Cards.findByIdAndUpdate(req.params.id,{new: true, runValidators : true});
        console.log(card);
        
        if(!card){
            return res.status(400).send();
        }

        await Promise.all(interviewQuestions.map( async interviewQuestion =>{
            const interviewQuestionUpdate = new InterviewQuestions({...interviewQuestion, card: card._id});

            await interviewQuestionUpdate.save();

            card.interviewQuestions.push(interviewQuestionUpdate);
            await card.save();
            res.json(interviewQuestionUpdate);
        }))
    } catch(e){
        return res.status(400).send({Error: 'Error creating new interview question'+e.message})
 
    }
})


module.exports=router;