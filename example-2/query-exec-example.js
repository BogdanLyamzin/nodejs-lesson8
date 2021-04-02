
const User = model("user", userSchema);

/*
User.find({}, (error, results)=> {
    if(error){
        return res.json({

        })
    }
    return res.json({
        status: "success",
        code: 200,
        data: {
            results
        }
    })
});
*/

const allUserCallback = (error, results)=> {
    if(error){
        return res.json({

        })
    }
    return res.json({
        status: "success",
        code: 200,
        data: {
            results
        }
    })
};

const allUsersQuery = User.find({});
allUsersQuery.exec(allUserCallback);