export const organizationSchema = {
  "@type": "Organization",
  "@id": "https://satora.io/#organization",
  name: "Satora",
  legalName: "Lendasat Inc.",
  url: "https://satora.io",
  logo: "https://satora.io/assets/logo/satora-mark.svg",
  sameAs: [
    "https://x.com/satora_io",
    "https://t.me/satora_io",
    "https://github.com/satorahq",
    "https://linkedin.com/company/satoraio",
    "https://primal.net/p/nprofile1qqs94l0vtwjq6nqyw7gp09gwjyrr9202nt4jl5aly4ah2hmv9433hcgtncrpz",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    {
      "@type": "WebSite",
      "@id": "https://satora.io/#website",
      name: "Satora",
      url: "https://satora.io",
      publisher: { "@id": organizationSchema["@id"] },
    },
  ],
};
