
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../css/Signup.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setFormError("");

        if (password !== confirmpassword) {
            setPasswordError("Passwords do not match. Please check both fields.");
            return;
        }

        if (!agreeTerms) {
            setFormError("Please agree to the Terms and Conditions to continue.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:3005/Register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.status === 200) {
                // alert("Registered Successfully");
                sessionStorage.setItem("email", email);
                navigate("/otpverify");
            } else {
                alert(data.msg || "Registration Failed. Try Again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Unable to connect to the server. Please check whether the API is running.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirmpassword(value);
        setPasswordError(
            value && password !== value ? "Passwords do not match." : ""
        );
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordError(
            confirmpassword && value !== confirmpassword
                ? "Passwords do not match."
                : ""
        );
    };

    return (
        <main className="auth-page signup-page">
            <div className="auth-background" aria-hidden="true">
                <div className="auth-background-image"></div>
                <div className="auth-background-overlay"></div>
            </div>

            <section className="auth-layout">
                <div className="auth-branding">
                    <Link to="/" className="auth-logo">
                        Pick<span>My</span>Show
                    </Link>
                    <p className="auth-eyebrow">YOUR SEAT TO SOMETHING AMAZING</p>
                    <h1>Make room<br />for more stories.</h1>
                    <p className="auth-branding-description">
                        Discover the latest blockbusters, explore live events,
                        and make every outing worth remembering.
                    </p>
                    <div className="auth-feature-pills">
                        <span>Discover</span>
                        <span>Book</span>
                        <span>Experience</span>
                    </div>
                </div>

                <div className="auth-card signup-card">
                    <div className="auth-card-heading">
                        <span className="auth-kicker">JOIN THE EXPERIENCE</span>
                        <h2>Create account</h2>
                        <p>One account. A world of entertainment.</p>
                    </div>

                    <form className="auth-form signup-form" onSubmit={registerUser}>
                        <div className="auth-field">
                            <label htmlFor="signupEmail">Email address</label>
                            <input
                                type="email"
                                id="signupEmail"
                                name="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="signupPassword">Password</label>
                            <div className="auth-password-wrap">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="signupPassword"
                                    name="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e.target.value)}
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    className="auth-password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <div className="auth-password-wrap">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    autoComplete="new-password"
                                    required
                                    value={confirmpassword}
                                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                    placeholder="Enter your password again"
                                    aria-invalid={Boolean(passwordError)}
                                />
                                <button
                                    type="button"
                                    className="auth-password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="auth-error" role="alert">{passwordError}</p>
                            )}
                        </div>

                        <label className="auth-terms">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => {
                                    setAgreeTerms(e.target.checked);
                                    if (e.target.checked) setFormError("");
                                }}
                            />
                            <span>
                                I agree to the <Link to="/terms">Terms and Conditions</Link>
                                {" "}and acknowledge the Privacy Policy.
                            </span>
                        </label>

                        {formError && (
                            <p className="auth-error" role="alert">{formError}</p>
                        )}

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating account..." : "Create Account"}
                            {!isSubmitting && <span aria-hidden="true">→</span>}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account? <Link to="/signin">Sign in</Link>
                    </p>

                    <p className="auth-legal">
                        Your entertainment journey starts here.
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Signup;
