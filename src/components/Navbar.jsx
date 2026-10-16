import { useState } from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router';

function Navbar({ onLinkclick }) {
    const [searchText, setSearchText] = useState('');
    const [selectedCity, setSelectedCity] = useState('Mumbai');

    const cities = [
        'Mumbai',
        'Delhi',
        'Bengaluru',
        'Pune',
        'Hyderabad',
        'Chennai',
        'Kolkata',
        'Ahmedabad'
    ];

    return (
        <nav className="navbar navbar-expand-lg pickmyshow-navbar">
            <div className="container">

                {/* Website Logo */}
                <a className="navbar-brand pickmyshow-logo" href="/">
                    Pick<span>My</span>Show
                </a>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#pickmyshowNavbar"
                    aria-controls="pickmyshowNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div
                    className="collapse navbar-collapse"
                    id="pickmyshowNavbar"
                >
                    {/* Navigation Links */}
                    <ul className="navbar-nav pickmyshow-nav-links">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                               Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/Movies">
                                Movies
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/Events">
                                Events
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/Streams">
                                Streams
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/Theatres">
                                Theatres
                            </Link>
                        </li>
                    </ul>

                    {/* City Selector */}
                    <div className="pickmyshow-city">
                        <select
                            id="citySelect"
                            className="form-select city-select"
                            aria-label="Select your city"
                            value={selectedCity}
                            onChange={(e) =>
                                setSelectedCity(e.target.value)
                            }
                        >
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search Bar */}
                    <form
                        className="pickmyshow-search"
                        role="search"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search movies and events"
                            value={searchText}
                            onChange={(e) =>
                                setSearchText(e.target.value)
                            }
                        />
                    </form>

                    {/* Sign In Button */}
                    <button
                        className="btn pickmyshow-signin"
                        type="button" onClick={(e) => { e.preventDefault(); onLinkclick("Signin") }}
                    >
                        Sign in
                    </button>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;