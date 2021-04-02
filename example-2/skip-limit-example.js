
const User = model("user", userSchema);
/**
 email,
 password,
 birthday,
 gender
 */

// /users?page=3&limit=10
 const {page, limit} = req.params

const params = {
    skip: (page - 1) * limit,
    limit,
    sort: {
        birthday: "arc"
    }
};

const query = await User.find({}, params);


