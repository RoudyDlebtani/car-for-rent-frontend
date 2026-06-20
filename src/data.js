// Centralized content + imagery for the RENTAL landing page.
const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: u("1612825173281-9a193378527e", 1400), // yellow Lamborghini
  about: u("1592198084033-aade902d1aae", 1200), // red supercar
  range: u("1519641471654-76ce0107ad1b", 1200), // white SUV
  dream: u("1612825173281-9a193378527e", 1400), // orange Lamborghini SUV
  dreamLeft: u("1632245889029-e406faaa34cd", 900), // yellow convertible
  dreamRight: u("1519641471654-76ce0107ad1b", 900), // white SUV
  phone: u("1605559424843-9e4c228bf1c2", 800), // yellow Lamborghini (Locations phone mock)
};

// Final band — three reasons to rent, shown above the footer.
export const whyUs = {
  title: "Why rent with us",
  cards: [
    {
      icon: "Car",
      title: "Huge fleet, your pick",
      text: "From city runabouts to supercars — browse a constantly refreshed lineup and grab the exact car for your trip.",
      stat: "200+ cars · 4 categories",
    },
    {
      icon: "Bolt",
      title: "Book in minutes",
      text: "Pick your dates, confirm the price, and reserve instantly. No paperwork, no waiting at the counter.",
      stat: "Free cancellation",
    },
    {
      icon: "Shield",
      title: "Covered & supported 24/7",
      text: "Every rental includes insurance and round-the-clock roadside help, so you're never stranded.",
      stat: "★ 4.9 from 3,000+ reviews",
    },
  ],
};

// Hero search-bar tabs. Clicking one swaps the hero image + the search fields.
export const heroTabs = [
  {
    key: "car",
    label: "Car",
    category: "cars",
    location: "Dallas, Texas",
    start: "Oct 16, 10:00 AM",
    stop: "Oct 18, 5:00 PM",
    img: images.hero,
    alt: "Yellow supercar",
  },
  {
    key: "vans",
    label: "Vans",
    category: "vans",
    location: "Austin, Texas",
    start: "Oct 20, 9:00 AM",
    stop: "Oct 22, 6:00 PM",
    img: u("1559416523-140ddc3d238c", 1200),
    alt: "Cargo van",
  },
];

// "How it works" steps shown near the bottom of the landing page.
export const howSteps = [
  { title: "Browse the fleet", text: "Filter by type, city, and budget to find the car that fits your trip." },
  { title: "Book in minutes",  text: "Pick your dates, confirm the price, and reserve instantly — no paperwork." },
  { title: "Hit the road",     text: "Collect the keys at your pickup point and enjoy the drive. That's it." },
];

// Center navbar links — each { label, to } points to a real page.
export const navLinks = [
  { label: "About", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

// Offline fallback for the landing brand strip. The live list comes from
// /api/vehicles/makes; this shows if the API is unreachable so the marquee
// is never empty.
export const brands = [
  "Audi", "BMW", "Ford", "Hyundai", "Jeep", "Kia", "Mercedes-Benz",
  "Nissan", "Polestar", "Porsche", "Tesla", "Toyota", "Volkswagen",
];

// `code` matches the category codes the API/AllCars filter expects.
export const vehicleTypes = [
  { name: "Cars", code: "cars", img: u("1580273916550-e323be2ae537", 900) },
  { name: "SUVs", code: "suvs", img: u("1617469767053-d3b523a0b982", 900) },
  { name: "Vans", code: "vans", img: u("1559416523-140ddc3d238c", 900) },
  { name: "Electric", code: "electric", img: u("1617814076367-b759c7d7e738", 900) },
];

export const stats = [
  { value: "45M+", label: "Total payout / reborn" },
  { value: "5M+", label: "Happy reviews" },
  { value: "3000", label: "Reviews feedback" },
];

export const dreamSpecs = [
  { value: "300", unit: "km/h", label: "Top speed" },
  { value: "6", unit: "speed", label: "Gearbox" },
  { value: "5", unit: "seats", label: "Capacity" },
  { value: "4", unit: "doors", label: "Body" },
];

export const stories = [
  {
    day: "25",
    month: "December 2024",
    title: "Electrifying of the Experience",
    excerpt:
      "How the next generation of electric supercars is reshaping the way we feel the road.",
    img: u("1485463611174-f302f6a5c1c9", 900), // steering wheel
  },
  {
    day: "04",
    month: "December 2024",
    title: "Flexible hire for business",
    excerpt:
      "When ownership isn't the answer, long-term flexible hire keeps your fleet moving.",
    img: u("1614200179396-2bdb77ebf81b", 900), // red convertible
  },
  {
    day: "18",
    month: "November 2024",
    title: "Single vehicles to entire fleets",
    excerpt:
      "Get in touch if you need a single car or a whole fleet — we make it effortless.",
    img: u("1503376780353-7e6692767b70", 900), // supercar
  },
];



// Each link is { label, to } — `to` is a React Router path.
export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "All Cars", to: "/all-cars" },
      { label: "Location", to: "/location" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Help Center", to: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];
