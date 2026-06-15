import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import { useAuth } from "./auth";
import { API_BASE } from "./api";
import {
  images,
  heroTabs,
  navLinks,
  vehicleTypes,
  stats,
  dreamSpecs,
  stories,
  whyUs,
  footerColumns,
} from "./data";
import AllCars from "./AllCars";
import VehicleDetails from "./VehicleDetails";
import Account from "./Account";
import InfoPage from "./InfoPage";
import useInView from "./useInView";
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
  Car,
  Bolt,
  Shield,
} from "./Icons";

const Sparkle = ({ className = "" }) => (
  <svg className={`sparkle ${className}`} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 0c4 28 18 42 46 50-28 8-42 22-46 50-4-28-18-42-46-50 28-8 42-22 46-50z" />
  </svg>
);

// Wraps a landing section so its content reveals (rise + fade) once it scrolls
// into view. Used on the Landing page only.
function Reveal({ as: Tag = "section", className = "", children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`${className} reveal${inView ? " in-view" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}

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
  const [tab, setTab] = useState(0);
  const active = heroTabs[tab];
  return (
    <section className="hero" id="top">
      <Sparkle className="hero__sparkle" />
      <div className="container hero__inner">
        <h1 className="display hero__title">Premium Car<br />Rental</h1>

        <div className="searchbar">
          <div className="searchbar__tabs">
            {heroTabs.map((t, i) => (
              <button
                key={t.key}
                className={`tab${i === tab ? " tab--active" : ""}`}
                onClick={() => setTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="searchbar__fields">
            <div className="field">
              <span className="field__label">Pickup &amp; Return location</span>
              <span className="field__value">{active.location}</span>
            </div>
            <div className="field">
              <span className="field__label">Start</span>
              <span className="field__value">{active.start}</span>
            </div>
            <div className="field">
              <span className="field__label">Stop</span>
              <span className="field__value">{active.stop}</span>
            </div>
            <Link to="/location" className="search-btn" aria-label="Search"><Search /></Link>
          </div>
        </div>

        <div className="hero__car">
          <img key={active.key} src={active.img} alt={active.alt} />
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
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`about container${inView ? " in-view" : ""}`}>
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
    <Reveal className="vehicles container">
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
    </Reveal>
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
    <Reveal className="locations container">
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
        <Link to="/location" className="btn btn--dark">See locations</Link>
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
    </Reveal>
  );
}

/* ----------------------------- DreamCar ----------------------------- */
const specIcons = [Speed, Gear, Seat, Door];

// Three fixed carousel slots; the cars[] array is indexed to match these so the
// rotation keeps working even after backend images swap in.
const slotIds = ["a", "b", "c"];
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
const priceLabel = (amount, currency) =>
  `${currencySymbols[currency] || `${currency || ""} `}${Math.round(Number(amount) || 0)}`;

// Offline fallback — the original static images + specs, one per slot.
const dreamImages = [
  { src: images.dreamLeft, alt: "Yellow convertible" },
  { src: images.dream, alt: "Orange Lamborghini Urus" },
  { src: images.dreamRight, alt: "White SUV" },
];
const fallbackCars = slotIds.map((id, i) => ({
  id,
  slug: null,
  src: dreamImages[i].src,
  alt: dreamImages[i].alt,
  title: dreamImages[i].alt,
  dailyRate: 225,
  currency: "USD",
  specs: dreamSpecs,
}));

// Where each position moves to when the carousel rotates.
const cycleForward = { left: "center", center: "right", right: "left" };
const cycleBackward = { left: "right", center: "left", right: "center" };

function DreamCar() {
  const navigate = useNavigate();
  const [cars, setCars] = useState(fallbackCars);
  const [positions, setPositions] = useState({ a: "left", b: "center", c: "right" });
  const [noCars, setNoCars] = useState(false);

  // Pull the top picks; map each into the shared card shape, padding to 3 from
  // the static fallback. Mirrors the Stories fetch.
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/vehicles/featured?limit=3`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!json || !json.success || !json.data.length) return; // keep fallback
        setCars(
          slotIds.map((id, i) => {
            const v = json.data[i];
            if (!v) return fallbackCars[i];
            return {
              id,
              slug: v.slug,
              src: v.image_url || fallbackCars[i].src,
              alt: v.title || `${v.make} ${v.model}`,
              title: v.title || `${v.make} ${v.model}`,
              dailyRate: v.daily_rate,
              currency: v.currency,
              specs: [
                { label: "Class", value: cap(v.vehicle_class), unit: "" },
                { label: "Gearbox", value: cap(v.transmission), unit: "" },
                { label: "Seats", value: v.seats, unit: "" },
                { label: "Fuel", value: cap(v.fuel_type), unit: "" },
              ],
            };
          })
        );
      })
      .catch(() => {}); // keep the fallback on error/abort
    return () => controller.abort();
  }, []);

  const rotate = (map) =>
    setPositions((prev) => {
      const next = {};
      for (const key in prev) next[key] = map[prev[key]];
      return next;
    });

  const handleClick = (pos) => {
    if (pos === "left") rotate(cycleForward);
    else if (pos === "right") rotate(cycleBackward);
    else return;
    setNoCars(false); // a new car is coming to the center
  };

  // The car currently in the center drives the specs, price, and buttons.
  const centerSlot = slotIds.find((id) => positions[id] === "center");
  const centered = cars[slotIds.indexOf(centerSlot)] || cars[0];

  const handleDetails = () =>
    navigate(centered.slug ? `/cars/${centered.slug}` : "/all-cars");

  return (
    <Reveal className="dream">
      <h2 className="display section-title">Pick your dream<br />car today</h2>
      <div className="dream__stage container">
        {cars.map((car, i) => {
          const pos = positions[slotIds[i]];
          return (
            <img
              key={car.id}
              src={car.src}
              className={`dream__img dream__img--${pos}`}
              alt={car.alt}
              onClick={() => handleClick(pos)}
            />
          );
        })}
      </div>

      <div className="dream__specs container">
        {centered.specs.map((s, i) => {
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
          <span className="price__amount display">{priceLabel(centered.dailyRate, centered.currency)}</span>
          <span className="price__unit">/ day</span>
        </div>
        <div className="dream__price-actions">
          <button className="btn btn--dark" onClick={handleDetails}>View Details</button>
          <button className="btn btn--amber" onClick={() => setNoCars(true)}>Rent Now</button>
          {noCars && <span className="dream__msg">No Cars Available now</span>}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------ Stories ----------------------------- */
// Trim text to a word boundary near `max` chars, adding an ellipsis.
function truncate(text, max = 110) {
  if (!text || text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function Stories() {
  // Cards come from featured vehicles; the static `stories` array is the offline
  // fallback and the per-index source for fields the backend can't supply (dates).
  const [items, setItems] = useState(stories);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/vehicles/featured?limit=3`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!json || !json.success || !json.data.length) return; // keep fallback
        setItems(
          json.data.slice(0, 3).map((v, i) => ({
            key: v.slug || stories[i]?.title,
            to: `/all-cars?q=${encodeURIComponent(`${v.make} ${v.model}`)}`,
            title: v.title || `${v.make} ${v.model}`,
            excerpt: truncate(v.description) || stories[i]?.excerpt,
            img: v.image_url || stories[i]?.img,
            day: stories[i]?.day,     // manual — schema has no publish date
            month: stories[i]?.month, // manual
          }))
        );
      })
      .catch(() => {}); // keep the fallback on error/abort
    return () => controller.abort();
  }, []);

  return (
    <Reveal className="stories container">
      <h2 className="display section-title">Stories behind<br />the wheel</h2>
      <div className="story-grid">
        {items.map((s) => (
          <Link className="story" to={s.to || "/all-cars"} key={s.key || s.title}>
            <div className="story__date">
              <span className="story__day display">{s.day}</span>
              <span className="story__month">{s.month}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.excerpt}</p>
            <div className="story__img">
              <img src={s.img} alt={s.title} />
            </div>
          </Link>
        ))}
      </div>

    </Reveal>
  );
}

/* ------------------------------ Brands ------------------------------ */
function Brands() {
  // Distinct makes from the backend; the static `brands` list is the offline fallback.
  const [brandList, setBrandList] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/vehicles/makes`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && json.success && json.data.length) setBrandList(json.data);
      })
      .catch(() => {}); // keep the fallback on error/abort
    return () => controller.abort();
  }, []);

  return (
    <Reveal className="brands">
      <div className="brands__marquee">
        <div className="brands__track">
          {[0, 1].map((copy) => (
            <div className="brands__group" key={copy} aria-hidden={copy === 1 || undefined}>
              {brandList.map((b) => (
                <span className="brand" key={b}>{b}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------ WhyUs ------------------------------ */
const whyUsIcons = { Car, Bolt, Shield };

function WhyUs() {
  return (
    <Reveal className="whyus container">
      <h2 className="section-title display">{whyUs.title}</h2>
      <div className="whyus__grid">
        {whyUs.cards.map((c) => {
          const Icon = whyUsIcons[c.icon];
          return (
            <div className="whyus__card" key={c.title}>
              <span className="whyus__icon">{Icon && <Icon />}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="whyus__stat">{c.stat}</span>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

/* ------------------------------ Footer ------------------------------ */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* <div className="footer__top">
          <h2 className="display footer__head">
            <Sparkle className="footer__sparkle" />
            Stay up to date on<br />all the latest news.
          </h2>
          <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your Email" aria-label="Your Email" />
            <button className="newsletter__btn" aria-label="Subscribe"><Arrow /></button>
          </form>
        </div> */}

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
      <WhyUs />
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

  console.log("test")
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
