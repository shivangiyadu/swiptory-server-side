
const Story=require('../models/createStoryModel');

exports.createStory=async(req,res)=>{
    try{
         const {slides,category}=req.body;

         const story_created_by=req.user.id
           
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