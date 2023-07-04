import { useEffect, useState } from "react";
import "./personalpagewall.css";
import Post from "../../OnePost/Post";

export default function PersonalPageWall({id}) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/userposts/:${id}`, {
            "method": "GET",
            headers: {
                'content-type': "application/json",
            },
            credentials: "include",
        }).then(resp => resp.json()).then(info => {
            setPosts(info);
        });
    }, []);
    return (
        <div className="personal-page-post-wall">
            {posts.map(post => {
                return < Post props={post}/>
            })}
        </div>
    );
}