import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import { useAuth } from "./auth";
import {
  images,
  navLinks,
  vehicleTypes,
  stats,
  dreamSpecs,
  stories,
  brands,
  footerColumns,
} from "./data";
import AllCars from "./AllCars";
import VehicleDetails from "./VehicleDetails";
import Account from "./Account";
import InfoPage from "./InfoPage";
import {
  Search,
  Arrow,
  User,
  Star,
  Tag,
  Pin,
  Speed,
  Gear,
  Seat,
  Door,
} from "./Icons";

const Sparkle = ({ className = "" }) => (
  <svg className={`sparkle ${className}`} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 0c4 28 18 42 46 50-28 8-42 22-46 50-4-28-18-42-46-50 28-8 42-22 46-50z" />
  </svg>
);

/* ------------------------------ Navbar ------------------------------ */
export function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Logged in → the avatar goes to the account page; logged out → open login.
  const handleAvatar = () => {
    if (user) navigate("/account");
    else setAuthOpen(true);
  };
  const initial = user && (user.display_name || user.email || "?").trim().charAt(0).toUpperCase();

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <Link to="/" className="logo">RENTAL</Link>
          <nav className="nav__links">
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to}>{l.label}</Link>
            ))}
          </nav>
          <div className="nav__actions">
            <button
              className={`avatar${user ? " avatar--user" : ""}`}
              aria-label={user ? "My account" : "Log in"}
              onClick={handleAvatar}
            >
              {user ? <span className="avatar__initial">{initial}</span> : <User />}
            </button>
            <Link to="/all-cars" className="btn btn--amber">Car Rental</Link>
          </div>
        </div>
      </header>
      <LoginModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

/* ------------------------------- Hero ------------------------------- */
function Hero() {
  return (
    <section className="hero" id="top">
      <Sparkle className="hero__sparkle" />
      <div className="container hero__inner">
        <h1 className="display hero__title">Premium Car<br />Rental</h1>

        <div className="searchbar">
          <div className="searchbar__tabs">
            <button className="tab tab--active">Car</button>
            <button className="tab">Vans</button>
          </div>
          <div className="searchbar__fields">
            <div className="field">
              <span className="field__label">Pickup &amp; Return location</span>
              <span className="field__value">Dallas, Texas</span>
            </div>
            <div className="field">
              <span className="field__label">Start</span>
              <span className="field__value">Oct 16, 10:00 AM</span>
            </div>
            <div className="field">
              <span className="field__label">Stop</span>
              <span className="field__value">Oct 18, 5:00 PM</span>
            </div>
            <button className="search-btn" aria-label="Search"><Search /></button>
          </div>
        </div>

        <div className="hero__car">
          <img src={images.hero} alt="Yellow supercar" />
        </div>
      </div>
      <button className="scroll-indicator" aria-label="Scroll down">
        <span />
      </button>
    </section>
  );
}

/* ------------------------------ About ------------------------------- */
function About() {
  return (
    <section className="about container">
      <div className="about__text">
        <h2 className="display">Premium Car<br />Rental</h2>
        <p>
          Selected Car Service is made to help with service and repairs of
          exclusive, modern and classic cars. With our workshop for exclusive
          cars, we have the opportunity to provide the best service for your car
          in a cooperative parallel workshop. Get in touch for out more about
          what services offer us, and we are at your exclusive workshop.
        </p>
        <Link to="/about" className="btn btn--dark">Read more</Link>

        <div className="about__numbers">
          <div className="about__numbers-label">
            <span>Our numbers</span>
            <Arrow className="amber-text" />
          </div>
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.value}>
                <div className="stat__value display">{s.value}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="about__media">
        <img src={images.range} className="about__img about__img--small" alt="White SUV" />
        <img src={images.about} className="about__img about__img--big" alt="Red supercar" />
      </div>
    </section>
  );
}

