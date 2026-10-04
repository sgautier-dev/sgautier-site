export const pageMetadata = [
  {
    route: "/",
    title:
      "Développement web, intégrations & automatisation | Sébastien Gautier",
    description:
      "J’aide les indépendants, TPE et PME à concevoir des outils web, connecter leurs applications et automatiser les tâches répétitives.",
  },
  {
    route: "/services",
    title:
      "Développement web & automatisation pour indépendants et PME | Sébastien Gautier",
    description:
      "Développement web sur mesure, intégration d’outils et automatisation de processus pour indépendants, TPE et PME.",
  },
  {
    route: "/services/developpement-web",
    title: "Développement web sur mesure | Sébastien Gautier",
    description:
      "Applications métier, sites professionnels et interfaces web sur mesure adaptés au fonctionnement réel des indépendants, TPE et PME.",
  },
  {
    route: "/services/integration-outils-api",
    title: "Intégration d’outils & API | Sébastien Gautier",
    description:
      "Connectez vos applications, CMS, CRM, paiements et services métier grâce aux API, webhooks et synchronisations adaptées à votre fonctionnement.",
  },
  {
    route: "/services/automatisation-processus",
    title: "Automatisation des processus | Sébastien Gautier",
    description:
      "Automatisez les tâches répétitives de votre activité tout en gardant les contrôles et validations humaines nécessaires.",
  },
  {
    route: "/realisations",
    title: "Réalisations web & automatisation | Sébastien Gautier",
    description:
      "Applications métier, intégrations API, automatisations et sites professionnels conçus pour des besoins réels.",
  },
  {
    route: "/realisations/compta-pro",
    title: "Compta Pro : outil de gestion local | Sébastien Gautier",
    description:
      "Un cas pilote de gestion financière locale : import de données, contrôles, rapprochement et décisions sous validation humaine.",
  },
  {
    route: "/realisations/aqua-dance-flow",
    title: "Aqua Dance Flow : intégration Eventbrite | Sébastien Gautier",
    description:
      "Relier les données Eventbrite à un site web avec une intégration API et une revalidation déclenchée par webhook.",
  },
  {
    route: "/realisations/holistis",
    title: "Holistis : préparation de newsletters | Sébastien Gautier",
    description:
      "Préparer un brouillon Mailchimp à partir d’un contenu Sanity, tout en conservant la relecture et la décision d’envoi.",
  },
  {
    route: "/a-propos",
    title: "À propos — Sébastien Gautier",
    description:
      "Ingénieur en informatique, développeur web et entrepreneur, j’accompagne indépendants, TPE et PME sur leurs outils, intégrations et automatisations.",
  },
  {
    route: "/contact",
    title: "Contact — Sébastien Gautier",
    description:
      "Parlez-moi de l’outil, de l’intégration ou du processus que vous souhaitez simplifier.",
  },
  {
    route: "/mentions-legales",
    title: "Mentions légales — Sébastien Gautier",
    description:
      "Informations relatives à l’éditeur, à l’hébergement et à l’utilisation du site professionnel de Sébastien Gautier.",
  },
  {
    route: "/confidentialite",
    title: "Confidentialité — Sébastien Gautier",
    description:
      "Informations sur le traitement des demandes de contact, les contrôles de prévention des abus et les droits relatifs aux données personnelles.",
  },
] as const;
export type PageRoute = (typeof pageMetadata)[number]["route"];
