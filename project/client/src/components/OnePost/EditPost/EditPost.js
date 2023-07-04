import { useState } from "react";
import "./editpost.css";
import { useNavigate } from "react-router-dom";


export default function EditPost(props) {
    const navigate = useNavigate();
    const { id, content } = props;
    const [editContent, setEditContent] = useState(content);
    const [file, setFile] = useState('');
    async function handleEditPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set("content", editContent);
        data.set("file", file);
        await fetch(`http://localhost:5000/post/:${id}`, {
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
    return <div className="edit-post">
        <form onSubmit={handleEditPost}>
            <input className="edit-content-text" type="text" value={editContent}
             onChange={ev => {setEditContent(ev.target.value)}}/>
            <div className="edit-file">
                <label className="upload-file-label">
                    <span className={file ? "material-symbols-outlined upload-symbol-upload" : "material-symbols-outlined upload-symbol"}>upload_file</span>
                </label>
                <input className="upload-edit-file" type="file" 
                onChange={ev => {setFile(ev.target.files[0])}}/>
                <p className="upload-file-name">{file.name}</p>
            </div>
            <button className="add-edit-post-btn">
                <span className="material-symbols-outlined add-edit-symbol">add</span>
            </button>
        </form>
    </div>
}