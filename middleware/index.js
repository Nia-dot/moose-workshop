var Photo = require("../models/photos");
var Comment = require("../models/comments");
var middlewareObj = {};

middlewareObj.checkPhotoOwnership = function(req, res, next){
		if(req.isAuthenticated()){
			Photo.findById(req.params.id, function(err, photo){
				if(err || !photo){
					req.flash("error", "We could not get that for you.");
					res.redirect("back")
				} else {
					if(photo.author.id.equals(req.user._id)){
						next();
					} else {
						req.flash("error", "You don't have permission to do that.");
						res.redirect("back");
					};
				};
			});
		} else {
		res.redirect("back");
	};
};

middlewareObj.checkCommentOwnership = function(req, res, next){
			if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, comment){
				if(err || !comment){
					req.flash("error", "We could not get that for you.");
					res.redirect("back")
				} else {
					if(comment.author.id.equals(req.user._id)){
						next();
					} else {
						req.flash("error", "You don't have permission to do that.");
						res.redirect("back");
					};
				};
			});
		} else {
		req.flash("error", "You need to be logged in to do that.")
		res.redirect("back");
	};
};

middlewareObj.isLoggedIn = function(req, res, next){
		if(req.isAuthenticated()){
		return next();
	};
	req.flash("error", "You need to be logged in to do that.")
	res.redirect("/login");
};


module.exports = middlewareObj;