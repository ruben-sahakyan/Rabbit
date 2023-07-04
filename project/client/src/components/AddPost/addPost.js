import "./addpost.css";
import { useState, useContext} from "react";
import { addPostModalContext } from "../UseContext";
import { useNavigate } from "react-router-dom";


export default function AddPost() {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [uploadFile, setUploadFile] = useState(''); 

    const {modalState, setModalState} = useContext(addPostModalContext);

    const [emptyContent, setEmptyContent] = useState(false);
    function closeModalWindow(ev) {
        ev.preventDefault();
        setModalState(false);
    }
    async function handlePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('content', content);
        data.set('file', uploadFile);
        if(content.trim() === '') {
            setEmptyContent(true);
        } else {
            await fetch('http://localhost:5000/addpost', {
                "method": "POST",
                body: data,
                credentials: "include",
            }).then(resp => resp.json()).then(info => {
                if(info) {
                    setModalState(false);
                    return navigate(0);
                }
            })
        }
    }
    return <div className="add-post">
            <p className="error-text add-post-error-text">{emptyContent ? 'Please add content' : ''}</p>
            <form className="add-post-form" onSubmit={handlePost}>

                <input className="add-post-content" type="text" placeholder="add-content" value={content}
                onChange={ev => {setContent(ev.target.value)}}/>

                <div className="add-post-file-section">
                    <label className="add-post-file-label">
                        <span className={uploadFile ? "material-symbols-outlined file-symbol file-symbol-upload" : "material-symbols-outlined file-symbol"}>upload_file</span>
                        <p className="add-post-upload-file-name">{uploadFile ? uploadFile.name : ''}</p>
                    </label>
                    <input className="add-post-upload-file" type="file" onChange={ev => {setUploadFile(ev.target.files[0])}}/>
                </div>
                <button className="add-post-btn">Add</button>
            </form>
    </div>
};