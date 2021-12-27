const accesstoken=process.env.ACCESS_TOKEN_SECRET;
const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token =authHeader && authHeader.split(' ')[1]
    if(!token) return res.sendStatus(401).json("No Token");

    jwt.verify(token, accesstoken, (err,user) =>
    {
        if(err) return res.sendStatus(403).json("Invalid Token");
        console.log(user);
        req.user_id=user.id;
        console.log(req.user_id);
        next()
    })    
}

module.exports=authenticateToken;