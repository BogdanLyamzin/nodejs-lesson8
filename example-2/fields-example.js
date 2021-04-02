
const User = model("user", userSchema);
/**
 email,
 password,
 birthday,
 gender
 */
try {
    const allUsers = await User.find({}, "email birthday gender");
}

