import Hero from "@/components/Hero";
import StickyHeader from "@/components/StickyHeader";
import StudioIntro from "@/components/StudioIntro";
import Services from "@/components/Services";
import SelectedSpaces from "@/components/SelectedSpaces";
import ClientStory from "@/components/ClientStory";
import FooterSection from "@/components/FooterSection";

export default function HomePage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden">
      {/* Global intelligent sticky navigation (appears on upward scroll beyond hero) */}
      <StickyHeader />

      {/* Page wrapper — refined architectural frame around hero */}
      <div className="w-full max-w-full p-[8px_10px_0] sm:p-[12px_14px_0] lg:p-[16px_20px_0] box-border">
        <Hero />
      </div>

      {/* Studio introduction — editorial two-column section */}
      <StudioIntro />

      {/* Services — three-card offering section */}
      <Services />

      {/* Selected Spaces — dark forest project showcase */}
      <SelectedSpaces />

      {/* Client Story — testimonial with large image */}
      <ClientStory />

      {/* Consultation CTA + Footer */}
      <FooterSection />
    </main>
  );
}
