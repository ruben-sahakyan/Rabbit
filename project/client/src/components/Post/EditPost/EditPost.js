import { useState } from "react";
import "./editpost.css";
import { useNavigate } from "react-router-dom";


export default function EditPost({props}) {
    const navigate = useNavigate();
    const { content, _id } = props;
    const [editContent, setEditContent] = useState(content);
    const [editFile, setEditFile] = useState('');
    async function changePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('content', editContent);
        data.set('file', editFile);
        await fetch(`http://localhost:5000/post/:${_id}`, {
            "method": "PUT",
            body: data,
            credentials: "include",
        }).then(resp => resp.json()).then(info => {
            console.log(info);
            if(info) {
                return navigate(0);
            }
        })
    }
    return (
        <div className="edit-post-modal-window">
            <form onSubmit={changePost}>
                <input className="edit-post-content" type="text" value={editContent}
                 onChange={ev => {setEditContent(ev.target.value)}}/>
                <div className="edit-post-file-section">
                    <label className="edit-post-file-label">
                    <span className="material-symbols-outlined upload-file-symbol">upload_file</span>
                    <p className="edit-upload-file-name">{editFile ? editFile.name : ''}</p>
                    </label>
                    <input className={editFile ? "edit-file-active" : "edit-post-file"} type="file"
                     onChange={ev => {setEditFile(ev.target.files[0])}}/>
                </div>
                <button className="edit-post-btn">Change</button>
            </form>
        </div>
    );
}