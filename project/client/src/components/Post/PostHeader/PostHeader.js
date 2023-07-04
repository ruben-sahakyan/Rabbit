import { useEffect, useState, useContext } from "react";
import "./postheader.css";
import { useNavigate } from "react-router-dom";



export default function PostHeader({autor, postAuth, id}) {
    const navigate = useNavigate();
    const {email, avatar} = autor;
    function editPost(ev) {
        ev.preventDefault();
        alert('edit medit');
    };
    async function deletePost(ev) {
        ev.preventDefault();
        await fetch(`http://localhost:5000/post/${id}`, {
            "method": "DELETE",
            headers: {
                'content-type': "application/json"
            },
            credentials: "include",
        }).then(resp => resp.json()).then(info => {
            if(info) {
                return navigate(0);
            }
        })
    }
    return <div className="one-post-header">
        <div className="post-autor">
            <div className="post-autor-avatar">
                <img className="post-autor-avatar-img" src={`http://localhost:5000/uploads/${avatar}`} alt="img"/>
            </div>
            <div className="post-autor-info">
                <p className="post-autor-name">{email}</p>
            </div>
        </div>
        <div className="post-change">
            {postAuth ? (
                <>
                <div onClick={editPost}>
                <span className="material-symbols-outlined edit-symbol">edit</span>
                </div>
                <div onClick={deletePost}>
                <span className="material-symbols-outlined delete-symbol">delete</span>
                </div>
                </>
            ) : (
                <></>
            )}
        </div>
    </div>
}