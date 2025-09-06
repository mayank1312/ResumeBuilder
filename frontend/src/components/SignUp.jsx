import React, { useContext, useState } from "react"
import { authStyles as styles } from "../assets/dummystyle";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";
import { Input } from "./Inputs";
const SignUp=({setCurrentPage})=>{

   
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updatedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp=async(e)=>{
    e.preventDefault();
    if(!fullName){
        setError("Please enter fullname")
        return;
    }
    if(!validateEmail(email)){
        setError("Please enter a valid email")
        return;
    }
    if(!password){
        setError("Please enter password")
        return;
    }
    setError(" ");

    try{
       const response =await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name:fullName,
        email,
        password
       });
       const {token}=response.data;
       if(token){
        localStorage.setItem("token",token);
        updatedUser(response.data);
        navigate("/dashboard")
       }
    }catch(error){
        console.error(error);
     setError(error.response?.data?.message || "Something went wrong")
    }
  }
    return (
        <div className={styles.signupContainer}>
         <div className={styles.headerWrapper}>
            <h3 className={styles.signupTitle}>Create Account</h3>
         </div>

         <form onSubmit={handleSignUp} className={styles.signupForm}>
            <Input value={fullName} onChange={({target})=>setFullName(target.value)}
              label="Full name "
              placeholder="John doe"
              type="text"

            />
            <Input value={email} onChange={({target})=>setEmail(target.value)}
              label="Email "
              placeholder="Johndoe@yahoo.com"
              type="text"

            />
            <Input value={password} onChange={({target})=>setPassword(target.value)}
              label="Password "
              placeholder="Minimum 8 characters"
              type="password"

            />

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button type="submit" className={styles.signupSubmit}>
                Create Account
            </button>

            <p className={styles.switchText}>
                Already Have an account?{' '}
                <button type="button" className={styles.signupSwitchButton}
                onClick={()=>setCurrentPage("login")}
                >
                    Sign In
                </button>
            </p>
         </form>
        </div>
    )
}

export default SignUp;