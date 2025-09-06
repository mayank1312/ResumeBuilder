import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPath";
import { authStyles as styles } from "../assets/dummystyle";
import { Input } from "./Inputs";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";


const Login=({setCurrentPage})=>{
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updatedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
   
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
        const response =await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
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
       <div className={styles.container}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.title}>Welcome Back</h3>
            <p className={styles.subtitle}>Sign In</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
            
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

            <button type="submit" className={styles.submitButton}>
              Sign In
            </button>

            <p className={styles.switchText}>
                Dont Have an account?{' '}
                <button type="button" className={styles.switchButton}
                onClick={()=>setCurrentPage("signup")}
                >
                    Sign Up
                </button>
            </p>
         </form>
       </div>

       
    )
}

export default Login;