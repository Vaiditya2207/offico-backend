import dotenv from 'dotenv'
dotenv.config();

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    const key = process.env.SERVER_AUTH_KEY;
    if (authorization === `Bearer ${key}`) {
        next();
    }else{
        res.status(401).json({message: 'Missing Authorization Key'});
    }
}


export default auth;