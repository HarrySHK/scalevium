/** Primary site-wide call to action (hero, nav, footer CTAs). */
export const PRIMARY_CTA_LABEL = "Book a free AI consultation";
export const PRIMARY_CTA_HREF = "/contact";

/** Public contact email shown across the site (footer, contact page, schema, error copy). */
export const CONTACT_EMAIL = "hello@scalevium.com";

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

export const OFFICE_ADDRESS = {
  street: "3118 FM 528 Rd",
  unit: "Unit #2076",
  city: "Webster",
  region: "TX",
  postalCode: "77598",
  country: "US",
};

export const OFFICE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${OFFICE_ADDRESS.street}, ${OFFICE_ADDRESS.unit}, ${OFFICE_ADDRESS.city}, ${OFFICE_ADDRESS.region} ${OFFICE_ADDRESS.postalCode}`
)}`;

export const LINKEDIN_URL = "https://www.linkedin.com/company/scalevium";
