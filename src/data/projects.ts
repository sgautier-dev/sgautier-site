import { homeCopy } from "./home-copy";

export type Project = {
  slug: string;
  name: string;
  kind: "client" | "personal-pilot";
  deliveryStatus: "live" | "upcoming" | "pilot" | "unverified";
  statusLabel: string;
  featured: boolean;
  title: string;
  description: string;
  tags: readonly string[];
  caseStudyHref?: string;
  externalUrl?: string;
  publicationApproved: boolean;
  assetReady: boolean;
};
export const featuredProjects: readonly Project[] = [
  {
    slug: "compta-pro",
    name: "Compta Pro",
    kind: "personal-pilot",
    deliveryStatus: "pilot",
    statusLabel: "Projet personnel · Cas pilote",
    featured: true,
    title: "Simplifier la gestion financière sans perdre le contrôle.",
    description: homeCopy.projects[1],
    tags: [
      "Application métier",
      "Traitement local",
      "Contrôles",
      "Validation humaine",
    ],
    caseStudyHref: "/realisations/compta-pro",
    publicationApproved: false,
    assetReady: false,
  },
  {
    slug: "aqua-dance-flow",
    externalUrl: "https://www.aquadanceflow.com/",
    name: "Aqua Dance Flow",
    kind: "client",
    deliveryStatus: "unverified",
    statusLabel: "Développement web · Intégration API",
    featured: true,
    title: "Connecter la gestion des événements au site.",
    description: homeCopy.projects[2],
    tags: ["API", "Webhook", "Développement web"],
    caseStudyHref: "/realisations/aqua-dance-flow",
    publicationApproved: false,
    assetReady: false,
  },
  {
    slug: "holistis",
    externalUrl: "https://www.holistis.net/",
    name: "Holistis",
    kind: "client",
    deliveryStatus: "unverified",
    statusLabel: "CMS · Automatisation éditoriale",
    featured: true,
    title: "Automatiser la préparation, garder la validation humaine.",
    description: homeCopy.projects[3],
    tags: ["CMS", "Automatisation éditoriale", "Validation humaine"],
    caseStudyHref: "/realisations/holistis",
    publicationApproved: false,
    assetReady: false,
  },
];
export const secondaryProjects: readonly Project[] = [
  {
    slug: "vivir-un-buen-morir",
    name: "Vivir un Buen Morir",
    kind: "client",
    deliveryStatus: "upcoming",
    statusLabel: "Refonte en cours de mise en ligne",
    featured: false,
    title: "Vivir un Buen Morir",
    description:
      "Refonte du site de la fondation : organisation des contenus, présentation des formations, ressources et gestion éditoriale avec Sanity.",
    tags: ["Site institutionnel", "CMS"],
    publicationApproved: false,
    assetReady: false,
  },
  {
    slug: "ama-massage-yoga",
    name: "AMA Massage & Yoga",
    kind: "client",
    deliveryStatus: "live",
    statusLabel: "Site professionnel",
    featured: false,
    title: "AMA Massage & Yoga",
    description:
      "Site professionnel pour une activité de massage et yoga, avec une identité visuelle affirmée et un parcours pensé pour la lecture sur mobile et la prise de contact.",
    tags: ["Développement web", "Parcours mobile"],
    publicationApproved: false,
    assetReady: false,
  },
  {
    slug: "lfit",
    externalUrl: "https://www.lfit.pro/",
    name: "L.FIT",
    kind: "client",
    deliveryStatus: "unverified",
    statusLabel: "Réalisation livrée",
    featured: false,
    title: "L.FIT",
    description:
      "Plateforme associant contenus gérés via CMS, authentification, espace membre et intégration de paiement.",
    tags: ["CMS", "Espace membre", "Paiement"],
    publicationApproved: false,
    assetReady: false,
  },
  {
    slug: "julie-gautier",
    externalUrl: "https://www.juliegautier.me/",
    name: "Julie Gautier",
    kind: "client",
    deliveryStatus: "unverified",
    statusLabel: "Réalisation livrée",
    featured: false,
    title: "Julie Gautier",
    description:
      "Portfolio visuel et éditorial pour présenter un travail artistique et audiovisuel, avec une gestion de contenus via CMS.",
    tags: ["Portfolio", "CMS"],
    publicationApproved: false,
    assetReady: false,
  },
];
