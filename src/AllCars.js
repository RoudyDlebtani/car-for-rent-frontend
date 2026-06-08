import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Navbar, Footer } from "./App";
import { API_BASE } from "./api";
import { Search, Speed, Gear, Seat } from "./Icons";

/* Filter option lists — categories & classes are fixed by the DB schema. */
const CATEGORY_OPTIONS = [
  { value: "", label: "All categories" },
  { value: "cars", label: "Cars" },
  { value: "suvs", label: "SUVs" },
  { value: "vans", label: "Vans" },
  { value: "electric", label: "Electric" },
];

const CLASS_OPTIONS = [
  { value: "", label: "All classes" },
  { value: "economy", label: "Economy" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];

const SORT_OPTIONS = [
  { value: "", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
];

const EMPTY_FILTERS = { q: "", category: "", vehicleClass: "", city: "", sort: "" };

/* Build the /api/vehicles query string from the active filters. */
function buildQuery(filters) {
  const params = new URLSearchParams({ limit: "100" });
  if (filters.q) params.set("q", filters.q);
  if (filters.category) params.set("category", filters.category);
  if (filters.vehicleClass) params.set("class", filters.vehicleClass);
  if (filters.city) params.set("city", filters.city);
  if (filters.sort) params.set("sort", filters.sort);
  return params.toString();
}

/* One car card — links to the vehicle details page. */
function CarCard({ car }) {
  const price = Number(car.daily_rate);
  return (
    <Link to={`/cars/${car.slug}`} className="carcard">
      <div className="carcard__media">
        {car.image_url ? (
          <img src={car.image_url} alt={car.title || `${car.make} ${car.model}`} />
        ) : (
          <div className="carcard__placeholder">No image</div>
        )}
        {car.is_featured && <span className="carcard__badge">Featured</span>}
        <span className="carcard__class">{car.vehicle_class}</span>
      </div>
      <div className="carcard__body">
        <h3 className="carcard__title">
          {car.make} {car.model}
          <span className="carcard__year"> · {car.year}</span>
        </h3>
        <p className="carcard__loc">
          {car.location_city}
          {car.location_country ? `, ${car.location_country}` : ""}
        </p>
        <div className="carcard__specs">
          <span><Gear /> {car.transmission}</span>
          <span><Seat /> {car.seats} seats</span>
          <span><Speed /> {car.fuel_type}</span>
        </div>
        <div className="carcard__foot">
          <div className="carcard__price">
            <strong>${Number.isFinite(price) ? price.toFixed(0) : car.daily_rate}</strong>
            <small>/ day</small>
          </div>
          <span className="btn btn--dark carcard__btn">View Details</span>
        </div>
      </div>
    </Link>
  );
}

const VALID_CATEGORIES = CATEGORY_OPTIONS.map((o) => o.value).filter(Boolean);

export default function AllCars() {
  const [searchParams] = useSearchParams();

  // Seed the category filter from ?category=... (e.g. arriving from the landing page).
  const [filters, setFilters] = useState(() => {
    const category = searchParams.get("category");
    return VALID_CATEGORIES.includes(category)
      ? { ...EMPTY_FILTERS, category }
      : EMPTY_FILTERS;
  });
  const [vehicles, setVehicles] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce the free-text search so we don't fetch on every keystroke.
  const [debouncedQ, setDebouncedQ] = useState(filters.q);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(filters.q), 350);
    return () => clearTimeout(t);
  }, [filters.q]);

  // Fetch vehicles whenever a filter changes.
  useEffect(() => {
    const controller = new AbortController();
    const qs = buildQuery({ ...filters, q: debouncedQ });

    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/vehicles?${qs}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((json) => {
        if (!json.success) throw new Error(json.message || "Failed to load cars");
        setVehicles(json.data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, filters.category, filters.vehicleClass, filters.city, filters.sort]);

  // Populate the city dropdown once from an unfiltered load.
  useEffect(() => {
    fetch(`${API_BASE}/api/vehicles?limit=100`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!json || !json.success) return;
        const unique = [...new Set(json.data.map((v) => v.location_city).filter(Boolean))];
        setCities(unique.sort());
      })
      .catch(() => {});
  }, []);

  const setFilter = (key) => (e) =>
    setFilters((f) => ({ ...f, [key]: e.target.value }));

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some(Boolean),
    [filters]
  );

  return (
    <div className="page">
      <Navbar />

      <main className="allcars container">
        <div className="allcars__head">
          <div>
            <p className="allcars__crumb">
              <Link to="/">Home</Link> · All Cars
            </p>
            <h1 className="display allcars__title">All Cars</h1>
          </div>
          <span className="allcars__count">
            {loading ? "Loading…" : `${vehicles.length} available`}
          </span>
        </div>

        {/* Filter bar */}
        <div className="filters">
          <div className="filters__search">
            <Search />
            <input
              type="text"
              placeholder="Search make, model, anything…"
              value={filters.q}
              onChange={setFilter("q")}
              aria-label="Search cars"
            />
          </div>

          <select value={filters.category} onChange={setFilter("category")} aria-label="Category">
            {CATEGORY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <select value={filters.vehicleClass} onChange={setFilter("vehicleClass")} aria-label="Class">
            {CLASS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <select value={filters.city} onChange={setFilter("city")} aria-label="City">
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select value={filters.sort} onChange={setFilter("sort")} aria-label="Sort">
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button className="filters__reset" onClick={() => setFilters(EMPTY_FILTERS)}>
              Reset
            </button>
          )}
        </div>

        {/* Results */}
        {error ? (
          <div className="allcars__state allcars__state--error">
            <p>Couldn’t load cars: {error}</p>
            <p className="allcars__hint">
              Make sure the backend is running on {API_BASE}.
            </p>
          </div>
        ) : loading ? (
          <div className="allcars__state">Loading cars…</div>
        ) : vehicles.length === 0 ? (
          <div className="allcars__state">No cars match your filters.</div>
        ) : (
          <div className="carcard-grid">
            {vehicles.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
