
const User = model("user", userSchema);
/**
 email,
 password,
 birthday,
 gender
 */
const query = User.find({}).sort({email: "asc"});
query.exex(callback)
// try {
//     const allUsers = await User.find({}, {
//         sort: {
//             birthday: "asc"
//         }
//     });
// }

