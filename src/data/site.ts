export const site = {
  name: "Sébastien Gautier",
  email: "contact@sgautier.dev",
  descriptor: "Développement web · Intégrations · Automatisation",
  geography:
    "À distance partout en France · Présence régulière en Nouvelle-Aquitaine et à La Réunion.",
  profiles: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sebastien-gautier-55b38382",
    },
    { name: "GitHub", href: "https://github.com/sgautier-dev" },
    { name: "Malt", href: "https://www.malt.fr/profile/sgautier" },
  ],
} as const;
export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;
