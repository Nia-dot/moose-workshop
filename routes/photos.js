var express = require("express");
var router = express.Router();
var Photo = require("../models/photos");
var middlewareObj = require("../middleware/index.js");

//INDEX photos - show all photos 
router.get("/", function(req, res){
	Photo.find({}, function(err, photos){
		if(err){
			console.log("Error")
		} else {
				res.render("photos/index", {photos: photos});
		};
	});

});

//NEW photos route- show form to create new photo
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
	res.render("photos/new");
});

//CREATE photos route - add new photo do DB
router.post("/", middlewareObj.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newPhoto = {name: name, image:image, description:description, author: author};
	Photo.create(newPhoto, function(err, newlyCreated){
		if(err || !newlyCreated){
			req.flash("error", err.message)
		} else { 
			req.flash("success", "Photo uploaded successfully.");
			res.redirect("/photos")
		}
	})
});

//SHOW photo route - show more info about a photo by ID
router.get("/:id", function(req, res){
	Photo.findById(req.params.id).populate("comments").exec(function(err, foundPhoto){
			if(err || !foundPhoto){
				req.flash("error", "This photo does not exist, or there was an error trying to get it.");
				console.log(err);
			} else {
				res.render("photos/show", {photos: foundPhoto});
			}
		});
});

//EDIT route
router.get("/:id/edit", middlewareObj.checkPhotoOwnership, function(req, res){
	Photo.findById(req.params.id, function(err, photo){
		res.render("photos/edit", {photo: photo});
	});
});

//UPDATE
router.put("/:id", middlewareObj.checkPhotoOwnership, function(req, res){
	Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, photo){
		if(err || !photo){
			res.redirect("/photos/" + req.params.id);
		} else {
			req.flash("success", "Photo updated successfully.");
			res.redirect("/photos/" + req.params.id)
		};
	});
});

//DELETE
router.delete("/:id", middlewareObj.checkPhotoOwnership, async(req, res) => {
  try {
    let foundPhoto = await Photo.findById(req.params.id);
    await foundPhoto.remove();
	req.flash("success", "Deleted photo.");
    res.redirect("/photos");
  } catch (error) {
    console.log(error.message);
    res.redirect("/photos");
  }
});

module.exports = router;