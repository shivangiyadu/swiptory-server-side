const express=require("express");
const router=express.Router();

const middleware=require("../middlewares/verifyToken");
const createStoryController=require('../controllers/CreateStoryController');
const likeController=require("../controllers/LikeContoller");
const bookmarked=require("../controllers/BookMarkController");

router.post("/createStory",middleware,createStoryController.createStory);

router.put("/editStory/:id",middleware,createStoryController.editStory);

router.get('/getStory/:category',createStoryController.getStoryByCategory);

router.get('/getMyStory',middleware,createStoryController.getMySotry);

router.get('/user/story/:id',middleware,createStoryController.getStoryById);

router.put('/like/:id',middleware,likeController.LikeStory);

router.post("/bookmarkStory/:id",middleware,bookmarked.bookmarkStory);
// router.post("/removeBookmark/:id",middleware,bookmarked.removeBookmark);
router.get("/view/BookmarkedStory",middleware,bookmarked.getBookmarkedStories);


module.exports=router;