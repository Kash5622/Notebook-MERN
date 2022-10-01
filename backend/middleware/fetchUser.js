const jwt = require('jsonwebtoken');
const jwt_security="IamKaushik"

const fetchuser= (req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
        res.status(400).send({error:"Please enter valid auth-token"});
    }
    try {
        const data= jwt.verify(token,jwt_security);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please enter valid auth-token"});
    }
}

module.exports=fetchuser;