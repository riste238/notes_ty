import "dotenv/config";
import env from './util/validateEnv';
import mongoose from "mongoose";
import app from './app';
// import userModel from "./model/Model";

// console.log(User);

const port = env.PORT;

mongoose.connect(env.MONGO_URL)
.then(() => {
    console.log("Mongoose is connected!");
    app.listen(port, () => {
        console.log('Listening to port 5000');
        
    })
})
.catch(console.error);

// 1.09

