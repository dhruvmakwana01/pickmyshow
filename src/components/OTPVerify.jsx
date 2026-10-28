
import { useState, useRef } from "react";
import "../css/OTPVerify.css";
import { useNavigate } from "react-router";
import axios from "axios";

const OTPVerify = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isVerifying, setIsVerifying] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // Handle typing a digit and automatically move to the next box
    const updateotp = (e, index) => {
        const value = e.target.value.replace(/\D/g, "");
        const digit = [...otp];

        if (value === "") {
            digit[index] = "";
            setOtp(digit);
            return;
        }

        // Keep only the last digit entered
        digit[index] = value.slice(-1);
        setOtp(digit);

        // Move to the next box
        if (index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle Backspace and arrow-key navigation
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            e.preventDefault();

            const digit = [...otp];

            if (digit[index] !== "") {
                // Clear the current box first
                digit[index] = "";
                setOtp(digit);
            } else if (index > 0) {
                // If empty, move backwards and clear the previous box
                digit[index - 1] = "";
                setOtp(digit);
                inputRefs.current[index - 1]?.focus();
            }
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle pasting an OTP
    const handlePaste = (e, index) => {
        e.preventDefault();

        const pastedValue = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, otp.length - index);

        if (!pastedValue) return;

        const digit = [...otp];

        pastedValue.split("").forEach((character, i) => {
            digit[index + i] = character;
        });

        setOtp(digit);

        const nextIndex = Math.min(
            index + pastedValue.length,
            otp.length - 1
        );

        inputRefs.current[nextIndex]?.focus();
    };

    // Verify OTP using the existing backend endpoint
    const handleVerify = async (e) => {
        e.preventDefault();

        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {
            alert("Please enter the complete 6-digit OTP.");
            return;
        }

        setIsVerifying(true);

        try {
            const response = await axios.post(
                "http://localhost:3005/verifyotp",
                {
                    email: sessionStorage.getItem("email"),
                    otp: enteredOtp
                }
            );

            console.log(response.data);
            alert(response.data.msg);

            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            console.error("OTP verification error:", error);

            alert(
                error.response?.data?.msg ||
                "Unable to verify OTP. Please try again."
            );
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <form onSubmit={handleVerify}>
            <p>
                Your Email ID:
                <label id="otpemail">
                    {sessionStorage.getItem("email")}
                </label>
            </p>

            {otp.map((data, index) => (
                <input
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    key={index}
                    ref={(element) => {
                        inputRefs.current[index] = element;
                    }}
                    value={data}
                    aria-label={`OTP digit ${index + 1}`}
                    required
                    onChange={(e) => updateotp(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e, index)}
                />
            ))}

            <button
                type="submit"
                className="verify-btn"
                disabled={isVerifying}
            >
                {isVerifying ? "Verifying..." : "Verify"}
            </button>
        </form>
    );
};

export default OTPVerify;
