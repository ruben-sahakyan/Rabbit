import "./signup.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [errorText, setErrorText] = useState(false);
    const [file, setFile] = useState('');

    const [errorValueFirstName, setErrorValueFirstName] = useState(false);
    const [errorValueLastName, setErrorValueLastName] = useState(false);
    const [errorValueEmail, setErrorValueEmail] = useState(false);
    const [errorValuePassword, setErrorValuePassword] = useState(false);
    const [errorValueGender, setErrorValueGender] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/signup', {
            "method": "GET",
            credentials: "include",
        }).then(resp => resp.json()).then(info => {
            if(!info) {
                return navigate('/');
            }
        })
    }, []);

    async function handleSignUp(ev) {
        ev.preventDefault();
        if(firstName.trim() === '') {
            setErrorValueFirstName(true);
        } else if(lastName.trim() === '') {
            setErrorValueLastName(true);
        } else if(email.trim() === '') {
            setErrorValueEmail(true);
        } else if(password.trim() === '') {
            setErrorValuePassword(true);
        } else if(gender === '') {
            setErrorValueGender(true);
        } else {
            const data = new FormData();
            data.set("firstName", firstName);
            data.set("lastName", lastName);
            data.set("email", email);
            data.set("password", password);
            data.set("file", file);
            data.set('gender', gender);
            fetch('http://localhost:5000/signup', {
                "method": "POST",
                body: data,
                credentials: "include",
            }).then(resp => resp.json()).then(info => {
                setErrorText(!Boolean(info));
                if(info) {
                    return navigate('/signin');
                }
            });
            setErrorValueEmail(false);
            setErrorValueFirstName(false);
            setErrorValueLastName(false);
            setErrorValuePassword(false);
            setErrorValueGender(false);

            setEmail('');
            setFirstName('');
            setLastName('');
            setPassword('');
            setGender('');
        }
    }
    return <div className="sign-up">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
            <p className="error-text">{errorText ? 'Incorrect email or password' : ''}</p>
            <input className={errorValueFirstName ? "input-text empty-value" : "input-text"} type="text" placeholder="first name" name="firstName" value={firstName}
             onChange={ev => {setFirstName(ev.target.value)}}/>
            <input className={errorValueLastName ? "input-text empty-value" : "input-text"} type="text" placeholder="last name" name="lastName" value={lastName} 
            onChange={ev => {setLastName(ev.target.value)}}/>
            <input className={errorValueEmail ? "input-text empty-value" : "input-text"} type="email" placeholder="email" name="email" value={email}
            onChange={ev => {setEmail(ev.target.value)}}/>
            <input className={errorValuePassword ? "input-text empty-value" : "input-text"} type="password" placeholder="password" name="password" value={password}
            onChange={ev => {setPassword(ev.target.value)}}/>
            <div className="input-file-section">
                <label className="input-file-label">
                <span className={file ? "material-symbols-outlined file-symbol file-symbol-upload" : "material-symbols-outlined file-symbol"}>upload_file</span>
                <p className="upload-file-name">{file ? file.name : ''}</p>
                </label>
                <input className="input-file" type="file" onChange={ev => {setFile(ev.target.files[0])}}/>
            </div>
            <div className="gender-state">
                <label className="rabio-btn">
                    <input className="input-radio" type="radio" value="male" name="gender"
                     onChange={ev => {setGender(ev.target.value)}}/>
                    <span className={errorValueGender ? "material-symbols-outlined gender-symbol empty-gender" : "material-symbols-outlined gender-symbol"}>man</span>
                </label>
                <label className="radio-btn">
                    <input className="input-radio" type="radio" value="female" name="gender"
                     onChange={ev => {setGender(ev.target.value)}}/>
                    <span className={errorValueGender ? "material-symbols-outlined gender-symbol empty-gender" : "material-symbols-outlined gender-symbol"}>woman</span>
                </label>
            </div>
            <button className="signup-btn">
                <span className="material-symbols-outlined signup-btn-symbol">add</span>
            </button>
        </form>
        <p className="sign-in-href">Already have an account? <Link to="/signin" className="sign-in-href-link">Sign In</Link></p>
    </div>
}
