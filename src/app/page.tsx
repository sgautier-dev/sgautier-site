import {
  Hero,
  ProblemsSection,
  ServicesBento,
} from "@/components/home/Foundation";
import {
  FeaturedProjects,
  MethodSection,
  DiagnosticSection,
  TestimonialsSection,
  AboutPreview,
  ContactSection,
} from "@/components/home/Sections";
import { getMetadata } from "@/lib/seo";
export const metadata = getMetadata("/");
export default function Home() {
  return (
    <>
      <Hero />
      <ProblemsSection />
      <ServicesBento />
      <FeaturedProjects />
      <MethodSection />
      <DiagnosticSection />
      <TestimonialsSection />
      <AboutPreview />
      <ContactSection />
    </>
  );
}
