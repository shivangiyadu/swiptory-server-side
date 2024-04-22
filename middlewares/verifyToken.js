
const jwt=require("jsonwebtoken");
const verifyToken=(req,res,next)=>{
    const headerToken=req.headers["authorization"];
    console.log(headerToken)
    try{
        const headerToken=req.headers["authorization"];
        
        if(!headerToken)
        {
            return res.status(401).json({message:"Unauthorized access"});
        }
        const decode=jwt.verify(headerToken.split(" ")[1],process.env.SECRET_KEY);
        req.userId=decode
        next();
    }
    catch(error)
    {
        console,log(error);
        res.status(401).json({errorMessage:"Invalid Token!"});
    }
}

module.exports=verifyToken;