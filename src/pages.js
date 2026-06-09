// Content for the footer-linked info pages, keyed by URL slug.
// Each entry shares one shape so a single renderer (InfoPage.js) covers all:
//   { title, intro, sections: [{ heading, body }] }
// `body` may be a string or an array of paragraph strings.
import { stories } from "./data";

export const pageContent = {
  reviews: {
    title: "What our renters say",
    intro:
      "Real words from people who've taken our cars for a spin. Join thousands of happy drivers on the road.",
    sections: [
      {
        heading: "Sofia M. — Weekend in the hills",
        body: "Booking took two minutes and the car was spotless. The Lamborghini Urus made our anniversary weekend unforgettable. Pickup was effortless.",
      },
      {
        heading: "James T. — Business trip",
        body: "Flexible hire saved my week. I extended the rental from the app with no fuss and the support team answered in minutes.",
      },
      {
        heading: "Aisha K. — First time renting premium",
        body: "I was nervous about renting a luxury car, but the team walked me through everything. Transparent pricing, no hidden fees, brilliant experience.",
      },
      {
        heading: "Marco D. — Electric for the city",
        body: "Quiet, quick and fully charged on delivery. Returning it was as simple as parking and locking. I'll be back next month.",
      },
    ],
  },

  blog: {
    title: "From the blog",
    intro:
      "Stories, guides and news from the world of premium car rental — straight from our team to your screen.",
    sections: stories.map((s) => ({
      heading: `${s.title} — ${s.day} ${s.month}`,
      body: s.excerpt,
    })),
  },

  about: {
    title: "About us",
    intro:
      "Premium Rental puts the world's most exciting cars within everyone's reach — for a weekend, a week, or as long as the road calls.",
    sections: [
      {
        heading: "Our story",
        body: "What began with a single hand-picked supercar has grown into a curated fleet spanning cars, SUVs, vans and electric vehicles. We believe driving something special shouldn't require owning it.",
      },
      {
        heading: "What we stand for",
        body: "Transparent pricing, immaculate vehicles, and a booking experience that takes minutes — not paperwork. Every car is inspected and detailed before it reaches you.",
      },
      {
        heading: "Where we're headed",
        body: "We're expanding to new cities and growing our electric line-up so more drivers can feel the road in the car of their dreams, responsibly.",
      },
    ],
  },

  careers: {
    title: "Careers",
    intro:
      "We're a small team obsessed with great cars and great service. If that sounds like you, we'd love to talk.",
    sections: [
      {
        heading: "Fleet Specialist",
        body: "Keep our vehicles in showroom condition and manage inspections, detailing and logistics across pickup locations.",
      },
      {
        heading: "Customer Experience Lead",
        body: "Be the friendly voice behind every booking — guiding renters from first click to safe return.",
      },
      {
        heading: "Frontend Engineer",
        body: "Build the booking experience our renters love. React, clean UI, and a love for detail required.",
      },
      {
        heading: "Don't see your role?",
        body: "Send us a note at careers@premiumrental.test — we're always glad to meet talented people.",
      },
    ],
  },

  contact: {
    title: "Get in touch",
    intro:
      "Questions about a booking or just want to say hello? Our team is here seven days a week.",
    sections: [
   
      { heading: "Email", body: "hello@premiumrental.test — we reply within a few hours." },
      { heading: "Head office", body: "120 Riverside Drive, Suite 400, Metro City." },
      {
        heading: "Opening hours",
        body: ["Monday to Friday: 7:00 — 23:00", "Saturday & Sunday: 8:00 — 22:00"],
      },
    ],
  },

  faq: {
    title: "Frequently asked questions",
    intro: "The quick answers to the things renters ask us most.",
    sections: [
      {
        heading: "How old do I need to be to rent?",
        body: "Drivers must be at least 21 years old and hold a valid licence held for one year or more. Premium and luxury classes may require drivers to be 25+.",
      },
      {
        heading: "What do I need to bring at pickup?",
        body: "A valid driver's licence, the card used to book, and a second form of ID. That's it — your reservation is already in our system.",
      },
      {
        heading: "Is insurance included?",
        body: "Every rental includes standard cover. You can add extra protection during checkout for complete peace of mind.",
      },
      {
        heading: "Can I extend my rental?",
        body: "Yes. Manage and extend active bookings right from your account, subject to vehicle availability.",
      },
      {
        heading: "What is your fuel and charging policy?",
        body: "Cars are delivered full (or fully charged) and should be returned the same way. A simple refuel fee applies otherwise.",
      },
    ],
  },

  help: {
    title: "Help center",
    intro: "Everything you need to manage a booking from start to finish.",
    sections: [
      {
        heading: "Making a booking",
        body: "Browse the fleet, pick your dates and location, and confirm in a few taps. You'll get an instant confirmation by email.",
      },
      {
        heading: "Managing your account",
        body: "Sign in from the account icon in the top bar to view your bookings, saved favourites and personal details.",
      },
      {
        heading: "Changes and cancellations",
        body: "Plans change — most reservations can be modified or cancelled free of charge up to 24 hours before pickup.",
      },
      {
        heading: "Still stuck?",
        body: "Reach our support team any day of the week via the Contact page and we'll sort it out quickly.",
      },
    ],
  },

  location: {
    title: "Find us",
    intro:
      "This is a demo project — the address below is illustrative. Visit us in Austin, call ahead, or book online any time.",
    sections: [
      { heading: "Pickup location", body: "1200 Congress Avenue, Suite 300, Austin, TX 78701" },
      {
        heading: "Opening hours",
        body: ["Monday to Friday: 7:00 — 23:00", "Saturday & Sunday: 8:00 — 22:00"],
      },
      {
        heading: "Getting here",
        body: "Five minutes from downtown Austin with on-site parking. The nearest stop is the Congress Ave transit line.",
      },
      {
        heading: "Questions?",
        body: "Reach our team any day of the week via the Contact page and we'll help you plan your pickup.",
      },
    ],
  },

  privacy: {
    title: "Privacy policy",
    intro:
      "This is a demo project. The policy below is illustrative only and does not describe a real service.",
    sections: [
      {
        heading: "What we collect",
        body: "In a live service we would collect the details needed to process a booking — your name, contact details, licence information and payment data.",
      },
      {
        heading: "How we'd use it",
        body: "Solely to fulfil your rental, keep your account secure, and improve the experience. We would never sell your personal data.",
      },
      {
        heading: "Your choices",
        body: "You would be able to access, correct or delete your data at any time by contacting our team.",
      },
    ],
  },

  terms: {
    title: "Terms & conditions",
    intro:
      "This is a demo project. The terms below are sample text and carry no legal weight.",
    sections: [
      {
        heading: "Using the service",
        body: "Rentals are subject to vehicle availability and the eligibility requirements set out in our FAQ, including minimum age and a valid driving licence.",
      },
      {
        heading: "Bookings and payments",
        body: "Prices shown are per day and confirmed at checkout. In a live service, charges would be processed securely at the time of booking.",
      },
      {
        heading: "Vehicle care",
        body: "Renters are responsible for returning the vehicle in the condition it was provided, fuel or charge included, by the agreed return time.",
      },
    ],
  },
};
