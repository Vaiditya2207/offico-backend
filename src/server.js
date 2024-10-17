import express from "express";
import dotenv from "dotenv";
import getRoutes from "./controllers/routeController.js";
import serverAuthorization from "./middleware/serverAuthorization.js";
import checkServer from "./controllers/checkServer.js";

dotenv.config();

const port = process.env.SERVER_PORT || 8000;
const app = express();

app.use(express.json());
app.use(serverAuthorization);


async function startServer(){
    try{
        const status = await checkServer();
        if(!status){
            console.error("Stopping the server");
            return null;
        }
        const routes = await getRoutes();
        routes.forEach((route) => {
            app[route.method](`/api/${route.path}`, route.handler);
        });
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }

}


app.listen(port, async () => {
    const status = await startServer();
    if(status){
        console.log(`Server is running on port ${port}`);
    }else{
        console.log(`Server failed to start on port ${port}`)
        process.exit(1);
    }
})