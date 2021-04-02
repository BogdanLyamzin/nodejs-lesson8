const express = require("express");
const passport = require("passport");
const session = require("session");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
    session({
      secret: "secret-word",
      key: "session-key",
      cookie: {
        path: "/",
        httpOnly: true,
        maxAge: null
      },
      saveUninitialized: false,
      resave: false
    })
  );

require("./configs/config-passport");
app.use(passport.initialize());
app.use(passport.session())
app.use(cors());
// app.use(express.json());

const {userRouter} = require("./api");

app.use("/user", userRouter);

app.use((_, res, __)=> {
    res.status(404).json({
        status: "error",
        code: 404,
        message: "Not such page or route"
    });
});

app.use((error, _, res, __)=> {
    res.status(500).json({
        status: "error",
        code: 500,
        message: error.message
    });
});

const PORT = process.env.PORT || 3000;
const {DB_HOST} = process.env;

mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT);
})

