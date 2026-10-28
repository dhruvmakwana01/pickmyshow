
import { Link } from "react-router";
import "../css/Footer.css";

function Footer() {
    return (
        <footer className="pickmyshow-footer">
            <div className="pickmyshow-footer-container">

                {/* Brand and Description */}
                <div className="footer-brand">
                    <Link className="footer-logo" to="/">
                        Pick<span>My</span>Show
                    </Link>

                    <p>
                        Your one-stop destination for movies,
                        events, and entertainment.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h5>Quick Links</h5>
                    <Link to="/">Home</Link>
                    <Link to="/Movies">Movies</Link>
                    <Link to="/Events">Events</Link>
                    <Link to="/Streams">Streams</Link>
                    <Link to="/Theatres">Theatres</Link>
                </div>

                {/* Movie Categories */}
                <div className="footer-section">
                    <h5>Explore</h5>
                    <Link to="/Movies">Latest Movies</Link>
                    <Link to="/Events">Live Events</Link>
                    <Link to="/Streams">Online Streams</Link>
                    <Link to="/Theatres">Find Theatres</Link>
                </div>

                {/* Account and Support */}
                <div className="footer-section">
                    <h5>Account & Support</h5>
                    <Link to="/signin">Sign In</Link>
                    <Link to="/Signup">Sign Up</Link>
                    <a href="mailto:support@pickmyshow.com">
                        Contact Support
                    </a>
                </div>

            </div>

            {/* Bottom Footer */}
            <div className="pickmyshow-footer-bottom">
                <p>
                    &copy; {new Date().getFullYear()} PickMyShow.
                    All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
