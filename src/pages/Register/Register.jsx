import React, { useState } from "react";
import styles from "./register.module.css";
import loginImg from "../../assets/login.png";
import cuvetteImg from "../../assets/cuvette.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userSignUp } from "../../services";

const Register = () => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    confirmPassword:""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return toast.error("Email is invalid");
    }
    if (!formData.phone.trim()) {
      return toast.error("Phone number is required");
    }else if(!/^\d{10}$/.test(formData.phone)){
      return toast.error("Phone number is invalid")
    }
    const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!formData.password.trim()) {
    return toast.error("Password is required");
  } else if (!regex.test(formData.password)) {
    return toast.error("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols");
  }
    if (!formData.confirmPassword.trim()) {
        return toast.error("Confirm password is required");
      }
      if(formData.password !== formData.confirmPassword){
        return toast.error("enter same password in both fields")
      }
    setLoading(true)
    try {
      const response = await userSignUp(formData);
      if (response.message === "Sign up successfully") {
        toast.success(response.message);
        setFormData({
            name:"",
            email:"",
            phone:"",
            password:"",
            confirmPassword:""
        });
        navigate(`/login`)
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  };
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
            <button className={styles.signupButton} onClick={() => navigate("/register")}>Sign Up</button>
            <button className={styles.loginButton} onClick={() => navigate("/login")}>Login</button>
          </div>
          <p className={styles.join}>Join us Today!</p>
          <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData,name:e.target.value})}/>
            <input type="text" placeholder="Email id" value={formData.email} onChange={(e) => setFormData({...formData,email:e.target.value})}/>
            <input type="tel" placeholder="Mobile no." value={formData.phone} onChange={(e) => setFormData({...formData,phone:e.target.value})}/>
            <input type="text" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData,password:e.target.value})}/>
            <input type="text" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData,confirmPassword:e.target.value})}/>
            <button type="submit" disabled={loading}>{loading ? "Loading..." : "Register"}</button>
          </form>
          <h1 className={styles.account}>Already have an account? <span onClick={() => navigate("/login")}>Login</span></h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
