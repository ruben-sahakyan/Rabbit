import "./signin.css";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userContext } from "../UseContext";

export default function SignIn() {
    const navigate = useNavigate();

    const {userState, setUserState} = useContext(userContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorValueEmail, setErrorValueEmail] = useState(false);
    const [errorValuePassword, setErrorValuePassword] = useState(false);

    const [errorText, setErrorText] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/signin', {
            "method": "GET",
            credentials: "include",
        }).then(resp => resp.json()).then(info => {
            if(!info) {
                return navigate('/');
            }
        })
    }, []);

    async function handleSignIn(ev) {
        ev.preventDefault();
        if(email.trim() === '') {
            setErrorValueEmail(true);
        } else if(password.trim() === '') {
            setErrorValuePassword(true);
        } else {
            fetch('http://localhost:5000/signin', {
                "method": "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    'content-type': "application/json",
                },
                credentials: "include",
            }).then(resp => resp.json()).then(info => {
                setErrorText(!Boolean(info));
                if(info) {
                    setUserState(info);
                    return navigate('/');
                }
            });
            setErrorValueEmail(false);
            setErrorValuePassword(false);
            setEmail('');
            setPassword('');
        }
    }
    return <div className="sign-in">
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
            <p className="error-text">{errorText ? 'Incorrect email or password' : ''}</p>

            <input className={errorValueEmail ? "input-text empty-value" : "input-text"} type="email" placeholder="email" name="email" value={email}
            onChange={ev => {setEmail(ev.target.value)}}/>

            <input className={errorValuePassword ? "input-text empty-value" : "input-text"} type="password" placeholder="password" name="password" value={password}
            onChange={ev => {setPassword(ev.target.value)}}/>

            <button className="signup-btn">
                <span className="material-symbols-outlined signup-btn-symbol">add</span>
            </button>
        </form>

        <p className="sign-in-href">Already have an account? <Link to="/signup" className="sign-in-href-link">Sign Up</Link></p>
    </div>
}