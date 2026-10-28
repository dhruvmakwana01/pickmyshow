
import { useState } from "react";
import { Link } from "react-router";
import "../css/EntertainmentPages.css";

const nowShowing = [
    {
        title: "Interstellar",
        genre: "Sci-Fi / Adventure",
        language: "English",
        rating: "8.7",
        votes: "24.5K",
        review: "An unforgettable cinematic experience.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=85",
        certificate: "UA 13+",
        duration: "2h 49m",
        times: ["10:30 AM", "1:45 PM", "5:15 PM", "8:30 PM"],
    },
    {
        title: "The Grand Adventure",
        genre: "Adventure / Drama",
        language: "English",
        rating: "8.2",
        votes: "12.8K",
        review: "Beautiful visuals and a compelling story.",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=85",
        certificate: "UA 13+",
        duration: "2h 12m",
        times: ["11:00 AM", "2:20 PM", "6:00 PM", "9:15 PM"],
    },
    {
        title: "Into the Wild",
        genre: "Drama / Adventure",
        language: "English",
        rating: "8.1",
        votes: "9.2K",
        review: "A moving story with stunning scenery.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85",
        certificate: "UA 13+",
        duration: "2h 05m",
        times: ["9:45 AM", "12:50 PM", "4:30 PM", "7:45 PM"],
    },
    {
        title: "Midnight City",
        genre: "Thriller / Mystery",
        language: "English",
        rating: "7.9",
        votes: "7.4K",
        review: "A tense mystery with unexpected turns.",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85",
        certificate: "A",
        duration: "2h 08m",
        times: ["10:15 AM", "1:30 PM", "5:45 PM", "9:00 PM"],
    },
    {
        title: "Beyond the Horizon",
        genre: "Action / Sci-Fi",
        language: "English",
        rating: "8.4",
        votes: "18.1K",
        review: "An exciting big-screen spectacle.",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=85",
        certificate: "UA 13+",
        duration: "2h 18m",
        times: ["10:00 AM", "1:15 PM", "4:45 PM", "8:00 PM"],
    },
];

const upcoming = [
    {
        title: "A World Beyond",
        date: "COMING SOON",
        genre: "Sci-Fi / Adventure",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1000&q=85",
    },
    {
        title: "The Last Journey",
        date: "COMING SOON",
        genre: "Adventure / Drama",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
    },
    {
        title: "After the Sunset",
        date: "COMING SOON",
        genre: "Romance / Drama",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85",
    },
    {
        title: "Dark Matter",
        date: "COMING SOON",
        genre: "Thriller / Sci-Fi",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85",
    },
];

const genres = ["All", "Action", "Adventure", "Comedy", "Drama", "Sci-Fi", "Thriller"];

