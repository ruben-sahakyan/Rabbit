import CommentForm from "./Comments/CommentForm";
import OneComment from "./Comments/OneComment/OneComment";
import "./postfooter.css";
import { useState } from "react";
 

export default function PostFooter({props}) {
    let commm = [1, 2, 3, 4, 5];
    const { _id, content } = props;
    const [commentForm, setCommentForm] = useState(false);
    const [showAllComments, setShowAllComments] = useState(false);
    function showComments(ev) {
        ev.preventDefault();
        setShowAllComments(!showAllComments);
    }
    function addCommentForm(ev) {
        ev.preventDefault();
        setCommentForm(!commentForm);
    }
    return (
        <div className="one-post-footer">
            <div className="like-and-comments-section">
                <div className="post-like">
                <span className="material-symbols-outlined like-symbol">favorite</span>
                <p className="post-like-count">123</p>
                </div>
                <div className="post-comment" onClick={addCommentForm}>
                <span className="material-symbols-outlined comment-symbol">comment</span>
                <p className="post-comment-count">32</p>
                </div>
            </div>
            <div className="one-post-content">
                <p>{content}</p>
            </div>
            {commentForm ? (<CommentForm props={props}/>) : <></>}
            <button className="show-all-comments" onClick={showComments}>Show Comments</button>
            {showAllComments ? (
                <>
                {commm.map(el => {
                    return <OneComment/>
                })}
                </>
            ) : <></>}
        </div>
    );
}