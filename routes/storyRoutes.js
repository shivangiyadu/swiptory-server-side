const express=require("express");
const router=express.Router();

const createStoryController=require('../controllers/CreateStoryController');
router.post("/createStory",createStoryController.createStory);

module.exports=router;