import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    content: {type: String, require: true},
    imgUrl: {type: String, require: true},
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    viewsCount: {type: Number, default: 0}
},
{
    timestamps: true,
}
);

export default mongoose.model('Post', PostSchema);