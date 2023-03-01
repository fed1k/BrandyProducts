import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react";
const Signup = () => {

  let navigate = useNavigate()

  const [error, setError] = useState()

  let emailRef = useRef();
  let passwordRef = useRef();

  const handleSignup = async(e) => {
    e.preventDefault()
    try {
      const user = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      navigate("/home");
    } catch(error) {
      if(error.code){
        setError("Email already in use")
      }
    }
  }

  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider).then(data => {
      navigate("/home")
    }).catch(error => console.log(error))
  }

  return (
    <div className="auth-page">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="johndoe@gmail.com" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef}/>
        {error ? <span style={{color: "#FF7C7CFF"}}>{error}</span> : null}
        <button className="signup-btn" type="submit">Signup</button>
        <button id="google-signup-btn" type="button" onClick={handleGoogleSignup}><FcGoogle /> Sign up with Google</button>
        <Link className="login-link" to="/">Login</Link>
      </form>
    </div>
  );
}
 
export default Signup;