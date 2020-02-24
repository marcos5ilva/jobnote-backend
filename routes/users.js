const router = require('express').Router();
const bcrypt = require ('bcrypt');
let User = require('../models/user.model');
let Board = require('../models/board.model');
let Lists = require('../models/lists.model');
let Cards = require('../models/cards.model');


router.route('/').post((req, res) =>{
    User.find()
        .then(users=> res.json(users))
        .catch(err => res.status(400).json('Error: '+ err));       
})



router.route('/signin').post(async (req, res)=> {
    console.log('sign in...');
  
    const {email, password} = req.body;
    console.log('email ', email);
    console.log('password ', password);
   
    
    const user = await User.findOne({ email }).select('+password');
   
    const isMatch = !await bcrypt.compare(password, user.password);
    console.log('backend sign in user ', user);
    console.log('isMatch ', isMatch);
        if(!user)
            return res.status(400).send({error: 'User not found'});
            
            
        //if(!isMatch)
           // return res.status(400).send({error: 'Wrong password'});
           
        res.send({user});
        console.log('user found')
        //res.redirect(303, '/board' + querystring.stringify({user}));;         
 
})

router.route('/add').post(async (req, res)=> {
    const user = req.body;
    let board ={};
    
    
        try {
            //create board
            console.log('creating board')
            board =  await Board.create({title:'My Job Applications', 
                                        description:' First Board',
                                        });
            
            const listWish = await  Lists.create( { title: 'Wish',
                                                    creatable: true,
                                                    board: board._id} );

            const listApplied = await Lists.create({ title: 'Applied',
                                                    creatable: false,
                                                    board: board._id});
            
            const listScreening = await Lists.create({ title: 'Screening Interview',
                                                    creatable: false,
                                                    board: board._id});

            

            const cards = await Cards.create({companyName:'My Wished Company',jobTitle:'Job Title', list:listWish._id},
                                             {companyName:'My Applied Company',jobTitle:'Job Title', list:listApplied._id},
                                             {companyName:'My Screening Company',jobTitle:'Job Title', list:listScreening._id});
            
            const updateListWish = await Lists.findByIdAndUpdate(listWish._id, {cards:[cards[0]]},{new: true, runValidators: true})
            
            const updateListApplied = await Lists.findByIdAndUpdate(listApplied._id, {cards:[cards[1]]},{new: true, runValidators: true})
            
            const updateListScreening = await Lists.findByIdAndUpdate(listScreening._id, {cards:[cards[2]]},{new: true, runValidators: true})

            const updateBoard = await Board.findByIdAndUpdate(board._id,{lists:[listWish,listApplied, listScreening]},{new: true, runValidators: true} );
           
            
            const newUser = await User.create({ ...user, board: board._id});
            
    
            
        
        console.log('User board created');
        console.log('newUser ', newUser);
        return res.send(newUser);
        
        } catch (e) {
            console.log(e);
        }
        
      
    
    //const userBoard = await createUserBoard();
    //console.log('newUserBoardID ',userBoard[0].board._id );
   // const newUser = await User.create({ ...user, board: userBoard[0].board._id});
    

    //newUser.save()
       // .then(()=> res.json('User added!'))
       // .catch(err => res.status(400).json('Error: '+ err));
})

router.route('/update/:id').post((req, res)=> {
    User.findById(req.params.id)
    .then(users=> {
        users.username = req.body.username;

        users.save()
            .then(()=>res.json('User update!'))
            router.route('/:id').get((req, res)=> {
                User.findById(req.params.id)
                .then(users=> res.json(User))
                .catch(err => res.status(400).json('Error: '+ err)); 
            })
    })
        .catch(err => res.status(400).json('Error: '+ err)); 
})

router.route('/:id').delete((req, res)=> {
    User.findByIdAndDelete(req.params.id)
    .then(users=> res.json('User deleted'))
        .catch(err => res.status(400).json('Error: '+ err)); 
})



module.exports = router;