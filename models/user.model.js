const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type: String,
        require:true,
        trim: true,
        minlength: 3
    },
    lastName:{
        type: String,
        require:true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        require:true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid');
            }
        }
    },
    password:{
        type: String,
        require:true,
        minlength: 6,
        select: false,
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
    },
},
 {
    timestamps:true,
});

userSchema.statics.findByCredentials = async (email, password)=>{
    console.log('findByCredentials function');
    console.log(email);
    const user = await User.findOne({email}).select('+password');
    console.log(user)
    
        if(!user){
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(await bcrypt.compare(password, user.password));

        if(!isMatch){
            throw new Error ('Unable to login');
        }

        return user;

}

//Hash the plan text password before saving
userSchema.pre('save', async function(next){
    const password = this.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    console.log("salt : "+salt);
    console.log("password before encrypt: "+password);
    
    console.log("password encrypted hash:"+hash)

    console.log("password encrypted this.password :"+this.password)

    console.log("Compare :" + await bcrypt.compare(password, this.password));

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;