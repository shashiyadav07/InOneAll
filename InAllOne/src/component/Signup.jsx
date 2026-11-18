import { useState } from "react";
import "../style/Signup.css"
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
console.log("🔥 THIS IS MY SIGNUP  🔥");
function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function generateUserId() {
        return "USR-" + crypto.randomUUID();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        // Check empty fields
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill all fields");
            return;
        }

        // Check password
        if (formData.password !== formData.confirmPassword) {
            setError("Password and Confirm Password do not match");
            return;
        }

        // Create unique user ID
        const userId = generateUserId();

        const user = {
            userId: userId,
            name: formData.name,
            email: formData.email,
            password: formData.password
        };
        try{
            const response =  await fetch('http://localhost:3000/signup', {
                'method': 'post',
                'headers':{
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(user)
            })
            if(response.status === 400){
                alert('user already exists')
            }else if(response.status === 200){
                alert('user created successfully')
                navigate('/')
            }

        }

        catch(err){
            console.log(err)
        }

        alert(`Signup successful!\nYour User ID: ${userId}`);
    }

    return (
        <div className="signup-container">

            <form className="signup-form" onSubmit={handleSubmit}>

                <h1>Create InAllOne Account</h1>

                <p>Sign up to create your account and start enjoyment</p>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                />

                {/* Gmail */}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your Gmail"
                    value={formData.email}
                    onChange={handleChange}
                />

                {/* Password */}
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {/* Confirm Password */}
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <button type="submit">
                    Sign Up
                </button>

              <Link to="/" className="login-btn">Login kero</Link>


            </form>
                 
        </div>
    );
}

export default Signup;