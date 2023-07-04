import "./commentswall.css";
import OneComment from "../OneComment/OneComment";
import { useEffect, useState } from "react";


export default function CommentsWall(props) {
    const [comments, setComments] = useState([]);
    const { id } = props; 
    useEffect(() => {
        fetch(`http://localhost:5000/comments/:${id}`, {
            "method": "GET",
            headers: {
                'content-tipe': "application/json",
            },
        }).then(resp => resp.json()).then(info => {
            console.log(info);
            setComments(info);
        })
    }, []);
    return <div className="comments-wall">
        {comments.map(commentInfo => {
            return < OneComment props={commentInfo} key={commentInfo._id}/>
        })}
    </div>
}