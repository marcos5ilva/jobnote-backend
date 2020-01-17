const router = require('express').Router();
const bcrypt = require ('bcrypt');
let User = require('../models/user.model');


router.route('/').post((req, res) =>{
    User.find()
        .then(users=> res.json(users))
        .catch(err => res.status(400).json('Error: '+ err));       
})



router.route('/signin').post(async (req, res)=> {
    console.log('sign in...');
  
    const {email, password} = req.body;
    console.log('email '+email);
   
    
    const user = await User.findOne({ email }).select('+password');
    
    const isMatch = !await bcrypt.compare(password, user.password);
   
        if(!user)
            return res.status(400).send({error: 'User not found'});
            
            
        if(!isMatch)
            return res.status(400).send({error: 'Wrong password'});
           
        res.send({user});
        console.log('user found')
        //res.redirect(303, '/board' + querystring.stringify({user}));;         
 
})

router.route('/add').post(async (req, res)=> {
    const user = req.body;

    const newUser = await User.create(user);

    newUser.save()
        .then(()=> res.json('User added!'))
        .catch(err => res.status(400).json('Error: '+ err));
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