/**
 * Single source of truth for site copy + brand details.
 * Edit here — every section reads from this file.
 */

export const site = {
  name: "Small Town Sips",
  tagline: "Loaded Teas & Nutrition",
  town: "Truro, Iowa",
  domain: "smalltownsipsnutrition.com",

  nav: [
    { label: "Menu", href: "#menu" },
    { label: "Build a 12-Pack", href: "#builder" },
    { label: "Our Story", href: "#about" },
    { label: "Find Us", href: "#contact" },
  ],

  hero: {
    eyebrow: "Truro, Iowa · Now Open",
    headline: "Good energy, made in a small town.",
    sub: "Loaded teas packed with real nutrition and real flavor — the kind of pick-me-up that keeps you going without the sugar crash. Made by neighbors, for neighbors.",
    primaryCta: { label: "See the Flavors", href: "#menu" },
    secondaryCta: { label: "Build a 12-Pack", href: "#builder" },
  },

  valueProps: [
    { icon: "leaf", label: "Real ingredients", note: "No sugar bombs" },
    { icon: "bolt", label: "Good energy", note: "No crash" },
    { icon: "cup", label: "17+ flavors", note: "Always something new" },
    { icon: "home", label: "Small-town made", note: "Right here in Truro" },
  ],

  contact: {
    ownerName: "",
    phone: "",
    email: "hello@smalltownsipsnutrition.com",
    fulfillment: ["Local pickup in Truro", "Pop-up events", "Ship a 12-pack anywhere"],
    payment: ["Venmo", "Square", "Cash"],
  },

  legal:
    "These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.",
} as const;

export type Site = typeof site;
