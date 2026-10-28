import { useState } from "react";
import '../css/OTPVerify.css';
import { useNavigate } from "react-router";
import axios from "axios";

const OTPVerify = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    console.log(otp.length);
    const navigate = useNavigate();
    const updateotp = (e, index) => {
        e.preventDefault();
        const digit = [...otp];
        digit[index] = e.target.value;
        setOtp(digit);
        console.log(digit);
    }

    const handleVerify = async() => {
        const x = otp.join("");
        const response = await axios.post("http://localhost:3005/verifyotp",{
            email:sessionStorage.getItem("email"),
            otp:x
        });
        console.log(response.data);
        alert(response.data.msg);
        if (response.status===200){
            navigate("/");
        }
    }

    return (
        < >
            <form>
                <p>Your Email ID : <label id="otpemail" >{sessionStorage.getItem("email")}</label></p>
                {
                    otp.map(
                        (data, index) => (
                            <input type="text" maxLength="1" key={index} value={data} onChange={(e) => updateotp(e, index)} />
                        )
                    )
                }
                <button type="button" className="verify-btn" onClick={handleVerify}>Verify</button>
            </form>
        </>
    );
}

export default OTPVerify;