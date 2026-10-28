
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import "../css/EntertainmentPages.css";
import "../css/Home.css";

const heroSlides = [
    {
        title: 'The Big Screen Experience',
        subtitle: 'Discover the movies everyone is talking about.',
        category: 'NOW SHOWING',
        image: 'https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
        link: '/Movies'
    },
    {
        title: 'Your Next Unforgettable Night',
        subtitle: 'Find live events, concerts and experiences near you.',
        category: 'LIVE EVENTS',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=2000&q=85',
        link: '/Events'
    },
    {
        title: 'Entertainment, Anytime',
        subtitle: 'Explore shows and discover your next favourite series.',
        category: 'TRENDING STREAMS',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2000&q=85',
        link: '/Streams'
    }
];

const trendingMovies = [
    {
        title: 'Interstellar',
        genre: 'Sci-Fi · Adventure',
        rating: '8.7',
        image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
    },
    {
        title: 'Dune: Part Two',
        genre: 'Sci-Fi · Action',
        rating: '8.5',
        image: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg'
    },
    {
        title: 'The Batman',
        genre: 'Action · Crime',
        rating: '7.8',
        image: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg'
    },
    {
        title: 'Inception',
        genre: 'Sci-Fi · Thriller',
        rating: '8.8',
        image: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
    },
    {
        title: 'Oppenheimer',
        genre: 'Drama · History',
        rating: '8.3',
        image: 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg'
    }
];

const upcomingMovies = [
    {
        title: 'Avatar: Fire and Ash',
        genre: 'Adventure · Sci-Fi',
        image: 'https://image.tmdb.org/t/p/w500/b8m7v5Qp8M0s6nJ1wF2j8Q9xZ4.jpg'
    },
    {
        title: 'Superman',
        genre: 'Action · Adventure',
        image: 'https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg'
    },
    {
        title: 'Fantastic Four',
        genre: 'Superhero · Sci-Fi',
        image: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg'
    },
    {
        title: 'Mission: Impossible',
        genre: 'Action · Thriller',
        image: 'https://image.tmdb.org/t/p/w500/1j7Z0hQJ3g7r8K5y2f4m6n9p0sA.jpg'
    }
];

const events = [
    {
        title: 'Live Music Nights',
        description: 'Discover live performances and unforgettable music.',
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80'
    },
    {
        title: 'Stand-up Comedy',
        description: 'Laugh out loud with your favourite comedians.',
        image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=900&q=80'
    },
    {
        title: 'Arts and Experiences',
        description: 'Explore creative events and new experiences.',
        image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80'
    }
];

