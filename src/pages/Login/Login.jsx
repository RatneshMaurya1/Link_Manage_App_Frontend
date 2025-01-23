import React, { useState } from "react";
import styles from "./login.module.css";
import loginImg from "../../assets/login.png";
import cuvetteImg from "../../assets/cuvette.png";
import { useNavigate } from "react-router-dom";
import { userSignIn } from "../../services";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return toast.error("Email is invalid");
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    } else if (!regex.test(formData.password)) {
      return toast.error("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols");
    }
    setLoading(true)
    try {
      const response = await userSignIn(formData);
      if (response.message === "Logged in successfully") {
        toast.success(response.message);
        setFormData({
          email: "",
          password: "",
        });
        localStorage.setItem("token",response.token)
        localStorage.setItem("userId",response.user._id)
        localStorage.setItem("name",response.user.name)
        navigate(`/dashboard/${localStorage.getItem("userId")}`)
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
            <button className={styles.loginButton} onClick={() => navigate("/register")}>Sign Up</button>
            <button className={styles.signupButton}onClick={() => navigate("/login")}>Login</button>
          </div>
          <p className={styles.join}>Login</p>
          <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email id" value={formData.email} onChange={(e) => setFormData({...formData,email:e.target.value})}/>
            <input type="tel" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData,password:e.target.value})}/>
            <button type="submit" disabled={loading}>{loading ? "Loading" : "Login"}</button>
          </form>
          <h1 className={styles.account}>Don’t have an account?<span onClick={() => navigate("/register")}> SignUp</span></h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
