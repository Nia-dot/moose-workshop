var express			= require("express"),
	app 			= express(),
	request 		= require("request"),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	flash			= require("connect-flash"),
	passport 		= require("passport"),
	LocalStratey	= require("passport-local"),
	methodOverride 	= require("method-override"),
	seedDB 			= require("./seeds.js"),
	User 			= require("./models/user"),
	Photo 			= require("./models/photos"),
	Comment 		= require("./models/comments");

var photosRoutes 	= require("./routes/photos"),
	commentRoutes 	= require("./routes/comments"),
	indexRoutes		= require("./routes/index");

mongoose.connect("mongodb://localhost:27017/summers", {useNewUrlParser: true, useUnifiedTopology: true});

//DB SEEDER
// seedDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION---------------
app.use(require("express-session")({
	secret: "Pascal is a good boy, yes.",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratey(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//ROUTES REQ
app.use("/", indexRoutes);
app.use("/photos/:id/comments", commentRoutes);
app.use("/photos", photosRoutes);


//CONNECT
app.listen(3000, process.env.IP, function(){
	console.log("Started.");
});