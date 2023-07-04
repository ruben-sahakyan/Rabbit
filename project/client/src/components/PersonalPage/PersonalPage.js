import "./personalpage.css";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import PersonalPageWall from "./PersonalPageWall/PersonalPageWall";
import SettingsWindow from "./SettingsWindow/SettingsWindow";


export default function PersonalPage() {
    const [autorInfo, setAutorInfo] = useState({});
    const [avatarImg, setAvatarImg] = useState('');
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/personalpage/:${id}`, {
            "method": "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
        }).then(resp => resp.json()).then(info => {
            setAutorInfo(info);
        })
    }, []);
    // async function editAvatar(ev) {
    //     ev.preventDefault();
    //     const data = new FormData();
    //     data.set(avatarImg);
    //     await fetch(`http://localhost:5000/user/:${id}`, {
    //         "method": "POST",
    //         body: data,
    //         credentials: "include",
    //     }).then(resp => resp.json()).then(info => {
    //         console.log(info);
    //     })
    // }
    return (
        <>
        <div className="personal-page-header">
        <div className="personal-page-autor">
        <div className="edit-avatar">
        {/* <form onSubmit={editAvatar}>
        <input type="file" className="change-image-avatar" onChange={ev => setAvatarImg(ev.target.files[0])}/>
        </form> */}
        <div className="personal-page-autor-avatar">
                <img className="personal-page-autor-avatar-img" src={`http://localhost:5000/uploads/${autorInfo.avatar}`} alt="img"/>  
        </div>
        <span class="material-symbols-outlined edit-avatar-symbol">edit</span>
        </div>
        <div className="personal-page-autor-info">
            <p className="personal-page-autor-name">{autorInfo.firstName} {autorInfo.lastName}</p>
            <p className="personal-page-autor-gender">{autorInfo.gender}</p>
        </div>

        </div>
        <div className="personal-page-settings">
            <button className="personal-page-settings-btn">
            <span class="material-symbols-outlined personal-page-edit-symbol">edit</span>
            </button>
        </div>
        </div>
        < PersonalPageWall id={id}/>
        </>
        );
}

