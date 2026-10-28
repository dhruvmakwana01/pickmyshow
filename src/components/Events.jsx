
import { useState } from "react";
import { Link } from "react-router";
import "../css/EntertainmentPages.css";

const events = [
    {
        title: "Live Music Festival",
        category: "Music",
        date: "SAT, 7:00 PM",
        location: "Mumbai",
        price: "From ₹999",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=85",
        rating: "4.8",
    },
    {
        title: "The Comedy Club",
        category: "Comedy",
        date: "FRI, 8:00 PM",
        location: "Mumbai",
        price: "From ₹499",
        image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=85",
        rating: "4.6",
    },
    {
        title: "Art After Hours",
        category: "Arts",
        date: "SUN, 11:00 AM",
        location: "Mumbai",
        price: "From ₹299",
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=85",
        rating: "4.7",
    },
    {
        title: "The Weekend Experience",
        category: "Lifestyle",
        date: "SAT, 4:00 PM",
        location: "Mumbai",
        price: "From ₹699",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=85",
        rating: "4.5",
    },
    {
        title: "Acoustic Evenings",
        category: "Music",
        date: "SUN, 6:30 PM",
        location: "Mumbai",
        price: "From ₹399",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=85",
        rating: "4.7",
    },
];

const categories = ["All", "Music", "Comedy", "Arts", "Lifestyle"];

function Events() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredEvents = events.filter(
        (event) => activeCategory === "All" || event.category === activeCategory
    );

    return (
        <main className="ep-page">
            <section className="ep-main-hero ep-events-hero">
                <img
                    src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1800&q=90"
                    alt="Crowd at a live event"
                    className="ep-hero-bg"
                />
                <div className="ep-hero-shade" />
                <div className="ep-hero-content">
                    <span className="ep-eyebrow">LIFE HAPPENS OUT THERE</span>
                    <h1>Go where the<br />good times are.</h1>
                    <p>
                        Concerts, comedy, culture and experiences worth leaving
                        the house for. Find your next reason to get out there.
                    </p>
                    <a href="#all-events" className="ep-primary-btn">
                        Discover Events <span>→</span>
                    </a>
                    <div className="ep-hero-stats">
                        <span><strong>Live music</strong> & festivals</span>
                        <span><strong>Comedy</strong> & performances</span>
                        <span><strong>New experiences</strong> to discover</span>
                    </div>
                </div>
            </section>

            <section className="ep-section">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">THE ONES TO WATCH</span>
                        <h2>Featured experiences</h2>
                        <p>Ideas for your next night out, date or weekend plan.</p>
                    </div>
                    <span className="ep-carousel-hint">AUTO-SCROLLING <span>→</span></span>
                </div>

                <div className="ep-marquee">
                    <div className="ep-marquee-track ep-event-feature-track">
                        {[...events, ...events].map((event, index) => (
                            <article className="ep-event-feature-card" key={`${event.title}-${index}`}>
                                <img src={event.image} alt={event.title} loading="lazy" />
                                <div className="ep-event-feature-shade" />
                                <div className="ep-event-feature-content">
                                    <span>{event.category.toUpperCase()}</span>
                                    <h3>{event.title}</h3>
                                    <p>{event.date} · {event.location}</p>
                                    <Link to="/Events">Explore event →</Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="ep-section" id="all-events">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">MAKE YOUR NEXT PLAN</span>
                        <h2>Explore all events</h2>
                        <p>Pick your vibe and discover something new.</p>
                    </div>
                    <span className="ep-section-count">{filteredEvents.length} EXPERIENCES</span>
                </div>

                <div className="ep-filter-row">
                    <div className="ep-filter-pills">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className={`ep-filter-pill ${activeCategory === category ? "active" : ""}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ep-event-grid">
                    {filteredEvents.map((event) => (
                        <article className="ep-event-card" key={event.title}>
                            <div className="ep-event-image">
                                <img src={event.image} alt={event.title} loading="lazy" />
                                <span className="ep-category-tag">{event.category}</span>
                                <span className="ep-rating">★ {event.rating}</span>
                            </div>
                            <div className="ep-event-body">
                                <div className="ep-event-date">{event.date}</div>
                                <h3>{event.title}</h3>
                                <p className="ep-muted">{event.location} · {event.category}</p>
                                <div className="ep-event-footer">
                                    <strong>{event.price}</strong>
                                    <Link to="/Events" className="ep-outline-btn">Explore</Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="ep-wide-promo">
                <div>
                    <span className="ep-eyebrow">MAKE THE MOST OF YOUR WEEKEND</span>
                    <h2>Less scrolling. More living.</h2>
                    <p>Find the people, places and experiences that make a day memorable.</p>
                </div>
                <Link to="/Movies" className="ep-primary-btn">Plan a Movie Night <span>→</span></Link>
            </section>

            <section className="ep-section">
                <div className="ep-section-heading">
                    <div>
                        <span className="ep-eyebrow">CHANGE OF PLANS?</span>
                        <h2>There's more to explore</h2>
                    </div>
                </div>
                <div className="ep-shortcut-grid">
                    <Link to="/Movies" className="ep-shortcut-card">
                        <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85" alt="Cinema" loading="lazy" />
                        <div><span>ON THE BIG SCREEN</span><h3>Movies →</h3></div>
                    </Link>
                    <Link to="/Streams" className="ep-shortcut-card">
                        <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=85" alt="Streaming" loading="lazy" />
                        <div><span>YOUR NEXT WATCH</span><h3>Streams →</h3></div>
                    </Link>
                    <Link to="/Theatres" className="ep-shortcut-card">
                        <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=85" alt="Theatre" loading="lazy" />
                        <div><span>FIND YOUR SCREEN</span><h3>Theatres →</h3></div>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Events;
