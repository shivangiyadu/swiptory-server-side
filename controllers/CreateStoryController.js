
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
        const userId=req.user.userId;// fetched user Id 
       console.log(id);
    let story=await Story.findById(id); 
    if(!story)        
    { 
        return res.status(404).json({success:false,error:"Story not Found"});

    }    
    if(story.story_created_by != userId){                                 // ye condtion check krne ke liye ki jo story edit kr raha hai vo usi ne banayi thi 
        return res.status(404).json({success:false,error:"Permission denied , story not created by user "});  
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
        console.log("Error while editing story:",error);
        res.status(500).json({success:false,error:'Internal Server Error'})

    }
}; 

exports.getStoryByCategory = async (req, res) => {
    try {
        const { category } = req.params; // Access category directly from req.params
        let query = {};

        if (category) {
            query.category = category;
        }

        const stories = await Story.find(query); // Use query directly in find()

        console.log(category);
        console.log(stories);

        if (stories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No stories found for this category"
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Stories found for this category",
                data: stories
            });
        }
    } catch (error) {
        console.log("Error while fetching the story:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.getMySotry=async(req,res)=>{   
    try{
   const userId=req.user.userId; //req.user.id apne ye likha tha that is not how middleware mai attach kra hai , object 
   console.log(userId);
   const stories=await Story.find({story_created_by:userId});
   console.log(stories);
    if(stories.length===0)
    {
        return res.status(404).json({
            success:false,
            message:"No Stories Found for the user",
        });
    }
    // const creator=stories.find(story=>story.story_created_by!==userId);
    //     if (creator){    
    //    return res.status(403).json({                                      
    //     success:false,                                                        // this is not required because hum id ke basis pr hi to fetch kr rahe hai to ..obvious baat hai ki uski hi stories hai , thats why ye required nahi hai 
    //     message:"You're not authorized to view this Story",
    //    })
    // }
    
    return res.status(200).json({           // yaha pr typo tha res.status.json 
        success:true,
        data:stories,
        message:"Stories created by found",
    })
}
catch(error){
    console.log("Error while Fetching the story:",error);
    res.status(500).json({success:false,
    message:"Internal server error"})

}
}

exports.getStoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await Story.findById(id);

        if (story) {
            return res.status(200).json({
                success: true,
                data: story,
                message: "Story found",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Story not found",
            });
        }
    } catch (error) {
        console.log("Error while Fetching the story:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
