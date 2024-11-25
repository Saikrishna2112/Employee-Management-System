const jwt  = require('jsonwebtoken');

const auth =(req,res,next)=>{

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Token is missing"})
    }
    jwt.verify(token,process.env.SECURITY_CODE,(err,decoded)=>{
        if(err){
            res.status(403).json({message:"Authorization failed"})
        }
        else{
            req.username = decoded.username;
            res.status(200);
            next();
        }
    })

}

module.exports= auth;