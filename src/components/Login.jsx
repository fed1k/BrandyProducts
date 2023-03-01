import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRef } from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import { FcGoogle } from "react-icons/fc"
import { useState } from "react";
import {BiShow, BiHide} from "react-icons/bi"
const Login = () => {

  const [error, setError] = useState()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  let emailRef = useRef()
  let passwordRef = useRef()

  let navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const user = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      navigate("/home");
    } catch(error) {
      if(error.message === "Firebase: Error (auth/user-not-found)."){
        setError("User does not exist");
      }else if(error.code === "auth/wrong-password") {
        setError("Wrong password")
      }
    }
  }

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then(data => {
      navigate("/home")
    }).catch(error => console.log(error))
  }

  const passwordVisibilityToggle = () => {
    setIsPasswordVisible(prev => prev ? false : true);
  }

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="johndoe@gmail.com" ref={emailRef} />
        <input type={`${isPasswordVisible ? "text" : "password"}`} placeholder="Password" ref={passwordRef}/>
        {isPasswordVisible ? <BiHide className="show-password" onClick={passwordVisibilityToggle} /> : <BiShow className="show-password" onClick={passwordVisibilityToggle}/>}
        <button className="login-btn" type="submit">Login</button>
        {error ? <span style={{color: "#FF7C7CFF"}} >{error}</span> : null}
        <button id="google-login-btn" type="button" onClick={handleGoogleLogin}><FcGoogle /> Sign in with Google</button>
        <Link to="/signup" className="signup-link">Signup</Link>
      </form>
    </div>
  );
}
 
export default Login;