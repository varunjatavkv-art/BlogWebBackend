import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {
    try {
        const token = req.header("Authorization");
        if(!token) {
          return res.status(401).json({error: "token not found"});
        };
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);
        if(!verified){
          return res.status(401).json({error: "token is not verified !!"});
        }
        req.userId = verified.id
        next();
    } catch (error) {
        res.status(401).json({error: "error in verifying token"});
    }
}