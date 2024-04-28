const Story=require("../models/createStoryModel");
const User=require("../models/user");


exports.bookmarkStory=async(req,res)=>{
    const userId=req.user.userId;
    const storyId=req.params.id;
    try{

        console.log(storyId);
        const story=await Story.find({storyId});

        if(!story)
        {
            return res.status.json({
                success:false,
                message:"Story not found",
            })
        }
      
      console.log("Bookmarks:",story.bookmarks);
      if (story.bookmarks.includes(userId)) {
        return res.status(400).json({ message: "Story already bookmarked by the user" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (!user.bookmarked_stories.includes(storyId)) {
      user.bookmarked_stories.push(storyId);
      await user.save();
    }
    res.status(200).json({ success: true, message: 'Story bookmarked successfully' });   

    }
     catch(error){
        console.error("Error while bookmarking story: ",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error',
        })

     }
  
}
exports.removeBookmark = async (req, res) => {
    try {
        const storyId=req.params.id;
        const userId = req.user.userId;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
  
      user.bookmarked_stories = user.bookmarked_stories.filter(id => id !== storyId);
      await user.save();
  
      res.status(200).json({ success: true, message: 'Story removed from bookmarks successfully' });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };
  exports.getBookmarkedStories = async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId).populate('bookmarked_stories');
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
  
      res.status(200).json({ success: true, data: user.bookmarked_stories });
    } catch (error) {
      console.error('Error retrieving bookmarked stories:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }; 