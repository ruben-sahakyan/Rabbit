import { useContext, useEffect, useState} from "react";
import "./post.css";
import { editPostModalWindowProvider } from "../UseContext";
import PostHeader from "./PostHeader/PostHeader";
import PostFooter from "./PostFooter/PostFooter";
import EditPost from "././EditPost/EditPost";
import { useNavigate } from "react-router-dom";


export default function Post({props}) {
    const navigate = useNavigate();
    const {_id, autor, imgUrl, content} = props;
    const [postAuth, setPostAuth] = useState(false);
    const [editModalWindow, setEditModalWindow] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/post/:${_id}`, {
            "method": "GET",
            headers: {
                'content-type': "application/json",
            },
            credentials: "include",
        }).then(resp => resp.json()).then(info => {
            console.log(info);
            setPostAuth(info);
        })
    }, []);
    function editPost(ev) {
        ev.preventDefault();
        setEditModalWindow(!editModalWindow);
    };
    async function deletePost(ev) {
        ev.preventDefault();
        await fetch(`http://localhost:5000/post/${_id}`, {
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
    return (
        <div className="one-post">
            <div className="one-post-header">
                <div className="post-autor">
                <div className="post-autor-avatar">
                    <img className="post-autor-avatar-img" src={`http://localhost:5000/uploads/${autor.avatar}`} alt="img"/>
                </div>
                <div className="post-autor-info">
                    <p className="post-autor-name">{autor.email}</p>
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
            {editModalWindow ? < EditPost props={props}/> : <></>}
            <div className="one-post-body">
                <img className="post-image" src={`http://localhost:5000/uploads/${imgUrl}`} alt="img"/>
            </div>
            < PostFooter props={props}/>
        </div>
    );
}

