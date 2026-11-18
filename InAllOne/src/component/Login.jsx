import { useState } from "react";
import '../style/Login.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({
    email:'',
    password:''
})
    async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        console.log("Backend response:", result);

        if (response.status === 200) {
            alert("Login successful");
            navigate('/dashboard');
        } 
        else if (response.status === 401) {
            alert(result.message || "Invalid email or password");
        }

    } catch (err) {
        console.log("Login error:", err);
        alert("Server se connection nahi ho pa raha");
    } finally {
        setLoading(false);
    }
}
    return(
        <div className="login-container">
             <form onSubmit={handelSubmit}>
            <lable className="lable">Email</lable>
            <input type="email" placeholder="entre email" required name="email" onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}}/>
            <lable className="lable">password</lable>
            <input type="password" placeholder="password" required name="password" onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}}/>
           <input type="submit"  value="Login" />
            <Link className="signup-btn" to={'/signup'}>Signup</Link>
        </form>
       

        </div>
       
    )
}
export default Login;