function Home() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((previous) => (previous + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const slide = heroSlides[activeSlide];

    return (
        <main className="ep-page home-page">
            <section className="home-hero">
                {heroSlides.map((item, index) => (
                    <div
                        key={item.title}
                        className={`home-hero-slide ${
                            index === activeSlide ? 'active' : ''
                        }`}
                        style={{ backgroundImage: `url("${item.image}")` }}
                        aria-hidden={index !== activeSlide}
                    />
                ))}

                <div className="home-hero-overlay" />

                <div className="home-hero-content" key={slide.title}>
                    <span className="home-hero-label">{slide.category}</span>
                    <h1>{slide.title}</h1>
                    <p>{slide.subtitle}</p>

                    <Link to={slide.link} className="home-hero-button">
                        Explore Now <span aria-hidden="true">→</span>
                    </Link>
                </div>

                <div className="home-hero-controls">
                    {heroSlides.map((item, index) => (
                        <button
                            type="button"
                            key={item.title}
                            className={`home-hero-dot ${
                                index === activeSlide ? 'active' : ''
                            }`}
                            onClick={() => setActiveSlide(index)}
                            aria-label={`Show slide ${index + 1}: ${item.title}`}
                            aria-pressed={index === activeSlide}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    className="home-hero-arrow home-hero-prev"
                    onClick={() =>
                        setActiveSlide(
                            (activeSlide - 1 + heroSlides.length) %
                                heroSlides.length
                        )
                    }
                    aria-label="Previous slide"
                >
                    ‹
                </button>

                <button
                    type="button"
                    className="home-hero-arrow home-hero-next"
                    onClick={() =>
                        setActiveSlide((activeSlide + 1) % heroSlides.length)
                    }
                    aria-label="Next slide"
                >
                    ›
                </button>
            </section>

            <section className="home-welcome">
                <div>
                    <span className="home-eyebrow">YOUR ENTERTAINMENT GUIDE</span>
                    <h2>What are you in the mood for?</h2>
                    <p>Movies, live events and shows worth your time.</p>
                </div>

                <div className="home-shortcuts">
                    <Link to="/Movies" className="home-shortcut">
                        <span className="home-shortcut-icon">▶</span>
                        <span>Movies</span>
                    </Link>
                    <Link to="/Events" className="home-shortcut">
                        <span className="home-shortcut-icon">♫</span>
                        <span>Events</span>
                    </Link>
                    <Link to="/Streams" className="home-shortcut">
                        <span className="home-shortcut-icon">▣</span>
                        <span>Streams</span>
                    </Link>
                    <Link to="/Theatres" className="home-shortcut">
                        <span className="home-shortcut-icon">⌖</span>
                        <span>Theatres</span>
                    </Link>
                </div>
            </section>

            <section className="home-section">
                <div className="home-section-heading">
                    <div>
                        <span className="home-eyebrow">POPULAR RIGHT NOW</span>
                        <h2>Trending Movies</h2>
                    </div>
                    <Link to="/Movies" className="home-view-all">
                        View all <span aria-hidden="true">→</span>
                    </Link>
                </div>

                <div className="home-movie-grid">
                    {trendingMovies.map((movie) => (
                        <article className="home-movie-card" key={movie.title}>
                            <div className="home-movie-poster">
                                <img src={movie.image} alt={movie.title} loading="lazy" />
                                <span className="home-movie-rating">
                                    ★ {movie.rating}
                                </span>
                            </div>
                            <h3>{movie.title}</h3>
                            <p>{movie.genre}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="home-section home-upcoming-section">
                <div className="home-section-heading">
                    <div>
                        <span className="home-eyebrow">COMING SOON</span>
                        <h2>Upcoming Movies</h2>
                    </div>
                    <Link to="/Movies" className="home-view-all">
                        Explore movies <span aria-hidden="true">→</span>
                    </Link>
                </div>

                <div className="home-upcoming-track">
                    {[...upcomingMovies, ...upcomingMovies].map((movie, index) => (
                        <article
                            className="home-upcoming-card"
                            key={`${movie.title}-${index}`}
                        >
                            <img src={movie.image} alt={movie.title} loading="lazy" />
                            <div className="home-upcoming-info">
                                <h3>{movie.title}</h3>
                                <p>{movie.genre}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="home-section">
                <div className="home-section-heading">
                    <div>
                        <span className="home-eyebrow">MAKE PLANS</span>
                        <h2>Events to Explore</h2>
                    </div>
                    <Link to="/Events" className="home-view-all">
                        View all <span aria-hidden="true">→</span>
                    </Link>
                </div>

                <div className="home-event-grid">
                    {events.map((event) => (
                        <Link
                            to="/Events"
                            className="home-event-card"
                            key={event.title}
                        >
                            <img src={event.image} alt={event.title} loading="lazy" />
                            <div className="home-event-overlay">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <span>Explore events →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="home-bottom-banner">
                <div>
                    <span className="home-eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</span>
                    <h2>Find something worth stepping out for.</h2>
                    <p>Explore movies, discover events and plan your next outing.</p>
                </div>
                <Link to="/Theatres" className="home-hero-button">
                    Find Theatres <span aria-hidden="true">→</span>
                </Link>
            </section>
        </main>
    );
}

export default Home;
