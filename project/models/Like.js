import mongoose from "mongoose";


const LikeSchema = new mongoose.Schema({
    like: {type: Number, default: 0},
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        require: true
    }
});


export default mongoose.model("Like", LikeSchema);