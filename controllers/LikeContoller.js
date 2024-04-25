
const Story =require("../models/createStoryModel");
const User=require("../models/user")

exports.LikeStory=async(req,res)=>{
   
    
    const userId=req.user.userId;
    const storyId=req.params.id;
    try{
        const story=await Story.findById(storyId);
        const user=await User.findById(userId);

        if(!story)
        {
            return res.status(404).json({message:"Story not found"});
        }
        if(!user)
        {
            return res.status(404).json({message:"User Not Found"});
        }
        if(story.liked_by_ids.includes(userId))
        {
            return res.status(400).json({success:false,message:"You Have already liked this story"});
        }
        story.like_counter++;
        story.liked_by_ids.push(userId);

        await story.save();

        return res.status(200).json({
            success:true,message:'Story liked Successfully'
        })
    }
catch(error)
{
     console.error('Error Liking story:',error);
     return res.status(500).json({
        success:false,
        message:"Internal Server Error"
     })
}
}