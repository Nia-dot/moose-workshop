var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comments");
var Photo = require("../models/photos");
var middleware = require("../middleware/index.js")

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
	Photo.findById(req.params.id, function(err, photos){
	if(err || !photos){
		console.log(err);
	} else {
		res.render("comments/new", {photos: photos})
	}
	});
})

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
	Photo.findById(req.params.id, function(err, photo){
		if(err || !photo){
			req.flash("error", "Photo not found.")
			res.redirect("photos/show")
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					photo.comments.push(comment);
					photo.save();
					req.flash("success", "Comment added.");
					res.redirect('/photos/' + photo._id)
				};
			});
		};
	});
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Photo.findById(req.params.id, function(err, photo){
		if(err || !photo){
			req.flash("error", "Could not find photo.");
			return res.redirect("back");
		}	
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err || !foundComment){
			req.flash("error", "Comment not found.")
			res.redirect("back");
		} else {
			res.render("comments/edit", {photo_id: req.params.id, comment: foundComment});
		};
	});
	});
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Photo.findById(req.params.id, function(err, photo){
		if(err || !photo){
			req.flash("error", "Could not find photo.");
			return res.redirect("back");
		}
		Comment.findByIdAndUpdate(req.params.commend_id, req.body.comment, function(err, updatedComment){
		if(err || !updatedComment){
			res.redirect("back");
		} else {
			req.flash("success", "Comment updated successfully.");
			res.redirect("/photos/" + req.params.id);
		}; 
	});
	});
});

//DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted successfully.");
			res.redirect("/photos/" + req.params.id)
		}
	})
});

module.exports = router;

