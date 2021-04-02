const {Schema} = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema({
    userName: {
        type: String,
        required: [true, 'У пользователя должно быть имя'],
        minlength: 2
    },
    email: {
        type: String,
        required: [true, "У пользователя должен быть email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "У пользователя должен быть пароль"],
        minlength: 6
    }
});
/*
const {username, email, password} = req.body
const newUser = new User({username, email, password});
newUser.save()
*/
userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6))
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

// Anton134
/*
const {username, email, password} = req.body
const newUser = new User({username, email});
newUser.setPassword(password);
newUser.save()
*/

module.exports = userSchema;