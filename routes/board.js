const router = require('express').Router();
let Board = require('../models/board.model');
let Lists = require('../models/lists.model');
let Cards = require('../models/cards.model');


router.route('/:boardId').get(async (req, res)=>{
    try{
        console.log('Listing board')
        const board = await Board.findById(req.params.boardId).populate({path: 'lists', model:'Lists',populate: {
            path:'cards', model:'Cards', populate :{
                path:'interviewQuestions', model: 'InterviewQuestions'
            }
        }});
        return res.send({board});
    } catch(e){
        return res.status(400).send({error : 'Error loading board'});
    }
    

    
})

router.route('/add').post(async (req, res) =>{
   try{
    const {title, description, lists} = req.body;

    const board = await Board.create({title, description});
    
    await Promise.all (lists.map( async list => {
        const boardList = new Lists({ ...list, board: board._id});
        
        await boardList.save();
        
        board.lists.push(boardList);  
    }));

    await board.save();

    return res.send({board});
   }
   catch(e){
       console.log(e);
       return res.status(400).send({error: 'Error creating new board'})
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

router.route('/delete').delete(async (req, res)=>{
    try{
        console.log('initializing delete')
        const board = await Board.findById(req.body.idBoard)
        
        //if(!board){
          //  return res.status(404).send();
       // }
       //const list = await board.lists.findById(req.body.idList);
       //console.log(list);
       //const card = await lists.cards.findById(req.body.idCard);
       //console.log(card);
        return res.send('deleted successfully');
        
    } catch(e){
        return res.status(500).send(e);   
    }

})

module.exports = router;