function Movies() {
    const [activeGenre, setActiveGenre] = useState("All");
    const [activeLanguage, setActiveLanguage] = useState("All Languages");

    const filteredMovies = nowShowing.filter((movie) => {
        const genreMatch =
            activeGenre === "All" ||
            movie.genre.toLowerCase().includes(activeGenre.toLowerCase());

        const languageMatch =
            activeLanguage === "All Languages" ||
            movie.language === activeLanguage;

        return genreMatch && languageMatch;
    });

    return (
        <main className="ep-page">
            <section className="ep-main-hero ep-movie-hero">
                <img
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=90"
                    alt="Cinema auditorium"
                    className="ep-hero-bg"
                />
                <div className="ep-hero-shade" />
                <div className="ep-hero-content">
                    <span className="ep-eyebrow">YOUR NEXT MOVIE NIGHT</span>
                    <h1>Every story deserves<br />the big screen.</h1>
                    <p>
                        Discover the movies everyone's talking about.
                        Find a showtime, choose your seats and make a night of it.
                    </p>
                    <a href="#now-showing" className="ep-primary-btn">
                        Explore Now Showing <span>→</span>
                    </a>
                    <div className="ep-hero-stats">
                        <span><strong>Discover</strong> your next favourite</span>
                        <span><strong>Compare</strong> showtimes</span>
                        <span><strong>Plan</strong> your movie night</span>
                    </div>
                </div>
            </section>

            <section className="ep-section" id="now-showing">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">ON THE BIG SCREEN</span>
                        <h2>Now showing</h2>
                        <p>Find a film, check the reviews and choose your showtime.</p>
                    </div>
                    <span className="ep-section-count">{filteredMovies.length} MOVIES</span>
                </div>

                <div className="ep-filter-row">
                    <div className="ep-filter-pills">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                type="button"
                                className={`ep-filter-pill ${activeGenre === genre ? "active" : ""}`}
                                onClick={() => setActiveGenre(genre)}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>

                    <select
                        className="ep-select"
                        value={activeLanguage}
                        onChange={(e) => setActiveLanguage(e.target.value)}
                        aria-label="Filter by language"
                    >
                        <option>All Languages</option>
                        <option>English</option>
                    </select>
                </div>

                {filteredMovies.length > 0 ? (
                    <div className="ep-movie-list">
                        {filteredMovies.map((movie) => (
                            <article className="ep-movie-row" key={movie.title}>
                                <img src={movie.image} alt={movie.title} loading="lazy" />

                                <div className="ep-movie-details">
                                    <div className="ep-movie-title-line">
                                        <h3>{movie.title}</h3>
                                        <span className="ep-rating">★ {movie.rating}</span>
                                    </div>

                                    <p className="ep-muted">
                                        {movie.genre} <span>·</span> {movie.language}
                                    </p>

                                    <div className="ep-movie-meta">
                                        <span>{movie.certificate}</span>
                                        <span>{movie.duration}</span>
                                        <span>{movie.votes} ratings</span>
                                    </div>

                                    <div className="ep-review-snippet">
                                        <span className="ep-review-icon">“</span>
                                        <div>
                                            <p>{movie.review}</p>
                                            <span>Audience sentiment</span>
                                        </div>
                                    </div>

                                    <div className="ep-showtime-area">
                                        <span className="ep-showtime-label">SAMPLE SHOWTIMES</span>
                                        <div className="ep-showtimes">
                                            {movie.times.map((time) => (
                                                <Link
                                                    key={time}
                                                    to="/Theatres"
                                                    className="ep-showtime"
                                                    title="Explore theatres"
                                                >
                                                    {time}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="ep-empty-state">
                        <h3>No movies in this category</h3>
                        <p>Try choosing another genre.</p>
                        <button type="button" onClick={() => setActiveGenre("All")}>
                            Show all movies
                        </button>
                    </div>
                )}
            </section>

            <section className="ep-carousel-section">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">MARK YOUR CALENDAR</span>
                        <h2>Coming soon</h2>
                        <p>A first look at stories coming to the big screen.</p>
                    </div>
                    <span className="ep-carousel-hint">AUTO-SCROLLING <span>→</span></span>
                </div>

                <div className="ep-marquee">
                    <div className="ep-marquee-track ep-upcoming-track">
                        {[...upcoming, ...upcoming].map((movie, index) => (
                            <article
                                className="ep-upcoming-card"
                                key={`${movie.title}-${index}`}
                            >
                                <img src={movie.image} alt={movie.title} loading="lazy" />
                                <div className="ep-upcoming-shade" />
                                <div className="ep-upcoming-content">
                                    <span className="ep-upcoming-tag">{movie.date}</span>
                                    <h3>{movie.title}</h3>
                                    <p>{movie.genre}</p>
                                    <Link to="/Theatres">Explore cinemas →</Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="ep-wide-promo">
                <div>
                    <span className="ep-eyebrow">THE PERFECT MOVIE NIGHT</span>
                    <h2>Your movie. Your people. Your moment.</h2>
                    <p>Find a cinema and explore the experience waiting for you.</p>
                </div>
                <Link to="/Theatres" className="ep-primary-btn">
                    Explore Theatres <span>→</span>
                </Link>
            </section>

            <section className="ep-section">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">MORE TO EXPLORE</span>
                        <h2>Make a plan beyond movies</h2>
                        <p>From live experiences to your next night in.</p>
                    </div>
                </div>

                <div className="ep-shortcut-grid">
                    <Link to="/Events" className="ep-shortcut-card">
                        <img
                            src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=700&q=85"
                            alt="Live music event"
                            loading="lazy"
                        />
                        <div><span>LIVE EXPERIENCES</span><h3>Explore Events →</h3></div>
                    </Link>
                    <Link to="/Streams" className="ep-shortcut-card">
                        <img
                            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=85"
                            alt="Cinematic landscape"
                            loading="lazy"
                        />
                        <div><span>YOUR NEXT WATCH</span><h3>Explore Streams →</h3></div>
                    </Link>
                    <Link to="/Theatres" className="ep-shortcut-card">
                        <img
                            src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=85"
                            alt="Cinema screen"
                            loading="lazy"
                        />
                        <div><span>BIG SCREEN MAGIC</span><h3>Find Theatres →</h3></div>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Movies;
