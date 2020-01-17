const router = require('express').Router();
let Board = require('../models/board.model');
let Lists = require('../models/lists.model');
let Cards = require('../models/cards.model');

router.route('/').get( async(req, res)=>{
    try{

        const lists = await Lists.find().populate({ path:'cards', model:'Cards', populate :{
            path:'interviewQuestions', model: 'InterviewQuestions'
        }});
        return res.send({lists});

    } catch(e){
        return res.status(400).send({Error: 'Error loading lists'})
    }
   
})


router.route('/update/:id').patch(async (req, res) =>{
    console.log('Update endpoint requested');
    const updates =Object.keys(req.body);
    
    // const allowedUpdates = ["content", "id"];

    // const isValidOperation = updates.every((update)=>{
    //    )
    //     return allowedUpdates.includes(update)
    // })

    // if(!isValidOperation){
    //     return res.status(404).send({error: 'Invalid updates!'});
    // }

    try{

        const {title, description, lists} = req.body;

        const board = await Board.findOneAndUpdate(req.params.id,{title, description}, { new: true, runValidators: true }) 

        if(!board){
            return res.status(404).send()
        }

        //board.lists =[];
        //await Lists.remove({board: board._id});

        await Promise.all (lists.map( async list => {
            const boardList = new Lists({ ...list, board: board._id});
            
            await boardList.save();
            
            board.lists.push(boardList);  
        }));
        
        await board.save();

        res.send(board)
    } catch(e){
        return res.status(400).send({error : 'Error updating lists'});
    }

})

router.route('/:id').delete(async (req, res)=>{
    try{
       
        await Lists.findByIdAndDelete(req.params.id);
        return res.send('List deleted');


    }catch(e){
        return res.status(400).send({Error: 'Error deleting list'})
    }
})

module.exports = router;
