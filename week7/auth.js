const jwt = require("jsonwebtoken");
const JWT_Secret = "DAMN!@#"

function auth(req,res,next){
    const token = req.headers.token ;
    const decoded = jwt.verify(token,JWT_Secret) ;
    
    if (decoded){
        req.userid = decoded.id ;
        next();
    }
    else{
        res.status(403).send({
            msg : "bad credentials"
        });
    }
}


module.exports= {
    auth,
    JWT_Secret
} ;