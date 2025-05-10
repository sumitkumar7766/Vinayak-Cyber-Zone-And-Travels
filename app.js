if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const path = require('path');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
app.use(express.json());
const User = require("./models/user");
const Owner = require("./models/owner");
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const ExpressError = require("./utils/ExpressError.js");
const flash = require('connect-flash');
const methodOverride = require("method-override");



const OwnerRouter = require("./routes/owner.js");
const userRouter = require("./routes/user.js");
const listingRout = require("./routes/listing.js");

const dbUrl =  process.env.ATLASDB_URL;
const SECRET = process.env.SECRET;


main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(dbUrl);
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(methodOverride("_method"));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("Error in Mongo Session Store", err);
});

const sessionOptions = {
    store,
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/owner')) {
        passport.use(new localStrategy(Owner.authenticate()));
    } else if (req.originalUrl.startsWith('/user')) {
        passport.use(new localStrategy(User.authenticate()));
    }
    next();
});


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.serializeUser(Owner.serializeUser());
passport.deserializeUser(Owner.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

app.use("/owner", OwnerRouter);
app.use("/user", userRouter);
app.use("/listing", listingRout);

app.get('/', (req, res) => {
    res.render("user/index.ejs");
});

app.delete("/owner/listing/:id", async (req, res) => {
    const { id } = req.params;
    await Lesting.findByIdAndDelete(id);
    res.render("homepage/admin");
});



app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Clint side error" } = err;
    res.render("error.ejs", { message });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});