// Lightweight inline SVG icons used across the landing page.
export const Search = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
    <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Arrow = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
    <line x1="4" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <polyline points="13 6 19 12 13 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const User = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
    <circle cx="12" cy="8" r="4" fill="currentColor" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor" />
  </svg>
);

export const Star = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...p}>
    <path d="M12 2l3 6.5 7 .8-5.2 4.7L18.2 22 12 18.3 5.8 22l1.4-7.9L2 9.3l7-.8z" fill="currentColor" />
  </svg>
);

export const Speed = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
    <path d="M3 14a9 9 0 0 1 18 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <line x1="12" y1="14" x2="16" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="14" r="1.6" fill="currentColor" />
  </svg>
);

export const Gear = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M18.5 5.5l-2.8 2.8M8.3 15.7l-2.8 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Seat = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
    <path d="M6 4v8h8M6 12l-1 8M14 12l4 0 1 8M14 12v-2a2 2 0 0 0-2-2H8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Door = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
    <rect x="6" y="3" width="12" height="18" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="14.5" cy="12" r="1.1" fill="currentColor" />
  </svg>
);

export const Tag = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
    <path d="M3 12l9-9h8v8l-9 9z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="16" cy="8" r="1.4" fill="currentColor" />
  </svg>
);

export const Pin = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...p}>
    <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" fill="currentColor" />
    <circle cx="12" cy="10" r="2.6" fill="#fff" />
  </svg>
);

export const Car = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
    <path d="M3 13l1.8-4.6A2 2 0 0 1 6.7 7h10.6a2 2 0 0 1 1.9 1.4L21 13v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <line x1="3" y1="13" x2="21" y2="13" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="7.5" cy="16" r="1.1" fill="currentColor" />
    <circle cx="16.5" cy="16" r="1.1" fill="currentColor" />
  </svg>
);

export const Bolt = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
    <path d="M13 2L4 14h6l-1 8 9-12h-6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const Shield = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
    <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <polyline points="8.5 12 11 14.5 15.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const iconMap = { Speed, Gear, Seat, Door };
