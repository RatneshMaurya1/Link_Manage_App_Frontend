import React, { useState } from "react";
import styles from "./login.module.css";
import loginImg from "../../assets/login.png";
import cuvetteImg from "../../assets/cuvette.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  })
  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginImage}>
          <img src={loginImg} alt="login-image" />
        </div>
        <img
          className={styles.cuvetteImage}
          src={cuvetteImg}
          alt="cuvette-image"
        />
        <div className={styles.formContainer}>
          <div className={styles.loginSignupButton}>
            <button className={styles.loginButton} onClick={() => navigate("/register")}>Sign Up</button>
            <button className={styles.signupButton}onClick={() => navigate("/login")}>Login</button>
          </div>
          <p className={styles.join}>Login</p>
          <div className={styles.form}>
          <form>
            <input type="text" placeholder="Email id" value={formData.email} onchange={(e) => setFormData({...formData,email:e.target.value})}/>
            <input type="tel" placeholder="Password" value={formData.password} onchange={(e) => setFormData({...formData,password:e.target.value})}/>
            <button type="submit">Register</button>
          </form>
          <h1 className={styles.account}>Don’t have an account?<span onClick={() => navigate("/register")}> SignUp</span></h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
