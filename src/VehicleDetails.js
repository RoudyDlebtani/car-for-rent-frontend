import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Footer } from "./App";
import LoginModal from "./LoginModal";
import { API_BASE } from "./api";
import { useAuth, authHeaders } from "./auth";
import { Star, Speed, Gear, Seat, Door, Tag } from "./Icons";

/* A small labelled spec chip (the cards that fan around the car in the reference). */
function SpecChip({ icon: Icon, label, value, side, i }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div
      className={`vd-chip vd-chip--${side}`}
      style={{ "--i": i }}
    >
      <span className="vd-chip__icon"><Icon /></span>
      <span className="vd-chip__text">
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </div>
  );
}

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/* A labelled 0–5 score rendered as a filled bar (reliability / luxury). */
function RatingBar({ label, score }) {
  const val = score === null || score === undefined ? null : Number(score);
  const pct = val !== null ? Math.max(0, Math.min(100, (val / 5) * 100)) : 0;
  return (
    <div className="vd-ratingbar">
      <div className="vd-ratingbar__top">
        <span>{label}</span>
        <strong>{val !== null ? val.toFixed(1) : "—"}<small>/5</small></strong>
      </div>
      <div className="vd-ratingbar__track">
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function VehicleDetails() {
  const { slug } = useParams();
  const { token } = useAuth();
  const [car, setCar] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | notfound | error
  const [errorMsg, setErrorMsg] = useState("");

  // Booking widget state.
  const [rateMode, setRateMode] = useState("daily"); // daily | hourly
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [unavailable, setUnavailable] = useState(false);

  // Favorite (saved) state.
  const [isSaved, setIsSaved] = useState(false);
  const [savingFav, setSavingFav] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Gallery: which image is shown in the hero (0 = primary; reset per car).
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetch(`${API_BASE}/api/vehicles/${slug}`, { signal: controller.signal })
      .then((res) => res.json().then((json) => ({ res, json })))
      .then(({ res, json }) => {
        if (res.status === 404 || (json && json.success === false)) {
          setStatus("notfound");
          return;
        }
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setCar(json.data);
        setStatus("ok");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setErrorMsg(err.message);
        setStatus("error");
      });
    return () => controller.abort();
  }, [slug]);

  // Once we know the car + we're logged in, check whether it's already saved.
  useEffect(() => {
    if (!token || !car) {
      setIsSaved(false);
      return;
    }
    const controller = new AbortController();
    fetch(`${API_BASE}/api/favorites`, {
      headers: authHeaders(token),
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && json.success) {
          setIsSaved(json.data.some((c) => c.id === car.id));
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [token, car]);

  // Toggle save/unsave. Logged-out users are prompted to log in instead.
  const toggleFavorite = () => {
    if (!token) {
      setLoginOpen(true);
      return;
    }
    if (!car || savingFav) return;
    const next = !isSaved;
    setIsSaved(next); // optimistic
    setSavingFav(true);
    fetch(`${API_BASE}/api/favorites/${car.id}`, {
      method: next ? "POST" : "DELETE",
      headers: { "Content-Type": "application/json", ...authHeaders(token) },
      body: next ? JSON.stringify({}) : undefined,
    })
      .then((res) => {
        if (!res.ok) throw new Error();
      })
      .catch(() => setIsSaved(!next)) // revert on failure
      .finally(() => setSavingFav(false));
  };

  // Images come pre-ordered (is_primary DESC, sort_order ASC) → index 0 is primary.
  const images = useMemo(() => (car && car.images) || [], [car]);
  const safeIndex = images.length ? Math.min(activeImage, images.length - 1) : 0;
  const heroImage = images.length ? images[safeIndex].url : null;
  const prevImage = () =>
    setActiveImage((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setActiveImage((i) => (i + 1) % images.length);

  const dailyRate = car ? Number(car.daily_rate) : 0;
  const hourlyRate = Math.max(1, Math.round(dailyRate / 24));
  const unitRate = rateMode === "daily" ? dailyRate : hourlyRate;

  // Nights between the two dates → booking total (daily basis).
  const nights = useMemo(() => {
    if (!from || !to) return 0;
    const d = (new Date(to) - new Date(from)) / 86400000;
    return d > 0 ? Math.round(d) : 0;
  }, [from, to]);
  const total = (nights > 0 ? nights : 1) * unitRate;

  /* ---- non-ok states ---- */
  if (status !== "ok") {
    return (
      <div className="page">
        <Navbar />
        <main className="vd container vd--state">
          {status === "loading" && <p className="vd-state-text">Loading vehicle…</p>}
          {status === "notfound" && (
            <>
              <h1 className="display">Car not found</h1>
              <p className="vd-state-text">We couldn’t find a vehicle for “{slug}”.</p>
              <Link to="/all-cars" className="btn btn--amber">Back to all cars</Link>
            </>
          )}
          {status === "error" && (
            <>
              <h1 className="display">Something went wrong</h1>
              <p className="vd-state-text">{errorMsg}</p>
              <p className="vd-state-hint">Make sure the backend is running on {API_BASE}.</p>
              <Link to="/all-cars" className="btn btn--amber">Back to all cars</Link>
            </>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  const rating = car.reliability_score ? Number(car.reliability_score).toFixed(1) : null;

  const leftChips = [
    { icon: Tag, label: "Color", value: cap(car.color) },
    { icon: Gear, label: "Transmission", value: cap(car.transmission) },
    { icon: Seat, label: "Seats", value: car.seats ? `${car.seats} seats` : null },
    { icon: Door, label: "Body", value: cap(car.body_type) || cap(car.doors ? `${car.doors} doors` : "") },
  ];
  const rightChips = [
    { icon: Speed, label: "Fuel", value: cap(car.fuel_type) },
    { icon: Speed, label: "Engine", value: car.engine_label },
    { icon: Speed, label: "Mileage", value: car.mileage_km ? `${car.mileage_km.toLocaleString()} km` : null },
    { icon: Star, label: "Class", value: cap(car.vehicle_class) },
  ];

  return (
    <div className="page">
      <Navbar />

      <main className="vd container">
        {/* Top bar */}
        <div className="vd-top">
          <Link to="/all-cars" className="vd-back" aria-label="Back to all cars">←</Link>
          <h1 className="vd-title">
            {car.make} <span>{car.model}</span>
            <em className="vd-year">{car.year}</em>
          </h1>
          <div className="vd-top__right">
            {rating && (
              <span className="vd-rating">
                <Star className="amber-text" /> {rating}
                <small>rating</small>
              </span>
            )}
            <button
              className={`vd-fav${isSaved ? " is-saved" : ""}`}
              onClick={toggleFavorite}
              disabled={savingFav}
              aria-pressed={isSaved}
            >
              {!token
                ? "♡ Log in to save"
                : isSaved
                ? "♥ Saved"
                : "♡ Add to favorite"}
            </button>
          </div>
        </div>

        {/* Hero stage — the car reveal happens here */}
        <section className="vd-stage" key={car.slug}>
          <div className="vd-chips vd-chips--left">
            {leftChips.map((c, i) => (
              <SpecChip key={c.label} {...c} side="left" i={i} />
            ))}
          </div>

          <div className="vd-carwrap">
            {heroImage ? (
              <img
                className="vd-car"
                key={heroImage}
                src={heroImage}
                alt={`${car.make} ${car.model}`}
              />
            ) : (
              <div className="vd-car vd-car--placeholder">No image</div>
            )}
            <span className="vd-ground" aria-hidden="true" />
          </div>

          <div className="vd-chips vd-chips--right">
            {rightChips.map((c, i) => (
              <SpecChip key={c.label} {...c} side="right" i={i} />
            ))}
          </div>

          {images.length > 1 && (
            <div className="vd-gallery-nav">
              <button onClick={prevImage} aria-label="Previous photo">‹</button>
              <button onClick={nextImage} aria-label="Next photo">›</button>
            </div>
          )}
        </section>

        {/* Bottom three cards */}
        <section className="vd-cards">
          {/* Gallery — click a thumbnail (or the ‹ › arrows) to change the hero photo */}
          <div className="vd-card vd-card--gallery">
            <div className="vd-card__head">
              Gallery
              <span className="vd-badge">
                {images.length} photo{images.length === 1 ? "" : "s"}
              </span>
            </div>
            {images.length > 1 ? (
              <div className="vd-thumbs">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    className={`vd-thumb${i === safeIndex ? " is-active" : ""}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show photo ${i + 1}`}
                    aria-pressed={i === safeIndex}
                  >
                    <img src={img.url} alt={img.alt_text || `${car.make} ${car.model} photo ${i + 1}`} />
                  </button>
                ))}
              </div>
            ) : (
              <p className="vd-card__note">Only one photo available for this vehicle.</p>
            )}
          </div>

          {/* Ratings & condition — real vehicle data */}
          <div className="vd-card vd-card--ratings">
            <div className="vd-card__head">
              Ratings &amp; Condition
              <span className={`vd-status vd-status--${car.availability_status}`}>
                {cap(car.availability_status)}
              </span>
            </div>
            <div className="vd-rate">
              <RatingBar label="Reliability" score={car.reliability_score} />
              <RatingBar label="Luxury" score={car.luxury_score} />
            </div>
            <div className="vd-condition">
              {car.mileage_km != null && (
                <span className="vd-cond">
                  <Speed />
                  <span><small>Mileage</small><strong>{Number(car.mileage_km).toLocaleString()} km</strong></span>
                </span>
              )}
              <span className="vd-cond">
                <Star />
                <span><small>Class</small><strong>{cap(car.vehicle_class)}</strong></span>
              </span>
            </div>
          </div>

          {/* Price + booking — real data */}
          <div className="vd-card vd-card--price">
            <div className="vd-card__head">Price Range</div>
            <div className="vd-price-row">
              <div className="vd-toggle" role="tablist">
                <button
                  className={rateMode === "hourly" ? "is-active" : ""}
                  onClick={() => setRateMode("hourly")}
                >Hourly</button>
                <button
                  className={rateMode === "daily" ? "is-active" : ""}
                  onClick={() => setRateMode("daily")}
                >Daily</button>
              </div>
              <div className="vd-price">
                <strong>${unitRate}</strong>
                <small>/ {rateMode === "daily" ? "day" : "hour"}</small>
              </div>
            </div>

            <div className="vd-booking">
              <span className="vd-booking__label">Booking</span>
              <div className="vd-dates">
                <label>
                  <small>From</small>
                  <input type="date" value={from} onChange={(e) => { setFrom(e.target.value); setUnavailable(false); }} />
                </label>
                <label>
                  <small>To</small>
                  <input type="date" value={to} onChange={(e) => { setTo(e.target.value); setUnavailable(false); }} />
                </label>
              </div>
            </div>

            <div className="vd-total">
              <span>
                Total Price
                {nights > 0 && <em> · {nights} day{nights > 1 ? "s" : ""}</em>}
              </span>
              <div className="vd-total__row">
                <strong>${total.toLocaleString()}</strong>
                <button className="btn btn--amber" onClick={() => setUnavailable(true)}>Rent Now</button>
              </div>
              {unavailable && (
                <p className="vd-total__msg">No Cars Available</p>
              )}
            </div>
          </div>
        </section>

        {/* Description + features */}
        {(car.description || (car.features && car.features.length > 0)) && (
          <section className="vd-about">
            {car.description && (
              <div className="vd-about__text">
                <h2 className="display">About this car</h2>
                <p>{car.description}</p>
              </div>
            )}
            {car.features && car.features.length > 0 && (
              <div className="vd-features">
                <h3>Features</h3>
                <div className="vd-feature-grid">
                  {car.features.map((f) => (
                    <span className="vd-feature" key={f.code}>{f.label}</span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
