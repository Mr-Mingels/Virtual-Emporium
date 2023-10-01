import React, { FC, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { faWolfPackBattalion } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/Authentication.css'
import axios from 'axios';

interface AuthProps {
    handleAuthenticationClose: Function,
    isLoggedIn: boolean,
    getUserInfo: Function,
    userInfo: any,
    authNavigationOption: string
}

const Authentication: FC<AuthProps> = ({ handleAuthenticationClose, isLoggedIn, getUserInfo, userInfo, authNavigationOption }) => {
    const [authConfig, setAuthConfig] = useState('signUp');
    const [redEmailPlaceHolder, setRedEmailPlaceHolder] = useState(false);
    const [redPasswordPlaceholder, setRedPasswordPlaceholder] = useState(false);
    const [loader, setLoader] = useState(false);
    const [demoLoader, setDemoLoader] = useState(false)
    const [email, setEmail] = useState({
        value: "",
        placeholder: "Enter your email",
    });
    const [password, setPassword] = useState({
        value: "",
        placeholder: "Enter your password",
    });
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        setRedPasswordPlaceholder(false);
        setRedEmailPlaceHolder(false);
        setEmail({ ...email, value: "", placeholder: "Enter your email" });
        setPassword({ ...password, value: "", placeholder: "Enter your password" });
    }, [authConfig]);

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        if (demoLoader) return
        setLoader(true);
        if (email.value === "") {
            setRedEmailPlaceHolder(true);
            setEmail({ ...email, placeholder: "Please Fill Out This Field" });
        }
        if (password.value === "") {
            setRedPasswordPlaceholder(true);
            setPassword({ ...password, placeholder: "Please Fill Out This Field" });
        }
        if (password.value === "" || email.value === "") {
            setLoader(false);
            return;
        }

        const user = {
            email: email.value.toUpperCase(),
            password: password.value,
        };

        try {
            const path = authConfig === 'signUp' ? "sign-up-page" : "log-in-page";

            const response = await axios.post(`http://localhost:5000/${path}`, user, { withCredentials: true, });
            if (authConfig === 'signUp' && response.status === 200) {
                setAuthConfig('logIn')
                setEmail({ ...email, value: "" });
                setPassword({ ...password, value: "" });
            } else if (authConfig === "logIn" && response.status === 200) {
                await getUserInfo()
                handleAuthenticationClose(false)
                if (authNavigationOption) {
                    navigate(authNavigationOption)
                }
            }
            setLoader(false);
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error message: ", error.response.data.message);
                if (error.response.data.message === "Email is incorrect") {
                    setRedEmailPlaceHolder(true);
                    setEmail({ ...email, value: "", placeholder: "Incorrect email" });
                } else if (error.response.data.message === "Incorrect password") {
                    setRedPasswordPlaceholder(true);
                    setPassword({
                        ...password,
                        value: "",
                        placeholder: "Incorrect password",
                    });
                } else if (error.response.data.message === "Email has already been taken") {
                    setRedEmailPlaceHolder(true);
                    setEmail({
                        ...email,
                        value: "",
                        placeholder: "Email has already been taken",
                    });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error", error.message);
                }
                setLoader(false);
            }
        };
    }

    useEffect(() => {
        if (email.value !== "") {
            setRedEmailPlaceHolder(false);
            setEmail({ ...email, placeholder: "Enter your email" });
        }
    }, [email.value]);

    useEffect(() => {
        if (password.value !== "") {
            setRedPasswordPlaceholder(false);
            setPassword({ ...password, placeholder: "Enter your password" });
        }
    }, [password.value]);

    const demoAccountLogIn = async () => {
        if (loader) return
        setDemoLoader(true)
        const user = {
            email: "DEMOACCOUNT@GMAIL.COM",
            password: "1234",
        };
        try {
            const response = await axios.post(`http://localhost:5000/log-in-page`, user, { withCredentials: true });
            if (response.status === 200) {
                await getUserInfo()
                handleAuthenticationClose(false)
                if (authNavigationOption) {
                    navigate(authNavigationOption)
                }
            }
            setDemoLoader(false)
        } catch (err) {
            console.log(err);
            setDemoLoader(false)
        }
    };

    const logOut = async () => {
        setLoader(true)
        try {
            const response = await axios.get(`http://localhost:5000/log-out`, { withCredentials: true })
            if (response.status === 200) {
                await getUserInfo()
                if (location.pathname === '/cart' || location.pathname === '/wishlist') {
                    navigate('/')
                }
                handleAuthenticationClose(false)
            }
            setLoader(false)
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }

    return (
        <div className='authWrapper'>
            <div className={`authContent ${isLoggedIn ? 'logOut' : ''}`}>
                {isLoggedIn ? (
                    <>
                        <h5 className='authLogOutTitle'>Log Out</h5>
                        <div className='authLogOutTxtWrapper'>
                            <span className='authLogOutTxt accountInfo'>Account: {userInfo.email}</span>
                            <span className='authLogOutTxt'>Are you sure you want to log out of your account?</span>
                        </div>
                        <div className='authLogOutBtnsWrapper'>
                            {loader ? (
                                <button type='button' className="authLogOutBtns authLoader">
                                    <span className="btnLoader"></span>
                                </button>
                            ) : (
                                <button className='authLogOutBtns' onClick={() => logOut()}>LOG OUT</button>
                            )}
                            <button className='authLogOutBtns close'
                                onClick={loader ? undefined : () => handleAuthenticationClose(false)}>CLOSE</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='authLogoWrapper'>
                            <FontAwesomeIcon icon={faWolfPackBattalion} className='authLogoIcon' />
                        </div>
                        <h2 className='authTitle'>{authConfig === 'signUp' ? 'Create your Account' : "Log into your Account"}</h2>
                        <div className='authDemoAccountTxtWrapper'>
                            {demoLoader ? (
                                <span className='authDemoLoader'></span>
                            ) : (
                                <span className='authDemoAccountTxt' onClick={() => demoAccountLogIn()}>Use Demo Account</span>
                            )}
                        </div>
                        <span></span>
                        <form method="POST" className="authForm" onSubmit={handleFormSubmit}>
                            <label className="authLabel">Email<span className="authRequireTag">*</span>
                            </label>
                            <input type="email" name="email" placeholder={email.placeholder}
                                className={`authFormEmailInput ${redEmailPlaceHolder ? "field" : ""}`}
                                onChange={(e) => setEmail({ ...email, value: e.target.value })} value={email.value}
                            />
                            <label className="authLabel">Password<span className="authRequireTag">*</span></label>
                            <input type="password" name="password" placeholder={password.placeholder}
                                className={`authFormPassWordInput ${redPasswordPlaceholder ? "field" : ""}`}
                                onChange={(e) => setPassword({ ...password, value: e.target.value })} value={password.value}
                            />
                            <div className='authBtnsWrapper'>
                                {loader ? (
                                    <button type='button' className="authBtn authLoader">
                                        <span className="btnLoader"></span>
                                    </button>
                                ) : (
                                    <button type="submit" className="authBtn authenticate">
                                        {authConfig === 'signUp' ? "Sign Up" : "Log In"}
                                    </button>
                                )}
                                <button type='button' className='authBtn close'
                                    onClick={loader || demoLoader ? undefined : () => handleAuthenticationClose(false)}>Close</button>
                            </div>
                            <span className='authPromptWrapper'>{authConfig === 'signUp' ? "Already have an account?" : "Don't have an account?"}
                                {authConfig === 'signUp' ? <span className='authPrompt' onClick={() => setAuthConfig('logIn')}>Log In</span> :
                                    <span className='authPrompt' onClick={() => setAuthConfig('signUp')}>Create Account</span>}</span>
                        </form>
                    </>
                )}
            </div>
        </div >
    )
}


export default Authentication
