
import { useState, useRef, useEffect } from "react";
import "../css/OTPVerify.css";
import { useNavigate } from "react-router";
import axios from "axios";

const OTPVerify = () => {

    // Stores the remaining OTP validity time in seconds.
    // Initially set to 0 while the frontend checks the backend.
    const [timer, setTimer] = useState(0);

    // Stores the six digits entered by the user.
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    // Tracks whether OTP verification is currently in progress.
    const [isVerifying, setIsVerifying] = useState(false);

    // Tracks whether a new OTP is currently being generated.
    const [isResending, setIsResending] = useState(false);

    // Prevents the user from interacting with OTP inputs
    // until the initial OTP status has been received.
    const [isOtpLoading, setIsOtpLoading] = useState(true);

    // Stores references to all six OTP input elements.
    // This allows us to automatically move between input boxes.
    const inputRefs = useRef([]);

    const navigate = useNavigate();

    // Retrieves the email saved during the signup process.
    const email = sessionStorage.getItem("email");


    // CHECK OTP STATUS WHEN THE PAGE LOADS
    useEffect(() => {

        const checkOtpStatus = async () => {
            try {

                // Sends the user's email to the backend.
                // The backend checks how much validity time remains.
                const response = await axios.post(
                    "http://localhost:3005/otpstatus",
                    { email }
                );

                // If the email is already verified,
                // there is no need to show the OTP page.
                if (response.data.emailverified) {
                    navigate("/");
                    return;
                }

                // Gets the remaining OTP validity time from the backend.
                setTimer(response.data.remainingSeconds);

            } catch (error) {

                console.error("OTP status error:", error);

                // If the status cannot be retrieved,
                // stop the countdown and allow the user to request another OTP.
                setTimer(0);

                alert(
                    error.response?.data?.msg ||
                    "Unable to retrieve OTP status."
                );

            } finally {

                // The initial OTP status check is complete.
                setIsOtpLoading(false);
            }
        };

        // Only check OTP status if an email exists in sessionStorage.
        if (email) {
            checkOtpStatus();
        } else {
            setTimer(0);
            setIsOtpLoading(false);
        }

    }, [email, navigate]);


    // HANDLE OTP INPUT
    const updateotp = (e, index) => {

        // Remove anything that is not a number.
        const value = e.target.value.replace(/\D/g, "");

        // Create a copy so that the existing state is not modified directly.
        const digit = [...otp];

        // If the input is empty, clear the current box.
        if (value === "") {
            digit[index] = "";
            setOtp(digit);
            return;
        }

        // Store only the last entered digit in the current box.
        digit[index] = value.slice(-1);
        setOtp(digit);

        // Automatically move the cursor to the next OTP box.
        if (index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };


    // HANDLE BACKSPACE AND ARROW KEYS
    const handleKeyDown = (e, index) => {

        if (e.key === "Backspace") {
            e.preventDefault();

            const digit = [...otp];

            // If the current box contains a digit, clear it.
            if (digit[index] !== "") {
                digit[index] = "";
                setOtp(digit);

            // If the current box is empty, clear the previous box
            // and move the cursor backwards.
            } else if (index > 0) {
                digit[index - 1] = "";
                setOtp(digit);
                inputRefs.current[index - 1]?.focus();
            }
        }

        // Move to the previous input box using the left arrow.
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Move to the next input box using the right arrow.
        if (e.key === "ArrowRight" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };


    // HANDLE PASTING AN OTP
    const handlePaste = (e, index) => {

        // Prevent the browser's default paste behaviour.
        e.preventDefault();

        // Read the copied text, remove non-numeric characters,
        // and limit it to the number of available OTP boxes.
        const pastedValue = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, otp.length - index);

        if (!pastedValue) return;

        const digit = [...otp];

        // Distribute the pasted digits across the input boxes.
        pastedValue.split("").forEach((character, i) => {
            digit[index + i] = character;
        });

        setOtp(digit);

        // Move the cursor to the last box that received a pasted digit.
        const nextIndex = Math.min(
            index + pastedValue.length,
            otp.length - 1
        );

        inputRefs.current[nextIndex]?.focus();
    };


    // COUNTDOWN TIMER
    useEffect(() => {

        // Do not start the countdown if the OTP has expired
        // or the initial OTP status is still loading.
        if (timer <= 0 || isOtpLoading) return;

        // Reduce the remaining time by one second.
        // setTimeout runs this update after 1000 milliseconds.
        const timerId = setTimeout(() => {
            setTimer((value) => Math.max(0, value - 1));
        }, 1000);

        // Clear the previous timeout before creating another one.
        // This prevents multiple countdown timers from running together.
        return () => clearTimeout(timerId);

    }, [timer, isOtpLoading]);


    // FORMAT TIMER INTO MINUTES AND SECONDS
    const formatTime = () => {

        // Calculate complete minutes from the remaining seconds.
        const minutes = Math.floor(timer / 60);

        // Get the remaining seconds after removing complete minutes.
        const seconds = timer % 60;

        // padStart(2, "0") adds a zero before single-digit seconds.
        // Example: 9 becomes 09.
        return `${minutes}:${String(seconds).padStart(2, "0")}`;
    };


    // VERIFY OTP
    const handleVerify = async (e) => {

        // Prevent the form from refreshing the page.
        e.preventDefault();

        // Do not allow verification after the countdown reaches zero.
        if (timer <= 0) {
            alert("OTP has expired. Please resend a new OTP.");
            return;
        }

        // Combine all six input values into one OTP string.
        const enteredOtp = otp.join("");

        // Check whether all six digits have been entered.
        if (enteredOtp.length !== 6) {
            alert("Please enter the complete 6-digit OTP.");
            return;
        }

        // Disable the Verify button while the API request is running.
        setIsVerifying(true);

        try {

            // Send the email and entered OTP to the backend.
            // The backend checks whether the OTP is correct and unexpired.
            const response = await axios.post(
                "http://localhost:3005/verifyotp",
                {
                    email: email,
                    otp: enteredOtp
                }
            );

            alert(response.data.msg);

            // If verification succeeds, navigate to the home page.
            if (response.status === 200) {
                navigate("/");
            }

        } catch (error) {

            console.error("OTP verification error:", error);

            // HTTP status 410 means the backend has determined
            // that the OTP has expired.
            if (error.response?.status === 410) {
                setTimer(0);
            }

            alert(
                error.response?.data?.msg ||
                "Unable to verify OTP. Please try again."
            );

        } finally {

            // Re-enable the Verify button after the request finishes.
            setIsVerifying(false);
        }
    };


    // RESEND OTP
    const handleResend = async (e) => {

        // Prevent the form from submitting when Resend OTP is clicked.
        e.preventDefault();

        // Resending is allowed only after expiry.
        // Also prevent multiple requests while another request is running.
        if (timer > 0 || isResending || isOtpLoading) return;

        // Disable the Resend button while the request is running.
        setIsResending(true);

        try {

            // Ask the backend to generate a new OTP for this email.
            const response = await axios.post(
                "http://localhost:3005/regenerateotp",
                {
                    email: email
                }
            );

            alert(response.data.msg);

            if (response.status === 200) {

                // Clear all six input boxes for the new OTP.
                setOtp(["", "", "", "", "", ""]);

                // Get the new OTP validity time from the backend.
                // The fallback of 15 seconds is used if the response
                // does not contain a remainingSeconds value.
                setTimer(response.data.remainingSeconds ?? 15);

                // Move the cursor to the first OTP input box.
                inputRefs.current[0]?.focus();
            }

        } catch (error) {

            console.error("Resend OTP error:", error);

            alert(
                error.response?.data?.msg ||
                "Unable to resend OTP. Please try again."
            );

        } finally {

            // Re-enable the Resend button after the request finishes.
            setIsResending(false);
        }
    };


    // DISPLAY OTP VERIFICATION PAGE
    return (
        <form onSubmit={handleVerify}>

            <p>
                Your Email ID:
                <label id="otpemail">
                    {email}
                </label>
            </p>

            {/* Show the loading message, countdown, or expiry message. */}
            <p className="otp-timer">
                {isOtpLoading
                    ? "Checking OTP..."
                    : timer > 0
                        ? `OTP expires in ${formatTime()}`
                        : "OTP expired. Please resend a new OTP."}
            </p>

            {/* Create six separate input boxes for the OTP digits. */}
            {otp.map((data, index) => (
                <input
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    key={index}

                    // Save the reference of each input box.
                    ref={(element) => {
                        inputRefs.current[index] = element;
                    }}

                    value={data}
                    aria-label={`OTP digit ${index + 1}`}
                    required

                    // Disable inputs after expiry or while checking OTP status.
                    disabled={timer <= 0 || isOtpLoading}

                    onChange={(e) => updateotp(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e, index)}
                />
            ))}

            {/* Verify button */}
            <button
                type="submit"
                className="verify-btn"

                // Disable verification if the OTP has expired,
                // verification is already running, or status is loading.
                disabled={
                    timer <= 0 ||
                    isVerifying ||
                    isOtpLoading
                }
            >
                {isVerifying
                    ? "Verifying..."
                    : "Verify"}
            </button>

            {/* Resend OTP button */}
            <button
                type="button"
                className="resend-btn"
                onClick={handleResend}

                // Resend becomes available only after the OTP expires.
                disabled={
                    timer > 0 ||
                    isResending ||
                    isOtpLoading
                }
            >
                {isResending
                    ? "Resending..."
                    : timer > 0
                        ? `Resend OTP (${formatTime()})`
                        : "Resend OTP"}
            </button>

        </form>
    );
};

export default OTPVerify;
