import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {type: String, require: false},
    lastName: {type: String, require: false},
    gender: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    avatar: {type: String, require: true},
},
{
    timestamps: true,
}
);

export default mongoose.model("User", UserSchema);