
const Story=require('../models/createStoryModel');

exports.createStory=async(req,res)=>{
    try{
         const {slides,category}=req.body;

         const story_created_by=req.user.userId
         console.log("user object ",req.user);
         console.log(story_created_by,"story created by ");
           
        const story=new Story({
            slides,
            category,
            story_created_by
        });
        await story.save();
    
    res.status(201).json({ success: true, data: story });
    }
    catch (error) {
    
    console.error('Error creating story:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.editStory=async(req,res)=>{
    try{
        const {id}=req.params;
        const {slides,category}=req.body;

        let story=await Story.findById(id);
        story.slides=slides;
        story.category=category;
    }
    catch(error){
        res.status(500).json({success:false,error:'Internal Server Error'})

    }
}; 
