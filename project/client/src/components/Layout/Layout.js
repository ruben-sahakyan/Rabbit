import { Link, Outlet, useNavigate } from "react-router-dom";
import "./layout.css";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../UseContext";
import Logo from "../../images/bunnylogo.png";
// import AddPost from "../AddPost/addPost";


export default function Layout() {
    const navigate = useNavigate();
    // const [active, setActive] = useState(false);
    // const {modalState, setModalState} = useContext(addPostModalContext);
    const {userState, setUserState} = useContext(userContext);
    useEffect(() => {
        fetch('http://localhost:5000/profile', {
            "method": "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
        }).then(resp => resp.json()).then(info => {
            setUserState(info);
        })
    }, []);
    function logOut(ev) {
        ev.preventDefault();
        fetch('http://localhost:5000/logout', {
            "method": "POST",
            credentials: "include",
        }).then(resp => resp.json()).then(info => {
            setUserState('');
            if(info) {
                return navigate(0);
            }
        })
    }
    return (
        <>
        <header>
            <Link className="header-home-href" to='/'>
                <img className="logo" src={Logo} alt="Rabbit"/>
            </Link>
            {!userState ? (
                <>
                <ul className="header-nav">
                    <Link className="header-signup-href" to="signin">
                        <li className="header-nav-signup">SignIn</li>
                    </Link>
                    <Link className="header-signin-href" to="signup">
                        <li className="header-nav-signin">SignUp</li>
                    </Link>
                </ul>
                </>
            ) : <div className="user-profile">
                    <div className="user-avatar-header">
                        <img className="avatar-image" src={`http://localhost:5000/uploads/${userState.avatar}`} alt="img"/>
                    </div>
                    <Link to={`personalpage/${userState._id}`} className="personalPage-link-header">
                        <div className="user-info-header">
                            <p className="user-info-text">
                                {userState.email}
                            </p>
                        </div>
                    </Link>
                    <div className="log-out" onClick={logOut}>
                    <span className="material-symbols-outlined logout-symbol">logout</span>
                    </div>
                </div>}
        </header>
        {/* {!userState ? <></> : (
            < AddPost />
        )} */}
        < Outlet />
        </>
    );
}