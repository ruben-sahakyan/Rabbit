import "./post.css";
import { useEffect, useState } from "react";
// import Comment from "../Comment/Comment";
import EditPost from "./EditPost/EditPost";
import AddComment from "./AddComment/AddComment";
// import OneComment from "./OneComment/OneComment";
import { useNavigate } from "react-router-dom";
import CommentsWall from "./CommentsWall/CommentsWall";
import PersonalPage from "../PersonalPage/PersonalPage";

export default function Post({props}) {
    const navigate = useNavigate();
    const {content, imgUrl, autor, _id} = props;
    const [auth, setAuth] = useState(false);
    const [like, setLike] = useState(false);
    const [clientState, setClientState] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [addComment, setAddComment] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [editPostModalWindow, setEditPostModalWindow] = useState(false);
    useEffect(() => {
      fetch(`http://localhost:5000/post/:${_id}`, {
        "method": "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }).then(resp => resp.json()).then(info => {
        console.log(info.likeState);
        console.log(Boolean(info.likeState));
        setClientState(info.clientState);
        setAuth(info.auth);
        setCommentCount(info.commentsCount);
        setLike(info.likeState);
        setLikeCount(info.likesCount);
      })
    }, []);

async function deletePost(ev) {
  ev.preventDefault();
  await fetch(`http://localhost:5000/post/:${_id}`, {
    "method": "DELETE",
    credentials: "include",
  }).then(resp => resp.json()).then(info => {
    if(info) {
      return navigate(0);
    }
  })
};

async function likePost(ev) {
  ev.preventDefault();
  setLike(!like);
  await fetch(`http://localhost:5000/post/like/:${_id}`, {
    "method": "POST",
    body: JSON.stringify({like}),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  })
};


    const editorDeletePost = (ev) => {
      ev.preventDefault();
      setEditPostModalWindow(!editPostModalWindow);
    };

    const openCommentForm = (ev) => {
      ev.preventDefault();
      setAddComment(!addComment);
    }
    
    const showAllComments = (ev) => {
      ev.preventDefault();
      setShowComments(!showComments);
    }

    function goToPersonalPage(ev) {
      ev.preventDefault();
      navigate(`personalpage/${autor._id}`);
    }

    return (
        <div className='one-post'>
        {editPostModalWindow ? ( < EditPost id={_id} content={content}/>) : <></>}
        
        <div className="one-post-header">
  
          <div className="post-autor" onClick={goToPersonalPage}>
            <div className="post-autor-avatar">
              <img className="post-autor-avatar-img" src={`http://localhost:5000/uploads/${autor.avatar}`} alt="avatar"/>
            </div>
          </div>
  
          <div className="post-info">
            <p>{autor.email}</p>
            <p> Create 24.05.2023</p>
          </div>

          {auth ? (
            <div className="post-edit-delete">
              <button className="post-edit-btn" onClick={editorDeletePost}>
                <span className="material-symbols-outlined edit-symbol">edit</span>
              </button>
              <button className="post-delete-btn" onClick={deletePost}>
                <span className="material-symbols-outlined delete-symbol">delete</span>
                </button>
            </div>
          ) : <></>}
        </div>

        <div className="one-post-body">
          <img className="post-image" src={`http://localhost:5000/uploads/${imgUrl}`} alt="img"/>
        </div>
        <div className="one-post-like-and-comment-section">
          {clientState ? (
              <div className="one-post-like-btn" onClick={likePost}>
              <span className={like ? "material-symbols-outlined like-symbol-like" : "material-symbols-outlined like-symbol"}>favorite</span>
              <p>{likeCount}</p>
              </div>
          ) : (
            <div className="one-post-like-btn">
              <span className="material-symbols-outlined like-symbol-deactive">favorite</span>
              <p>{likeCount}</p>
            </div>
          )}
          <div className="one-post-comment-btn" onClick={openCommentForm}>
          <span className="material-symbols-outlined comment-symbol">mode_comment</span>

          <p>{commentCount}</p>

          </div>
        </div>

        <div className="one-post-footer">
          <div className="one-post-content">
            <p className="one-post-content-text">
              {content}
            </p>
          </div>
          {addComment ? (
            < AddComment id={_id}/>
          ) : <></>}

          <div className="show-all-comments-btn" onClick={showAllComments}>

          <span className={showComments ? "material-symbols-outlined more-symbol-close" : "material-symbols-outlined more-symbol-open"}>expand_more</span>
          </div>
        </div>
        {showComments ? (< CommentsWall id={_id}/>) : <></>}
      </div>
    );
  }