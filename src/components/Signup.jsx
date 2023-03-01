import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
const Signup = () => {

  let navigate = useNavigate()

  const [error, setError] = useState()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  let emailRef = useRef();
  let passwordRef = useRef();

  const handleSignup = async(e) => {
    e.preventDefault()
    try {
      const user = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      navigate("/home");
    } catch(error) {
      if(error.code === "auth/weak-password"){
        setError("Password should be at least 6 characters")
      } else if(error.code === "auth/email-already-in-use") {
        setError("Email already in use")
      }
    }
  }

  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider).then(data => {
      navigate("/home")
    }).catch(error => console.log(error))
  }

  const passwordVisibilityToggle = () => {
    setIsPasswordVisible(prev => prev ? false : true);
  }

  return (
    <div className="auth-page">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="johndoe@gmail.com" ref={emailRef} />
        <input type={`${isPasswordVisible ? "text" : "password"}`} placeholder="Password" ref={passwordRef}/>
        {isPasswordVisible ? <BiHide className="show-password" onClick={passwordVisibilityToggle} /> : <BiShow className="show-password" onClick={passwordVisibilityToggle}/>}
        {error ? <span style={{color: "#FF7C7CFF"}}>{error}</span> : null}
        <button className="signup-btn" type="submit">Signup</button>
        <button id="google-signup-btn" type="button" onClick={handleGoogleSignup}><FcGoogle /> Sign up with Google</button>
        <Link className="login-link" to="/">Login</Link>
      </form>
    </div>
  );
}
 
export default Signup;