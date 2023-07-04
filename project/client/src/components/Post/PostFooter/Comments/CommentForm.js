import { useState } from "react";
import "./commentform.css";
import { useNavigate } from "react-router-dom";


export default function CommentForm({props}) {
    const navigate = useNavigate();
    const {_id} = props;
    const [comment, setComment] = useState('');

    async function handleComment(ev) {
        ev.preventDefault();
        if(comment.trim() === '') {
            alert("Please add text");
        } else {
            await fetch(`http://localhost:5000/post/comment/:${_id}`, {
                "method": "POST",
                body: JSON.stringify({comment}),
                headers: {
                    'content-type': 'application/json',
                },
                credentials: "include",
            }).then(resp => resp.json()).then(info => {
                console.log(info);
                if(info) {
                    setComment('');
                    return navigate(0);
                }
            })
        }
    }
    return (
        <div className="comment-form">
            <form onSubmit={handleComment}>
                <input className="add-comment-text" type="text" placeholder="add comment"
                value={comment} onChange={ev => {setComment(ev.target.value)}}/>
                <button className="add-comment-btn">
                <span className="material-symbols-outlined add-comment-btn-symbol">add</span>
                </button>
            </form>
        </div>
    ); 
}