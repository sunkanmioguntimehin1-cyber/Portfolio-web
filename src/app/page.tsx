import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Stats from "@/components/sections/Stats";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import TechStack from "@/components/sections/TechStack";
import FeaturedInsights from "@/components/sections/FeaturedInsights";
import Partnerships from "@/components/sections/Partnerships";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        <Services />
        <TechStack />
        <Industries />
        <Stats />
        <Portfolio />
        <FeaturedInsights />
        <Testimonials />
        <Team />
        <Partnerships />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}