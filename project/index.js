import express from "express";
import cors from "cors";
import multer from "multer";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import fs from "fs";

import User from "./models/User.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import Like from "./models/Like.js";

//mongoDB password = AmQpaQoFiz1MDkI0
//mongoDB userName = ruben1987sahakyan

mongoose.connect("mongodb+srv://ruben1987sahakyan:AmQpaQoFiz1MDkI0@cluster0.acaulnu.mongodb.net/?retryWrites=true&w=majority")
.then(() => {console.log('ok db')})
.catch(err => {console.log(err)});

const app = express();

const jwtKey = "fajksfl49304283940sfkhdjfhakshflavkshdfvkljsedfhlv";



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


function checkAuth(req, res, next) {
    const { token } = req.cookies;
    if(token) {
        const userInfo = jwt.verify(token, jwtKey, {}, (error, info) => {
            if(error) {
                throw error
            } else {
                return info;
            }
        });
        const searchUser = usersDB.find(user => {return user.email === userInfo.email});
        if(searchUser) {
            return next();
        } else {
            return res.json(false);
        }
    }
}


app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    if(!token) {
        return res.json(false);
    } else {
        const userInfo = jwt.verify(token, jwtKey, {}, (error, info) => {
            if(error) {
                throw error
            } else {
                return info;
            }
        });
        const email = userInfo.email;
        const searchUser = await User.findOne({ email });
        return res.json(searchUser);
    }
});

app.post('/signup', upload.single('file'), async (req, res) => {
    const { firstName, lastName, gender, email, password} = req.body;
    const userImagedefault = gender === 'male' ? "male-face-character-4620357-3917173.webp" : "female-face-portrait-4620619-3917169.webp";
    const avatar = req.file ? req.file.originalname : userImagedefault;
    const checkForUnique = await User.findOne({email});
    if(checkForUnique) {
        res.json(false);
    } else {
        const userDetails = await User.create({
            firstName,
            lastName,
            gender,
            email,
            password,
            avatar,
        });
        res.json(userDetails);
    }
})

app.get('/signup', checkAuth, (req, res) => {
    res.json(false);
})


app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const checkValidUser = await User.findOne({email, password});
    console.log(checkValidUser);
    if(!checkValidUser) {
        return res.json(false);
    } else {
        jwt.sign({email, id: checkValidUser._id}, jwtKey, {}, (error, token) => {
            if(error) {
                throw error;
            } else {
                return res.cookie('token', token).json(checkValidUser);
            }
        });
    }
})

app.get('/signin', checkAuth, (req, res) => {
    return res.json(false);
})


app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})


app.post('/user/:id', (req, res) => {
    const { token } = req.cookies;
    console.log(req.body);
    res.json(true);
})


app.post('/addpost', upload.single('file'), async (req, res) => {
    const { token } = req.cookies;
    const { content } = req.body;
    const postImageUrl = req.file ? req.file.originalname : "bunnydefaultimage.png";
    const userInfo = jwt.verify(token, jwtKey, {}, (error, info) => {
        if(error) {
            throw error;
        } else {
            return info;
        }
    });
    const postDetails = await Post.create({
        content,
        autor: userInfo.id,
        imgUrl: postImageUrl
    })
    return res.json(postDetails);
});

app.get('/posts', async (req, res) => {
    const allPosts = await Post.find().populate('autor').exec();
    res.json(allPosts);
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    const onePostCommentsCount = await Comment.find({postId: id.slice(1)}).populate('autor').exec();
    const likesCount = (await Like.find({post: id.slice(1)})).reduce((accumulator, currentValue) => accumulator + currentValue.like, 0);
    console.log(`comment count = ${onePostCommentsCount.length}`);
    if(!token) {
        return res.json({auth: false, commentsCount: onePostCommentsCount.length, likesCount: likesCount, clientState: false});
    } else {
        const userInfo = jwt.verify(token, jwtKey, {}, (error, info) => {
            if(error) {
                throw error;
            } else {
                return info;
            }
            });

        const searhPost = await Post.findById(id.slice(1)).populate('autor').exec();
        const likeState = await Like.findOne({post: id.slice(1), autor: userInfo.id});
        if(userInfo.email === searhPost.autor.email) {
            return res.json({auth: true, commentsCount: onePostCommentsCount.length, likeState: likeState && likeState.like, likesCount: likesCount, clientState: true});
        } else {
            return res.json({auth: false, commentsCount: onePostCommentsCount.length, likeState: likeState && likeState.like, likesCount: likesCount, clientState: true});
        }
    }
});

