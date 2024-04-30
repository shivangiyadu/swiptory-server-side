
const Story =require("../models/createStoryModel");
const User=require("../models/user")

exports.LikeStory = async (req, res) => {
    const userId = req.user.userId;
    const storyId = req.params.id;
    try {
        const story = await Story.findById(storyId);
        const user = await User.findById(userId);
      
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userIdString = userId.toString();
        const alreadyLiked = story.liked_by_ids.map(id => id.toString()).includes(userIdString);

        if (alreadyLiked) {
            story.like_counter--;
            story.liked_by_ids = story.liked_by_ids.filter(id => id.toString() !== userIdString);
        } else {
            story.like_counter++;
            story.liked_by_ids.push(userId);
        }

        await story.save();
        const liked = !alreadyLiked;
        return res.status(200).json({ success: true, message: 'Story like status updated successfully', liked });
    } catch (error) {
        console.error('Error Liking story:', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

