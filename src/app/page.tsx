import {
  ContactFormSection,
  HeroSection,
  ProjectsSection,
  ServicesSection,
} from "@/components/sections";
import ProfessionalSection from "@/components/sections/ProfessionalSection";

export default function Home() {
  return (
    <>
      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <ProfessionalSection />
      </section>

      <section
        id="projects"
        className="mb-6"
      >
        <ProjectsSection />
      </section>

      <section id="services">
        <ServicesSection />
      </section>

      <section id="contact">
        <ContactFormSection />
      </section>
    </>
  );
}
