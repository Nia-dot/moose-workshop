var mongoose 	= require("mongoose"),
	Photo 		= require("./models/photos.js"),
	Comment		= require("./models/comments.js")

var seeds = [
  {
     name:"Bubbles"    ,image:"https://images.unsplash.com/photo-1534043464124-3be32fe000c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80"    ,description:"A former celebrity chef who enjoys running, jigsaw puzzles and helping old ladies across the road. He is intelligent and creative, but can also be very rude and a bit untidy"  },
  {
     name:"Jack"    ,image:"https://images.unsplash.com/photo-1543145334-8be4a6b8fc7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2003&q=80"    ,description:"Defines himself as straight. He didn't finish school. He is allergic to Brazil nuts. He has a severe phobia of sheep, and is obsessed with being painted blue."  },
  {
     name:"Captain"    ,image:"https://images.unsplash.com/photo-1573976366069-ee53f0cc76db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80"    ,description:"Professional sports person who enjoys watching television, working on cars and social card games. He is friendly and reliable, but can also be very rude and a bit grumpy."  },
  {
     name:"Finley"    ,image:"https://images.unsplash.com/photo-1558898268-9afca916a69d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"    ,description:"Enjoys cycling, watching television and praying. He is stable and caring, but can also be very rude and a bit untidy."  },
  {
     name:"Blue"    ,image:"https://images.unsplash.com/photo-1553986187-9cb16fa33483?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"    ,description:"Enjoys jigsaw puzzles, helping old ladies across the road and working on cars. He is intelligent and reliable, but can also be very pessimistic and a bit grumpy."  },
  {
     name:"Moby"    ,image:"https://images.unsplash.com/photo-1553986187-00635180f7c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"    ,description:"He is intelligent and creative, but can also be very cowardly and a bit grumpy."  },
  {
     name:"Bubba"    ,image:"https://images.unsplash.com/photo-1534575180408-b7d7c0136ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"    ,description:"Enjoys baking, meditation and football. She is stable and caring, but can also be very rude and a bit impatient."  },
  {
     name:"Squirt"    ,image:"https://images.unsplash.com/photo-1519657635301-68bb60c798f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1946&q=80"    ,description:"Enjoys playing card games, chess and hockey. She is intelligent and caring, but can also be very cowardly and a bit untidy."  },
  {
     name:"Shadow"    ,image:"https://images.unsplash.com/photo-1573472420143-0c68f179bdc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1929&q=80"    ,description:"Enjoys charity work, working on cars and escapology. She is intelligent and careful, but can also be very rude and a bit untidy."  },
  {
     name:"Ace"    ,image:"https://images.unsplash.com/photo-1548262323-694280fdc967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80"    ,description:"She started studying sports science at college but never finished the course. She is allergic to gluten."  },
  {
     name:"Ajax"    ,image:"https://images.unsplash.com/photo-1537801528273-77cbf9ee609b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80"    ,description:"Enjoys watching television, working on cars and going to the movies. She is kind and creative, but can also be very cowardly and a bit impatient."  },
  {
     name:"Aldo"    ,image:"https://images.unsplash.com/photo-1495594059084-33752639b9c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"    ,description:"He started studying food science at college but never finished the course. He is allergic to grasshoppers."  },
  {
     name:"Aqua"    ,image:"https://images.unsplash.com/photo-1549208772-79c8893340fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80"    ,description:"Enjoys binge-watching boxed sets, watching television and playing video games. He is friendly and creative, but can also be very pessimistic and a bit impatient."  },
  {
     name:"Astra"    ,image:"https://images.unsplash.com/photo-1573314268094-9df5fa2a014a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"    ,description:"A sales assistant at office supplies store, and she is is convinced that her half sister, Helena Thomas, was murdered."  },
  {
     name:"Azure"    ,image:"https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1912&q=80"    ,description:"A lab assistant who enjoys travelling, donating blood and meditation. He is friendly and caring, but can also be very cowardly and a bit impatient."  },
  {
     name:"Babel"    ,image:"https://images.unsplash.com/photo-1568054064310-13f6a8ecc7d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80"    ,description:"He defines himself as straight. He has a degree in chemistry. He is allergic to milk. He has a severe phobia of cats"  }
];

async function seedDB(){
	try{
		await Photo.remove({});
		await Comment.remove({});
		
		// for(const seed of seeds){
		// 	let photo = await Photo.create(seed);
		// 	let comment = await Comment.create({
		// 		text: 'This is an awesome photo. I knd of wish I was there to see it.',
		// 		author: 'Leila'
		// 	})
		// 	photo.comments.push(comment);
		// 	photo.save();
		// }
	} catch (err) {
		console.log(err);
	};
};

module.exports = seedDB;