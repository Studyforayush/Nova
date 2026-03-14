import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    videoUrl:{
        type:String
    },
    imgUrl:{
        type:String
    }
},{timestamps:true});
const videoModel =  mongoose.model("Videos", videoSchema,'videos');
export default videoModel;