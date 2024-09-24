import mongoose from "mongoose"

const dbConnect = () =>{
   mongoose.connect(process.env.MONGO_URI, {
       dbName: process.env.DBNAME
   }).then(() => {
       console.log("Connected....");
   }).catch((e) => {
       console.log(`Error connecting ${e}`);
   })
}

export default dbConnect;
