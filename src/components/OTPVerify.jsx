import { useState } from "react";

const OTPVerify = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    console.log(otp.length);
    return (
        < >
            <form>
                <p>Your Email ID : <label id="otpemail" >{sessionStorage.getItem("email")}</label></p>
                {
                    otp.map(
                        (data, index) => (
                            <input type="text" maxLength="1" key={index} value={data} />
                        )
                    )
                }
            </form>
        </>
    );
}

export default OTPVerify;