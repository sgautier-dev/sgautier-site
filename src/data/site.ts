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
] as const;

export const serviceNavigation = [
  { label: "Tous les services", href: "/services" },
  {
    label: "Développement web sur mesure",
    href: "/services/developpement-web",
  },
  {
    label: "Intégration d’outils & API",
    href: "/services/integration-outils-api",
  },
  {
    label: "Automatisation des processus",
    href: "/services/automatisation-processus",
  },
] as const;
