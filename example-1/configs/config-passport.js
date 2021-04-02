const passport = require("passport");
const Strategy = require("passport-local").Strategy;

const {User} = require("../models");

passport.serializeUser((user, done)=> {
    done(null, user.id)
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (error, user)=> {
        done(error, user);
    });
});

passport.use(
    new Strategy({usernameField: "email"}, async (email, password, done)=> {
        try {
            const user = await User.findOne({email});
            if(!user){
                return done(null, false)
            }
            if(!user.validPassword(password)){
                return done(null, false)
            }
            return done(null, user);
        }
        catch(error){
            done(error);
        }
        
    })
)