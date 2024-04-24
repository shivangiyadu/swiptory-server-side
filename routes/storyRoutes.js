const express=require("express");
const router=express.Router();

const middleware=require("../middlewares/verifyToken");
const createStoryController=require('../controllers/CreateStoryController');

router.post("/createStory",middleware,createStoryController.createStory);

router.put("/editStory:id",middleware,createStoryController.editStory);

router.get('/getStory:category',createStoryController.getStoryByCategory);

router.get('/getMyStory',middleware,createStoryController.getMySotry);


module.exports=router;