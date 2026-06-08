import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "./App";
import { API_BASE } from "./api";
import { useAuth, authHeaders } from "./auth";
import { Star, Pin } from "./Icons";

/* One saved car — the favorites endpoint returns a slimmer payload than the
   list endpoint (no transmission/seats/fuel), so this card only renders what
   /api/favorites provides. Links through to the full details page. */
function SavedCard({ car, onRemove }) {
  const price = Number(car.daily_rate);
  return (
    <div className="carcard saved-card">
      <Link to={`/cars/${car.slug}`} className="saved-card__link">
        <div className="carcard__media">
          {car.image_url ? (
            <img src={car.image_url} alt={car.title || `${car.make} ${car.model}`} />
          ) : (
            <div className="carcard__placeholder">No image</div>
          )}
          <span className="carcard__class">{car.vehicle_class}</span>
        </div>
        <div className="carcard__body">
          <h3 className="carcard__title">
            {car.make} {car.model}
            <span className="carcard__year"> · {car.year}</span>
          </h3>
          <p className="carcard__loc">
            <Pin /> {car.location_city || "—"}
          </p>
          <div className="carcard__foot">
            <div className="carcard__price">
              <strong>${Number.isFinite(price) ? price.toFixed(0) : car.daily_rate}</strong>
              <small>/ day</small>
            </div>
            <span className="btn btn--dark carcard__btn">View Details</span>
          </div>
        </div>
      </Link>
      <button
        className="saved-card__remove"
        onClick={() => onRemove(car.id)}
        aria-label={`Remove ${car.make} ${car.model} from saved`}
      >
        Remove
      </button>
    </div>
  );
}

export default function Account() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Confirm the session is still valid + load saved cars.
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    const headers = authHeaders(token);

    setLoading(true);
    setError(null);

    // Validate the session; a stale token means we log out and go home.
    fetch(`${API_BASE}/api/auth/me`, { headers, signal: controller.signal })
      .then((res) => {
        if (res.status === 401) {
          logout();
          navigate("/");
          throw new Error("session expired");
        }
        return fetch(`${API_BASE}/api/favorites`, { headers, signal: controller.signal });
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((json) => {
        if (!json.success) throw new Error(json.message || "Failed to load saved cars");
        setFavorites(json.data);
      })
      .catch((err) => {
        if (err.name === "AbortError" || err.message === "session expired") return;
        setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [token, logout, navigate]);

  const handleRemove = (vehicleId) => {
    const prev = favorites;
    setFavorites((f) => f.filter((c) => c.id !== vehicleId)); // optimistic
    fetch(`${API_BASE}/api/favorites/${vehicleId}`, {
      method: "DELETE",
      headers: authHeaders(token),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
      })
      .catch(() => setFavorites(prev)); // revert on failure
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Guard: avatar only routes here when logged in; this covers direct URL / refresh.
  if (!token) return <Navigate to="/" replace />;

  const name = (user && user.display_name) || "Driver";
  const email = user && user.email;
  const initial = (name || email || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="page">
      <Navbar />

      <main className="account container">
        {/* Account summary */}
        <section className="account__head">
          <div className="account__id">
            <span className="account__avatar">{initial}</span>
            <div>
              <p className="account__crumb">
                <Link to="/">Home</Link> · My Account
              </p>
              <h1 className="display account__name">{name}</h1>
              {email && <p className="account__email">{email}</p>}
            </div>
          </div>
          <button className="btn btn--dark account__logout" onClick={handleLogout}>
            Log out
          </button>
        </section>

        {/* Saved cars */}
        <section className="account__saved">
          <div className="account__saved-head">
            <h2 className="display">
              <Star className="amber-text" /> Saved cars
            </h2>
            <span className="account__count">
              {loading ? "Loading…" : `${favorites.length} saved`}
            </span>
          </div>

          {error ? (
            <div className="allcars__state allcars__state--error">
              <p>Couldn’t load your saved cars: {error}</p>
              <p className="allcars__hint">Make sure the backend is running on {API_BASE}.</p>
            </div>
          ) : loading ? (
            <div className="allcars__state">Loading your saved cars…</div>
          ) : favorites.length === 0 ? (
            <div className="allcars__state account__empty">
              <p>You haven’t saved any cars yet.</p>
              <Link to="/all-cars" className="btn btn--amber">Browse all cars</Link>
            </div>
          ) : (
            <div className="carcard-grid">
              {favorites.map((car) => (
                <SavedCard key={car.id} car={car} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
