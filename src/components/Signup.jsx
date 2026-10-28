import { useState } from "react";
import { useNavigate } from "react-router";
import '../css/Signup.css';

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3005/Register", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();
        if (response.status===200) {
            alert("Registered Successfully");
            sessionStorage.setItem("email",email);
            navigate("/otpverify");
        }
        else {
            alert("Registration Failed. Try Again.")
        }
        

        // alert(data.msg);
        // alert("Hello");
    }

    return (
        < >
            <h1>Sign Up</h1>

            <form method="POST" onSubmit={registerUser} >

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className="email" required onChange={(e) => { e.preventDefault(); setEmail(e.target.value) }} />


            <label htmlFor="password">Password:</label>
            <input type="password" id="password" className="password" required onChange={(e) => { e.preventDefault(); setPassword(e.target.value) }} />


            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" className="confirmPassword" required onChange={(e) => { e.preventDefault(); setConfirmpassword(e.target.value) }} />


            <button type="submit">Sign Up</button>
            </form >

        </>
    );
}

export default Signup;