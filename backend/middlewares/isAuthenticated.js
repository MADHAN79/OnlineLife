import jwt from "jsonwebtoken";
const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:'User not authenticated',
                success:false
            });
        }

        //with the help of secret key i am verifying/matching the user's token, if fails message 'Invalid Token'.
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:'Invalid',
                success:false
            });
        }
        req.id = decode.userId;
        next();//its used to call the next middleware function if response of current middleware is not terminated. https://www.geeksforgeeks.org/what-is-the-use-of-next-function-in-express-js/
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;