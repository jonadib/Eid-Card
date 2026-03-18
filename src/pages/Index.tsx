import { useRef, useState, useEffect } from "react";
import FloatingPapers from "@/components/FloatingPapers";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PostcardCreator from "@/components/PostcardCreator";
import DemoGallery from "@/components/DemoGallery";

import Footer from "@/components/Footer";
import dividerPattern from "@/assets/divider-pattern.png";

import Navbar from "@/components/Navbar";

const Index = () => {
  const creatorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id || "hero");
          }
        });
      },
      { threshold: [0.1, 0.3, 0.5] }
    );

    const refs = [heroRef, howItWorksRef, creatorRef, demoRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [selectedCategory]);

  const scrollToCreator = (category: string) => {
    setSelectedCategory(category);
    // Use longer timeout to ensure PostcardCreator renders before scrolling
    setTimeout(() => {
      creatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSectionClass = (id: string) => {
    return `section-transition ${activeSection === id ? "section-highlight" : ""}`;
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(160deg, #c2185b 0%, #e91e8c 15%, #f06292 35%, #f48fb1 55%, #fce4ec 75%, #fff0f5 100%)' }}>
      <Navbar onCreateClick={scrollToHero} />
      <FloatingPapers />

      {/* Single Decorative Curved Line - hidden on mobile for performance */}
      <svg className="hidden md:block fixed inset-0 w-full h-full pointer-events-none z-0 opacity-30" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path
          d="M 50,0 Q 80,250 50,500 T 50,1000"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="0.5"
        />
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ed4ab1" />
            <stop offset="50%" stopColor="#fab9e2" />
            <stop offset="100%" stopColor="#ed4ab1" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10">
        <div id="hero" ref={heroRef} className={getSectionClass("hero")}>
          <HeroSection onCreateClick={scrollToCreator} />
        </div>

        <div id="how-it-works" ref={howItWorksRef} className={getSectionClass("how-it-works")}>
          <HowItWorks />
        </div>

        {selectedCategory && (
          <div id="create" ref={creatorRef} className={getSectionClass("create")}>
            <PostcardCreator initialCategory={selectedCategory as any} />
          </div>
        )}

        <div id="demo" ref={demoRef} className={getSectionClass("demo")}>
          <DemoGallery />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
