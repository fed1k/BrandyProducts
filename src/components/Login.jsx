import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRef } from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import { FcGoogle } from "react-icons/fc"
import { useState } from "react";
const Login = () => {

  const [error, setError] = useState()

  let emailRef = useRef()
  let passwordRef = useRef()

  let navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const user = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      navigate("/home");
    } catch(error) {
      if(error.message === "Firebase: Error (auth/user-not-found).") setError("User does not exist");
    }
  }

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then(data => {
      navigate("/home")
    }).catch(error => console.log(error))
  }

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="johndoe@gmail.com" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef}/>
        {error ? <span style={{color: "#FF7C7CFF"}} >{error}</span> : null}
        <button className="login-btn" type="submit">Login</button>
        <button id="google-login-btn" type="button" onClick={handleGoogleLogin}><FcGoogle /> Sign in with Google</button>
        <Link to="/signup" className="signup-link">Signup</Link>
      </form>
    </div>
  );
}
 
export default Login;