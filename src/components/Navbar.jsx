
import { useState } from 'react';
import '../css/Navbar.css';
import { Link, useNavigate } from 'react-router';

function Navbar() {
    const [searchText, setSearchText] = useState('');
    const [selectedCity, setSelectedCity] = useState('Mumbai');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [citySearch, setCitySearch] = useState('');

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

    const handleLogout = () => {
        sessionStorage.removeItem('email');
        setIsMenuOpen(false);
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg pickmyshow-navbar">
            <div className="container">

                {/* Top Row */}
                <div className="pickmyshow-top-row">

                    {/* Menu Dropdown */}
                    <div className="pickmyshow-menu-wrapper">
                        <button
                            type="button"
                            className={`pickmyshow-menu-button ${isMenuOpen ? 'menu-open' : ''}`}
                            aria-label="Open menu"
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="menu-line"></span>
                            <span className="menu-line"></span>
                            <span className="menu-line"></span>
                        </button>

                        {isMenuOpen && (
                            <>
                                <button
                                    className="pickmyshow-menu-backdrop"
                                    aria-label="Close menu"
                                    onClick={() => setIsMenuOpen(false)}
                                ></button>

                                <div className="pickmyshow-dropdown">
                                    <div className="dropdown-heading">
                                        <span className="dropdown-logo">
                                            Pick<span>My</span>Show
                                        </span>
                                        <span className="dropdown-caption">
                                            Your entertainment hub
                                        </span>
                                    </div>

                                    <div className="dropdown-divider"></div>


                                    <Link
                                        to="/about"
                                        className="dropdown-item-custom"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <svg viewBox="0 0 24 24" className="menu-item-icon" aria-hidden="true">
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M12 11v5" />
                                            <circle cx="12" cy="7.5" r=".6" />
                                        </svg>
                                        <span>About Us</span>
                                        <span className="menu-item-arrow">›</span>
                                    </Link>

                                    <Link
                                        to="/support"
                                        className="dropdown-item-custom"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <svg viewBox="0 0 24 24" className="menu-item-icon" aria-hidden="true">
                                            <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
                                            <path d="M4 13h3v6H6a2 2 0 0 1-2-2z" />
                                            <path d="M20 13h-3v6h1a2 2 0 0 0 2-2z" />
                                            <path d="M17 19a5 5 0 0 1-5 2" />
                                        </svg>
                                        <span>Support</span>
                                        <span className="menu-item-arrow">›</span>
                                    </Link>

                                    <div className="dropdown-divider"></div>

                                    <button
                                        type="button"
                                        className="dropdown-item-custom dropdown-logout"
                                        onClick={handleLogout}
                                    >
                                        <svg viewBox="0 0 24 24" className="menu-item-icon" aria-hidden="true">
                                            <path d="M10 17l5-5-5-5" />
                                            <path d="M15 12H3" />
                                            <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                                        </svg>
                                        <span>Logout</span>
                                    </button>

                                </div>
                            </>
                        )}
                    </div>

                    {/* Website Logo */}
                    <Link className="navbar-brand pickmyshow-logo" to="/">
                        Pick<span>My</span>Show
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="navbar-toggler pickmyshow-mobile-toggle"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#pickmyshowNavbar"
                        aria-controls="pickmyshowNavbar"
                        aria-expanded="false"
                        aria-label="Toggle search and account options"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Top Row Controls */}
                    <div
                        className="collapse navbar-collapse pickmyshow-top-controls"
                        id="pickmyshowNavbar"
                    >
                        {/* City Selector */}

                        <div className="pickmyshow-city">
                            <button
                                type="button"
                                className={`city-select custom-city-select ${isCityOpen ? 'city-open' : ''}`}
                                onClick={() => {
                                    setIsCityOpen(!isCityOpen);
                                    setCitySearch('');
                                }}
                                aria-expanded={isCityOpen}
                            >
                                <span className="city-select-label">
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                    {selectedCity}
                                </span>
                                <span className="city-chevron">⌄</span>
                            </button>

                            {isCityOpen && (
                                <>
                                    <button
                                        type="button"
                                        className="city-click-outside"
                                        aria-label="Close city selector"
                                        onClick={() => setIsCityOpen(false)}
                                    />

                                    <div className="city-dropdown">
                                        <div className="city-dropdown-heading">
                                            <strong>Select your city</strong>
                                            <span>Choose your location</span>
                                        </div>

                                        <input
                                            type="text"
                                            className="city-search-input"
                                            placeholder="Search cities..."
                                            value={citySearch}
                                            onChange={(e) => setCitySearch(e.target.value)}
                                            autoFocus
                                        />

                                        <div className="city-options">
                                            {cities
                                                .filter((city) =>
                                                    city.toLowerCase().includes(citySearch.toLowerCase())
                                                )
                                                .map((city) => (
                                                    <button
                                                        type="button"
                                                        key={city}
                                                        className={`city-option ${selectedCity === city ? 'selected' : ''
                                                            }`}
                                                        onClick={() => {
                                                            setSelectedCity(city);
                                                            setIsCityOpen(false);
                                                            setCitySearch('');
                                                        }}
                                                    >
                                                        <span>{city}</span>
                                                        {selectedCity === city && (
                                                            <span className="city-check">✓</span>
                                                        )}
                                                    </button>
                                                ))}

                                            {cities.filter((city) =>
                                                city.toLowerCase().includes(citySearch.toLowerCase())
                                            ).length === 0 && (
                                                    <p className="city-no-results">No cities found</p>
                                                )}
                                        </div>
                                    </div>
                                </>
                            )}
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
                                placeholder="Search movies, events..."
                                aria-label="Search movies and events"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </form>

                        {/* Sign In */}
                        <button
                            className="btn pickmyshow-signin"
                            type="button"
                            onClick={() => navigate('/signin')}
                        >
                            Sign In
                        </button>

                        {/* Sign Up */}
                        <button
                            className="btn pickmyshow-signup"
                            type="button"
                            onClick={() => navigate('/Signup')}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Second Row: Main Navigation */}
                <div className="pickmyshow-nav-row">
                    <ul className="navbar-nav pickmyshow-nav-links">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Movies">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Events">Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Streams">Streams</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Theatres">Theatres</Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
