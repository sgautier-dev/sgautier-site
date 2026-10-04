import { homeCopy } from "./home-copy";
export const testimonials = [
  {
    name: "Boris Benet",
    role: "Coach Holistis",
    quote: homeCopy.testimonials[0],
  },
  {
    name: "Amine Ayadi",
    role: "manager Ayteams",
    quote: homeCopy.testimonials[1],
  },
  {
    name: "Pierre Dillac",
    role: "DAF groupe SIROB",
    quote: homeCopy.testimonials[2],
  },
] as const;
