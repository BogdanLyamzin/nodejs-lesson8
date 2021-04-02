const express = require("express");
const router = express.Router();

const {User} = require("../models");

const auth = (req, res, next)=> {
    if(req.Authentificated()){
        return next();
    }
    res.redirect("/login");
};

router.post("/register", express.json(), (req, res, next)=> {
    const {username, email, password} = req.body;
    
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            status: "error",
            code: 400,
            message: "Пользователь с таким email уже существует"
        });
    }

    try {
        const newUser = new User({username, email});
        newUser.setPassword(password);
        const result = await newUser.save();
        res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        });
    }
    catch(error){
        next(error);
    }
});

router.post("/login", async (req, res, next)=> {


});

router.get("/profile", auth, (req, res, next)=> {

});

router.get("/logout", (req, res)=>{
    res.logout();
})

module.exports = router;
