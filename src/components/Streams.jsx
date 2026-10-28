
import { useState } from "react";
import { Link } from "react-router";
import "../css/EntertainmentPages.css";

const trending = [
    {
        title: "The Last Frontier",
        type: "SCI-FI SERIES",
        platform: "Streaming pick",
        rating: "8.6",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=85",
        description: "A journey into the unknown.",
    },
    {
        title: "Beyond the Ordinary",
        type: "DOCUMENTARY",
        platform: "Editor's pick",
        rating: "8.4",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=85",
        description: "Real stories. Extraordinary lives.",
    },
    {
        title: "The Perfect Escape",
        type: "ADVENTURE",
        platform: "Popular",
        rating: "8.1",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=85",
        description: "A world waiting to be explored.",
    },
    {
        title: "After Dark",
        type: "THRILLER",
        platform: "Trending",
        rating: "7.9",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85",
        description: "Every answer hides a new question.",
    },
    {
        title: "Ocean Stories",
        type: "NATURE",
        platform: "Worth watching",
        rating: "8.8",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=85",
        description: "Discover life beneath the waves.",
    },
];

const upcoming = [
    {
        title: "New Worlds",
        date: "COMING SOON",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1000&q=85",
        category: "Sci-Fi",
    },
    {
        title: "The Great Outdoors",
        date: "COMING SOON",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
        category: "Adventure",
    },
    {
        title: "Unknown Territory",
        date: "COMING SOON",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85",
        category: "Drama",
    },
    {
        title: "The Final Signal",
        date: "COMING SOON",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85",
        category: "Thriller",
    },
];

const categories = ["All", "Series", "Movies", "Documentary", "Adventure", "Thriller"];

function Streams() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredTitles = trending.filter((title) => {
        if (activeCategory === "All") return true;
        if (activeCategory === "Series") return title.type.includes("SERIES");
        if (activeCategory === "Movies") return !title.type.includes("SERIES");
        return title.type.toLowerCase().includes(activeCategory.toLowerCase());
    });

    return (
        <main className="ep-page">
            <section className="ep-main-hero ep-streams-hero">
                <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=90"
                    alt="Atmospheric landscape"
                    className="ep-hero-bg"
                />
                <div className="ep-hero-shade" />
                <div className="ep-hero-content">
                    <span className="ep-eyebrow">YOUR NEXT BINGE STARTS HERE</span>
                    <h1>Find your next<br />can't-stop-watching.</h1>
                    <p>
                        Explore films, series and documentaries for every mood.
                        Your next favourite story is waiting to be discovered.
                    </p>
                    <a href="#trending-streams" className="ep-primary-btn">
                        Explore Trending <span>→</span>
                    </a>
                    <div className="ep-hero-stats">
                        <span><strong>Films</strong> worth finding</span>
                        <span><strong>Series</strong> worth staying up for</span>
                        <span><strong>Stories</strong> worth sharing</span>
                    </div>
                </div>
            </section>

            <section className="ep-section" id="trending-streams">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">THE WATCHLIST EVERYONE NEEDS</span>
                        <h2>Trending right now</h2>
                        <p>Discover what to watch next, across genres and formats.</p>
                    </div>
                    <span className="ep-section-count">{filteredTitles.length} PICKS</span>
                </div>

                <div className="ep-filter-row">
                    <div className="ep-filter-pills">
                        {categories.map((category) => (
                            <button
                                type="button"
                                key={category}
                                className={`ep-filter-pill ${activeCategory === category ? "active" : ""}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ep-stream-grid">
                    {filteredTitles.map((title) => (
                        <article className="ep-stream-card" key={title.title}>
                            <div className="ep-stream-image">
                                <img src={title.image} alt={title.title} loading="lazy" />
                                <span className="ep-category-tag">{title.type}</span>
                                <span className="ep-rating">★ {title.rating}</span>
                                <span className="ep-play-symbol" aria-hidden="true">▶</span>
                            </div>
                            <div className="ep-stream-body">
                                <span className="ep-eyebrow">{title.platform}</span>
                                <h3>{title.title}</h3>
                                <p>{title.description}</p>
                                <div className="ep-stream-footer">
                                    <span>Availability varies by platform</span>
                                    <button
                                        type="button"
                                        className="ep-text-btn"
                                        onClick={(e) => {
                                            e.currentTarget.textContent =
                                                e.currentTarget.textContent === "Saved ✓" ? "＋ Watchlist" : "Saved ✓";
                                        }}
                                    >
                                        ＋ Watchlist
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="ep-carousel-section">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">COMING TO YOUR SCREEN</span>
                        <h2>Coming soon</h2>
                        <p>Keep an eye out for your next favourite release.</p>
                    </div>
                    <span className="ep-carousel-hint">AUTO-SCROLLING <span>→</span></span>
                </div>

                <div className="ep-marquee">
                    <div className="ep-marquee-track ep-upcoming-track">
                        {[...upcoming, ...upcoming].map((title, index) => (
                            <article className="ep-upcoming-card" key={`${title.title}-${index}`}>
                                <img src={title.image} alt={title.title} loading="lazy" />
                                <div className="ep-upcoming-shade" />
                                <div className="ep-upcoming-content">
                                    <span className="ep-upcoming-tag">{title.date}</span>
                                    <h3>{title.title}</h3>
                                    <p>{title.category}</p>
                                    <span className="ep-coming-soon-label">Release details to be announced</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="ep-wide-promo ep-stream-promo">
                <div>
                    <span className="ep-eyebrow">A GOOD STORY IS ALWAYS IN SEASON</span>
                    <h2>Tonight's watchlist starts here.</h2>
                    <p>Want the full cinema experience instead? Find a movie on the big screen.</p>
                </div>
                <Link to="/Movies" className="ep-primary-btn">Explore Movies <span>→</span></Link>
            </section>

            <section className="ep-section">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">CHANGE THE SCENE</span>
                        <h2>More ways to spend your time</h2>
                    </div>
                </div>
                <div className="ep-shortcut-grid">
                    <Link to="/Movies" className="ep-shortcut-card">
                        <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85" alt="Cinema" loading="lazy" />
                        <div><span>ON THE BIG SCREEN</span><h3>Movies →</h3></div>
                    </Link>
                    <Link to="/Events" className="ep-shortcut-card">
                        <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=700&q=85" alt="Live event" loading="lazy" />
                        <div><span>OUT IN THE WORLD</span><h3>Events →</h3></div>
                    </Link>
                    <Link to="/Theatres" className="ep-shortcut-card">
                        <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=85" alt="Theatre" loading="lazy" />
                        <div><span>YOUR NEXT MOVIE NIGHT</span><h3>Theatres →</h3></div>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Streams;
