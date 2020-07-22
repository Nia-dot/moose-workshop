var express = require("express");
var passport = require("passport");
var router = express.Router();
var User = require("../models/user");

//HOME route--------------------------
router.get("/", function(req, res){
	res.render("landing");
});

//AUTH ROUTES=============================================

//show register form
router.get("/register", function(req, res){
	res.render("register");
});

//Send post req to sign up
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message)
			return res.render("register");
		};
		passport.authenticate("local")( req, res, function(){
			req.flash("success", "Welcome " + user.username)
			res.redirect("/photos");
		});
	});
});

//LOG IN show form
router.get("/login", function(req, res){
	res.render("login")
});

//handle log in logic
router.post("/login", passport.authenticate("local",
	{successRedirect: "/photos",
	 failureRedirect: "/login"}), 
	function(req, res){	
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged out.");
	res.redirect("/photos");
});

module.exports = router;