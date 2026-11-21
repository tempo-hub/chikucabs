export const CHIKU_ORGANIZATION_ID = "https://chikucabs.com/#organization";
export const CHIKU_LOCAL_BUSINESS_ID = "https://chikucabs.com/#localbusiness";

export const CHIKU_ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": CHIKU_ORGANIZATION_ID,
  name: "Chiku Cabs",
  url: "https://chikucabs.com/",
  logo: "https://chikucabs.com/chikucabnewlogo.webp",
  telephone: "+919818022327",
  email: "info@chikucabs.com",
  sameAs: [
    "https://www.facebook.com/chikucabs/",
    "https://www.instagram.com/chikucabs1/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+919818022327",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

export const CHIKU_LOCAL_BUSINESS_SCHEMA = {
  "@type": "LocalBusiness",
  "@id": CHIKU_LOCAL_BUSINESS_ID,
  name: "Chiku Cabs",
  url: "https://chikucabs.com/",
  image: "https://chikucabs.com/chikucabnewlogo.webp",
  telephone: "+919818022327",
  email: "info@chikucabs.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Noida Sector 2",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  parentOrganization: { "@id": CHIKU_ORGANIZATION_ID },
};
