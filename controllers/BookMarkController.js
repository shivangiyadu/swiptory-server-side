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
      story.bookmarks.push(userId);

      await story.save();
       return res.status(200).json({success:true,message:"Story bookmarked successfully"});
        

    }
     catch(error){
        console.error("Error while bookmarking story: ",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error',
        })

     }
  
}