app.put('/post/:id', upload.single('file'), async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    const { content } = req.body;
    console.log(`id = ${id}`);
    console.log(`token = ${token}`);
    console.log(`content = ${content}`);
    if(!token) {
        res.json(false);
    } else {
        const searhPost = await Post.findById(id.slice(1));
        if(searhPost) {
            const postImg = req.file ? req.file.originalname : searhPost.imgUrl;
            const changePost = await Post.findByIdAndUpdate(id.slice(1), {$set: {content, imgUrl: postImg}});
            return res.json(changePost);
        } else {
            return res.json(false);
        }
    }
});

app.delete('/post/:id', async(req, res) => {
    const { id } = req.params;
    const deletePost = await Post.findByIdAndRemove(id.slice(1));
    if(deletePost) {
        if(deletePost.imgUrl !== "bunnydefaultimage.png") {
            fs.unlinkSync(`uploads/${deletePost.imgUrl}`);
        }
        res.json(true)
    } else {
        res.json(false)
    }
})



app.post('/post/comment/:id', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const { token } = req.cookies;
    if(!token) {
        // return res.json(false);
        const addComment = await Comment.create({
            content: comment,
            postId: id.slice(1),
            autor: undefined,
            post: id.slice(1),
        });
        return res.json(addComment);
    } else {
        const commentAutor = jwt.verify(token, jwtKey, {}, (error, info) => {
            if(error) {
                throw error;
            } else {
                return info;
            }
        });
        console.log(commentAutor);
        console.log(commentAutor.id);
        const addComment = await Comment.create({
            content: comment,
            postId: id.slice(1),
            autor: commentAutor.id,
            post: id.slice(1),
        });
        if(addComment) {
            return res.json(true);
        } else {
            return res.json(false);
        }
    }
});


app.get('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const onePostComments = await Comment.find({postId: id.slice(1)}).populate('autor').exec();
    res.json(onePostComments);
});


app.post('/post/like/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    if(!token) {
        return res.json(false);
    } else {
        const likeAutor = jwt.verify(token, jwtKey, {}, (error, info) => {
            if(error) {
                throw error;
            } else {
                return info;
            }
        })
        const searchLikeAutor = await Like.findOne({post: id.slice(1), autor: likeAutor.id});
        if(searchLikeAutor === null) {
            const addlike = await Like.create({
                like: 1,
                autor: likeAutor.id,
                post: id.slice(1)
            })
            return res.json(addlike);
        } else {
            if(searchLikeAutor.like === 1) {
                const addDisLike = await Like.findOneAndUpdate({post: id.slice(1), autor: likeAutor.id}, {$inc: {like: -1}});
                return res.json(addDisLike);
            } else {
                const addLike = await Like.findOneAndUpdate({post: id.slice(1), autor: likeAutor.id}, {$inc: {like: 1}});
                return res.json(addLike);
            }
        }
    }
});

app.get('/personalpage/:id', async (req, res) => {
    const { id } = req.params;
    // const { token } = req.cookies;
    const userInfo = await User.findOne({_id: id.slice(1)});
    if(userInfo) {
        return res.json(userInfo);
    } else {
        return res.json(false);
    }
});

app.get('/userposts/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    const userPosts = await Post.find({autor: id.slice(1)}).populate('autor').exec();
    if(userPosts) {
        return res.json(userPosts);
    } else {
        return res.json(false);
    }
})

app.listen(5000, () => {
    console.log('Server is Run ))')
})