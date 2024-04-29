const Story=require("../models/createStoryModel");
const User=require("../models/user");


exports.bookmarkStory = async (req, res) => {
  const userId = req.user.userId;
  const storyId = req.params.id;
  try {
      console.log(storyId);
      const story = await Story.findById(storyId);

      if (!story) {
          return res.status(404).json({
              success: false,
              message: "Story not found",
          });
      }

      console.log("Bookmarks:", story.bookmarks);
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({
              success: false,
              error: 'User not found',
          });
      }

      const index = user.bookmarked_stories.indexOf(storyId);
      if (index !== -1) {
          // Story is already bookmarked, so remove it
          user.bookmarked_stories.splice(index, 1);
          await user.save();
          return res.status(200).json({
              success: true,
              bookmarked:false,
              message: 'Story removed from bookmarks successfully',
          });
      } else {
          // Story is not bookmarked, so add it
          user.bookmarked_stories.push(storyId);
          await user.save();
          return res.status(200).json({
              success: true,
              bookmarked:true,
              message: 'Story bookmarked successfully',
          });
      }
  } catch (error) {
      console.error("Error while toggling bookmark status: ", error);
      return res.status(500).json({
          success: false,
          message: 'Internal server error',
      });
  }
};

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

        const bookmarkedStoryIds = user.bookmarked_stories.map(story => story._id);

        const bookmarkedStories = await Story.find({ _id: { $in: bookmarkedStoryIds } });

        res.status(200).json({ success: true, data: bookmarkedStories });
    } catch (error) {
        console.error('Error retrieving bookmarked stories:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
