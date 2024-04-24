
const { decode } = require('jsonwebtoken');
const Story=require('../models/createStoryModel');
const { json } = require('body-parser');

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
    if(!story)        
    { 
        return res.status(404).json({success:false,error:"Story not Found"});

    }    
        story.slides=slides;
        story.category=category;
        await story.save();
        res.status(200).json({
            success:true,
            data:story
        });
    }
    catch(error){
        res.status(500).json({success:false,error:'Internal Server Error'})

    }
}; 

exports.getStoryByCategory=async(req,res)=>{
    try{
        const {category}=req.params;
        
        if(!category)
        {
            return res.status().json({
                success:false,
                message:"Category not found "
            })
        }
        const stories=await Story.find({category})

        if(stories.length===0)
        {
            return res.status(404).json({
                success:false,
                message:`No Story found for this category :${category}`,
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message:"Story found for this category",
                data:stories,
            })
        }
    }
    catch(error){
        console.log("Error while Fetching the story:",error);
        res.status(500).json({success:false,
        message:"Internal server error"})

    }

}
exports.getMySotry=async(req,res)=>{
    
    try{
   const {userId}=req.user.id;
    const {story_created_by}=req.params;

    if(userId!==story_created_by)
    {
       
       return res.status(403).json({
        success:false,
        message:"You're not authorized to view this Story",
       })
    }
    const stories=await Story.find({story_created_by})
    return res.status.json({
        success:false,
        data:stories,
        message:`Stories created by ${story_created_by} found`
    })
}
catch(error){
    console.log("Error while Fetching the story:",error);
    res.status(500).json({success:false,
    message:"Internal server error"})

}
}