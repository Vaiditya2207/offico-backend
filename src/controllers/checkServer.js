import checkDb from "../db/checkDb.js"

const checkServer = async () => {
    try{
        const dbStatus = await checkDb();
        console.log(`Database connection status: ${dbStatus ? "OK" : "Error"}`);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

export default checkServer;