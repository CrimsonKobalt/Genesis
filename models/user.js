var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//create the user model
var userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            maxlength: 20,
            minlength: 2
        },
        last_name: {
            type: String,
            required: true,
            maxlength: 25,
            minlength: 2
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

//geen lambda expressie: 'this' is niet bruikbaar
userSchema.pre('save', async function(next) {
    try{
        //generate salt
        const salt = await bcrypt.genSalt(10);
        //generate pw_hash = (salt + hash)
        const passHash = await bcrypt.hash(this.password, salt);
        this.password = passHash;
    } catch(error){
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(enteredPass){
    try{
        return await bcrypt.compare(enteredPass, this.password);
    } catch(error){
        throw new Error(error);
    }
};

//export model
module.exports = mongoose.model('user', userSchema);