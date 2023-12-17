import mongoose from "mongoose";
import {User} from "../models/user";


export const connectDb=async()=>{
    try{
        const {connection}=await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:'rmsNextJs',
        });
        console.log('||----->DB CONNECTED<-----||');


    }
    catch (e) {
        console.log('failed to connected to db');
        console.log(e);

    }
}