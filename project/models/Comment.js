import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    content: {type: String, require: true},
    postId: {type: String, require: true},
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        require: true
    },
},
{
    timestamps: true,
}
);


export default mongoose.model('Comment', CommentSchema);