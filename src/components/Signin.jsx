
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../css/Signin.css";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const signinuser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3005/loginuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            console.log("API response:", data);

            if (response.ok && data.msg === "Login Successful") {
                sessionStorage.setItem("email", email);
                alert("Login Successful");
                navigate("/");
            } else if (data.msg === "Email is not verified") {
                alert("Your email is not verified. Please complete signup verification.");
                sessionStorage.setItem("email", email);
                navigate("/Signup");
            } else if (data.msg === "Invalid password") {
                alert("Invalid password. Please try again.");
            } else if (data.msg === "User not found") {
                alert("User not found. Please sign up first.");
            } else {
                alert(data.msg || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Unable to connect to the server. Please check whether the API is running.");
        }
    };

    return (
        <main className="auth-page signin-page">
            <div className="auth-background" aria-hidden="true">
                <div className="auth-background-image"></div>
                <div className="auth-background-overlay"></div>
            </div>

            <section className="auth-layout">
                <div className="auth-branding">
                    <Link to="/" className="auth-logo">
                        Pick<span>My</span>Show
                    </Link>
                    <p className="auth-eyebrow">YOUR NEXT FAVOURITE STORY STARTS HERE</p>
                    <h1>Every story.<br />One destination.</h1>
                    <p className="auth-branding-description">
                        From blockbuster premieres to unforgettable live experiences,
                        your next outing starts with PickMyShow.
                    </p>
                    <div className="auth-feature-pills">
                        <span>Movies</span>
                        <span>Events</span>
                        <span>Entertainment</span>
                    </div>
                </div>

                <div className="auth-card">
                    <div className="auth-card-heading">
                        <span className="auth-kicker">WELCOME BACK</span>
                        <h2>Sign in</h2>
                        <p>Pick up where your next experience begins.</p>
                    </div>

                    <form className="auth-form" onSubmit={signinuser}>
                        <div className="auth-field">
                            <label htmlFor="signinEmail">Email address</label>
                            <input
                                type="email"
                                id="signinEmail"
                                name="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="signinPassword">Password</label>
                            <div className="auth-password-wrap">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="signinPassword"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
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

                        <button type="submit" className="auth-submit-btn">
                            Sign In <span aria-hidden="true">→</span>
                        </button>
                    </form>

                    <p className="auth-switch">
                        New to PickMyShow? <Link to="/Signup">Create an account</Link>
                    </p>

                    <p className="auth-legal">
                        By continuing, you agree to our terms and privacy policy.
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Signin;
