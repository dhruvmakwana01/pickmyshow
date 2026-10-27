import { useState } from 'react';
import '../css/Navbar.css';
import { Link, useNavigate } from 'react-router';

function Navbar() {
    const [searchText, setSearchText] = useState('');
    const [selectedCity, setSelectedCity] = useState('Mumbai');

    const navigate = useNavigate();

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
                <Link className="navbar-brand pickmyshow-logo" to="/">
                    Pick<span>My</span>Show
                </Link>

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
                            <Link className="nav-link" to="/Movies">
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

                    {/* Sign Up Button */}
                    <button
                        className="btn pickmyshow-signup"
                        type="button"
                        onClick={() => navigate('/Signup')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;