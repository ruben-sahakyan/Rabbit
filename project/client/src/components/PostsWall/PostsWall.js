import "./postswall.css";
import Post from "../OnePost/Post";
import { useEffect, useState, useContext } from "react";
import PostSceleton from "../PostSceleton/PostSceleton";
import { userContext } from "../UseContext";
import AddPost from "../AddPost/addPost";

export default function PostsWall() {
    const [allPosts, setAllPosts] = useState([]);
    const {userState, setUserState} = useContext(userContext);
    useEffect(() => {
        fetch('http://localhost:5000/posts', {
            "method": "GET",
            headers: {
                "content-type": "application.json",
            },
            credentials: "include",
        }).then(resp => resp.json()).then(info => {
            setAllPosts(info);
        })
    }, []);
    return (
        <div className="posts-wall">
            {!userState ? <></> : (
                < AddPost />
            )}
            {allPosts.map(onePostInfo => {
                return < Post props={onePostInfo} key={onePostInfo._id}/>;
            })}
        </div>
    );
}