/* ----------------------------- Vehicles ----------------------------- */
function Vehicles() {
  return (
    <section className="vehicles container">
      <h2 className="display section-title">Wide range of<br />vehicles</h2>
      <div className="vehicle-grid">
        {vehicleTypes.map((v) => (
          <Link
            to={`/all-cars?category=${v.code}`}
            className="vcard"
            key={v.name}
            style={{ "--bg": `url(${v.img})` }}
            aria-label={`Browse ${v.name}`}
          >
            <img src={v.img} alt={v.name} />
            <span className="vcard__name display">{v.name}</span>
            <span className="round-btn" aria-hidden="true">
              <Arrow />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- Locations ----------------------------- */
function PhoneMock() {
  return (
    <div className="phone">
      <div className="phone__notch" />
      <div className="phone__tabs">
        <span className="phone__tab phone__tab--active">Information</span>
        <span className="phone__tab">Notification</span>
      </div>
      <div className="phone__card">
        <img src={images.phone} alt="Lamborghini Urus" />
        <div className="phone__card-row">
          <strong>Lamborghini Urus</strong>
          <span className="amber-text">$225</span>
        </div>
        <div className="phone__meta">
          <span><Star className="amber-text" /> 4.9</span>
          <span>320 km/h</span>
        </div>
      </div>
      <div className="phone__owner">
        <span className="phone__avatar"><User /></span>
        <div>
          <strong>Owner / Manager</strong>
          <div className="phone__meta"><Star className="amber-text" /> 4.9</div>
        </div>
      </div>
      <div className="phone__dark">
        <span className="phone__dark-label">New car</span>
        <strong>Corolla Cross</strong>
      </div>
    </div>
  );
}

function Locations() {
  return (
    <section className="locations container">
      <div className="locations__text">
        <h2 className="display">Find cars in<br />your locations</h2>
        <p>
          When we develop our cars, we always focus on the details. Our seventh
          tech is design and feel another property as towards a smarter and more
          sustainable future. The same maintenance sport for our crews at
          authoritative on look the cultivation of interest and pure interaction
          and showcase our unique community identity. The solid lines so agreed
          long-expanding shall who knows we might away they were range hard.
        </p>
        <button className="btn btn--dark">See locations</button>
      </div>
      <div className="locations__map">
        <div className="map-grid" aria-hidden="true">
          <Pin className="map-pin map-pin--a" />
          <Pin className="map-pin map-pin--b" />
          <svg className="map-route" viewBox="0 0 300 220" preserveAspectRatio="none">
            <path d="M40 160 C100 120 120 90 170 110 S250 80 270 60" fill="none" />
          </svg>
        </div>
        <PhoneMock />
      </div>
    </section>
  );
}

/* ----------------------------- DreamCar ----------------------------- */
const specIcons = [Speed, Gear, Seat, Door];

const dreamImages = [
  { key: "dreamLeft", src: images.dreamLeft, alt: "" },
  { key: "dream", src: images.dream, alt: "Orange Lamborghini Urus" },
  { key: "dreamRight", src: images.dreamRight, alt: "" },
];
// Where each position moves to when the carousel rotates.
const cycleForward = { left: "center", center: "right", right: "left" };
const cycleBackward = { left: "right", center: "left", right: "center" };

function DreamCar() {
  const [positions, setPositions] = useState({
    dreamLeft: "left",
    dream: "center",
    dreamRight: "right",
  });

  const rotate = (map) =>
    setPositions((prev) => {
      const next = {};
      for (const key in prev) next[key] = map[prev[key]];
      return next;
    });

  const handleClick = (pos) => {
    if (pos === "left") rotate(cycleForward);
    else if (pos === "right") rotate(cycleBackward);
  };

  return (
    <section className="dream">
      <h2 className="display section-title">Pick your dream<br />car today</h2>
      <div className="dream__stage container">
        {dreamImages.map((img) => {
          const pos = positions[img.key];
          return (
            <img
              key={img.key}
              src={img.src}
              className={`dream__img dream__img--${pos}`}
              alt={img.alt}
              onClick={() => handleClick(pos)}
            />
          );
        })}
      </div>

      <div className="dream__specs container">
        {dreamSpecs.map((s, i) => {
          const Ic = specIcons[i];
          return (
            <div className="spec" key={s.label}>
              <Ic className="spec__icon" />
              <div className="spec__value display">
                {s.value}<small>{s.unit}</small>
              </div>
              <div className="spec__label">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="dream__price container">
        <div className="price">
          <Tag className="amber-text" />
          <span className="price__amount display">$225</span>
          <span className="price__unit">/ day</span>
        </div>
        <div className="dream__price-actions">
          <button className="btn btn--dark">View Details</button>
          <button className="btn btn--amber">Rent Now</button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Stories ----------------------------- */
function Stories() {
  return (
    <section className="stories container">
      <h2 className="display section-title">Stories behind<br />the wheel</h2>
      <div className="story-grid">
        {stories.map((s) => (
          <article className="story" key={s.title}>
            <div className="story__date">
              <span className="story__day display">{s.day}</span>
              <span className="story__month">{s.month}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.excerpt}</p>
            <div className="story__img">
              <img src={s.img} alt={s.title} />
            </div>
          </article>
        ))}
      </div>
      <div className="stories__cta">
        <button className="btn btn--dark">See all stories</button>
      </div>
    </section>
  );
}

/* ------------------------------ Brands ------------------------------ */
function Brands() {
  return (
    <section className="brands container">
      <div className="brand-row">
        {brands.map((b) => (
          <span className="brand" key={b}>{b}</span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ AppCta ------------------------------ */
function StoreBadge({ store }) {
  return (
    <button className="store-badge">
      <span className="store-badge__icon">{store === "ios" ? "" : "▶"}</span>
      <span className="store-badge__text">
        <small>{store === "ios" ? "Download on the" : "Get it on"}</small>
        <strong>{store === "ios" ? "App Store" : "Google Play"}</strong>
      </span>
    </button>
  );
}

function AppCta() {
  return (
    <section className="appcta-wrap container">
      <div className="appcta">
        <Sparkle className="appcta__sparkle" />
        <div className="appcta__text">
          <h2 className="display">Premium Car<br />Rental</h2>
          <p>Download the app and book your next ride in seconds.</p>
          <div className="appcta__badges">
            <StoreBadge store="ios" />
            <StoreBadge store="android" />
          </div>
        </div>
        <div className="appcta__phone">
          <div className="phone phone--app">
            <div className="phone__notch" />
            <div className="phone__tabs">
              <span className="phone__tab phone__tab--active">Information</span>
              <span className="phone__tab">Notification</span>
            </div>
            <div className="phone__card">
              <span className="phone__dark-label">New car</span>
              <img src={images.phone} alt="Lamborghini Urus" />
              <div className="phone__card-row">
                <strong>Lamborghini Urus</strong>
                <span className="amber-text">$225</span>
              </div>
              <div className="phone__meta">
                <span><Star className="amber-text" /> 4.9</span>
                <span>320 km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Footer ------------------------------ */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <h2 className="display footer__head">
            <Sparkle className="footer__sparkle" />
            Stay up to date on<br />all the latest news.
          </h2>
          <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your Email" aria-label="Your Email" />
            <button className="newsletter__btn" aria-label="Subscribe"><Arrow /></button>
          </form>
        </div>

        <div className="footer__cols">
          {footerColumns.map((c) => (
            <div className="footer__col" key={c.title}>
              <h4>{c.title}</h4>
              {c.links.map((l) => (
                <Link to={l.to} key={l.label}>{l.label}</Link>
              ))}
            </div>
          ))}
          <div className="footer__col">
            <h4>Follow Us</h4>
            <div className="socials">
              <span className="social">f</span>
              <span className="social">in</span>
              <span className="social">x</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>All rights reserved © Premium Rental 2024</span>
          <span className="footer__legal">
            <Link to="/privacy">Privacy Policy</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/terms">Terms &amp; Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <About />
      <Vehicles />
      <Locations />
      <DreamCar />
      <Stories />
      <Brands />
      <AppCta />
      <Footer />
    </div>
  );
}

// Reset scroll to the top whenever the route changes (React Router keeps the
// previous scroll position by default).
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/all-cars" element={<AllCars />} />
        <Route path="/cars/:slug" element={<VehicleDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/:slug" element={<InfoPage />} />
      </Routes>
    </>
  );
}
