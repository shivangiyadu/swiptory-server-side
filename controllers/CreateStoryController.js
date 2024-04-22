
const Story=require('../models/createStoryModel');

exports.createStory=async(req,res)=>{
    try{
        const {heading, description,imageUrl,category,userId}=req.body;
           
        const story=new Story({
            heading,
            description,
            imageUrl,
            category,
            createdBy:userId,
        });
        await story.save();
    
    res.status(201).json({ success: true, data: story });
    }
    catch (error) {
    
    console.error('Error creating story:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};