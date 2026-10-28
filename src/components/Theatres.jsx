
import { useState } from "react";
import { Link } from "react-router";
import "../css/EntertainmentPages.css";

const theatres = [
    {
        name: "PVR Cinemas",
        area: "Lower Parel",
        city: "Mumbai",
        rating: "4.5",
        reviews: "2.4K",
        review: "Great screens, comfortable seats and a premium experience.",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=85",
        amenities: ["IMAX", "Recliners", "Food & Drinks"],
        distance: "Premium cinema",
        times: ["10:15 AM", "1:30 PM", "5:00 PM", "8:45 PM"],
    },
    {
        name: "INOX",
        area: "Nariman Point",
        city: "Mumbai",
        rating: "4.3",
        reviews: "1.8K",
        review: "A comfortable setting for a relaxed movie outing.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=85",
        amenities: ["Laser Projection", "Food Court"],
        distance: "Central location",
        times: ["10:45 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
    },
    {
        name: "Cinépolis",
        area: "Andheri",
        city: "Mumbai",
        rating: "4.4",
        reviews: "1.5K",
        review: "A modern cinema with a good range of viewing options.",
        image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=85",
        amenities: ["Premium Screens", "Dolby Audio"],
        distance: "Modern experience",
        times: ["11:00 AM", "2:15 PM", "6:15 PM", "9:30 PM"],
    },
    {
        name: "PVR ICON",
        area: "Versova",
        city: "Mumbai",
        rating: "4.2",
        reviews: "980",
        review: "A convenient option for a movie night with friends.",
        image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=800&q=85",
        amenities: ["Recliners", "Food & Drinks"],
        distance: "Neighbourhood favourite",
        times: ["10:30 AM", "1:45 PM", "5:15 PM", "8:30 PM"],
    },
];

const cityOptions = ["All Cities", "Mumbai", "Delhi", "Bengaluru", "Hyderabad"];

function Theatres() {
    const [city, setCity] = useState("Mumbai");
    const [search, setSearch] = useState("");

    const filteredTheatres = theatres.filter((theatre) => {
        const cityMatch = city === "All Cities" || theatre.city === city;
        const searchMatch =
            `${theatre.name} ${theatre.area} ${theatre.city}`
                .toLowerCase()
                .includes(search.toLowerCase());

        return cityMatch && searchMatch;
    });

    return (
        <main className="ep-page">
            <section className="ep-main-hero ep-theatres-hero">
                <img
                    src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1800&q=90"
                    alt="Cinema screen and seating"
                    className="ep-hero-bg"
                />
                <div className="ep-hero-shade" />
                <div className="ep-hero-content">
                    <span className="ep-eyebrow">THE MAGIC OF THE BIG SCREEN</span>
                    <h1>Find your screen.<br />Make it a night.</h1>
                    <p>
                        Explore cinemas, compare showtimes and discover
                        the perfect setting for your next movie experience.
                    </p>
                    <a href="#theatre-listings" className="ep-primary-btn">
                        Find Theatres <span>→</span>
                    </a>
                    <div className="ep-hero-stats">
                        <span><strong>Explore</strong> cinemas</span>
                        <span><strong>Compare</strong> showtimes</span>
                        <span><strong>Plan</strong> your visit</span>
                    </div>
                </div>
            </section>

            <section className="ep-section" id="theatre-listings">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">CINEMAS AROUND YOU</span>
                        <h2>Find a theatre</h2>
                        <p>Search cinema names or areas to explore the available listings.</p>
                    </div>
                    <span className="ep-section-count">{filteredTheatres.length} RESULTS</span>
                </div>

                <div className="ep-theatre-search">
                    <div className="ep-search-input-wrap">
                        <span aria-hidden="true">⌕</span>
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search theatres or areas"
                            aria-label="Search theatres or areas"
                        />
                    </div>

                    <select
                        className="ep-select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        aria-label="Choose city"
                    >
                        {cityOptions.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="ep-theatre-list">
                    {filteredTheatres.map((theatre) => (
                        <article className="ep-theatre-row" key={theatre.name}>
                            <img src={theatre.image} alt={theatre.name} loading="lazy" />

                            <div className="ep-theatre-details">
                                <div className="ep-theatre-title-line">
                                    <div>
                                        <h3>{theatre.name}</h3>
                                        <p className="ep-muted">
                                            <span className="ep-location-dot">●</span>
                                            {theatre.area}, {theatre.city}
                                        </p>
                                    </div>
                                    <span className="ep-rating">★ {theatre.rating}</span>
                                </div>

                                <div className="ep-theatre-review">
                                    <strong>{theatre.reviews} reviews</strong>
                                    <p>“{theatre.review}”</p>
                                </div>

                                <div className="ep-theatre-amenities">
                                    {theatre.amenities.map((amenity) => (
                                        <span key={amenity}>{amenity}</span>
                                    ))}
                                </div>

                                <div className="ep-theatre-showtimes">
                                    <span className="ep-showtime-label">SAMPLE SHOWTIMES</span>
                                    <div className="ep-showtimes">
                                        {theatre.times.map((time) => (
                                            <Link
                                                key={time}
                                                to="/Movies"
                                                className="ep-showtime"
                                                title="Browse movies"
                                            >
                                                {time}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}

                    {filteredTheatres.length === 0 && (
                        <div className="ep-empty-state">
                            <h3>No theatres found</h3>
                            <p>Try another theatre name, area or city.</p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setCity("Mumbai");
                                }}
                            >
                                Reset search
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="ep-carousel-section">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">THE BIG SCREEN EXPERIENCE</span>
                        <h2>Find your kind of cinema</h2>
                        <p>Explore different ways to enjoy your next film.</p>
                    </div>
                    <span className="ep-carousel-hint">EXPLORE <span>→</span></span>
                </div>

                <div className="ep-theatre-experience-grid">
                    <article className="ep-experience-card">
                        <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85" alt="Cinema auditorium" loading="lazy" />
                        <div><span>THE CLASSIC</span><h3>Movie night</h3><p>Enjoy the big screen with your favourite people.</p></div>
                    </article>
                    <article className="ep-experience-card">
                        <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=85" alt="Large cinema screen" loading="lazy" />
                        <div><span>PREMIUM VIEWING</span><h3>Immersive screens</h3><p>Discover premium formats where available.</p></div>
                    </article>
                    <article className="ep-experience-card">
                        <img src="https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=700&q=85" alt="Cinema seating" loading="lazy" />
                        <div><span>YOUR COMFORT</span><h3>Relax and enjoy</h3><p>Look for seating and amenities that suit you.</p></div>
                    </article>
                </div>
            </section>

            <section className="ep-wide-promo">
                <div>
                    <span className="ep-eyebrow">NOW PICK YOUR MOVIE</span>
                    <h2>Your next cinema experience awaits.</h2>
                    <p>Explore movies and plan your next outing.</p>
                </div>
                <Link to="/Movies" className="ep-primary-btn">Explore Movies <span>→</span></Link>
            </section>
        </main>
    );
}

export default Theatres;
