
const jwt=require("jsonwebtoken");
const verifyToken=(req,res,next)=>{

    // console.log("req",req);
    const headerToken=req.headers["authorization"];
    console.log(headerToken)
    try{
        const headerToken=req.headers["authorization"];
        
        if(!headerToken)
        {
            return res.status(401).json({message:"Unauthorized access"});
        }
        const token=jwt.verify(headerToken.split(" ")[1],process.env.SECRET_KEY);
        console.log("decode :",token.username);
        req.user=token
        next();
    }
    catch(error)
    {
        console.log(error);
        res.status(401).json({errorMessage:"Invalid Token!"});
    }
}

module.exports=verifyToken;