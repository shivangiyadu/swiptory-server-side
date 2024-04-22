const express=require("express");
const router=express.Router();

const middleware=require("../middlewares/verifyToken");
const createStoryController=require('../controllers/CreateStoryController');
router.post("/createStory",middleware,createStoryController.createStory);

module.exports=router;