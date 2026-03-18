import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: <i className="fi fi-sr-edit"></i>,
    title: "Write Your Message",
    description: "Add your heartfelt Eid wish with a personal touch.",
  },
  {
    icon: <i className="fi fi-sr-heart"></i>,
    title: "Choose Your Type",
    description: "Select Couple, Friends, Boy, or Girl for a themed design.",
  },
  {
     icon: <i className="fi fi-sr-link"></i>,
    title: "Share the Link",
    description: "Send it instantly and surprise them with love.",
  },
];

const animationClasses = [
  "translate-x-[-80px] opacity-0", // step 1: from left
  "translate-y-[80px] opacity-0",  // step 2: from bottom (down)
  "translate-x-[80px] opacity-0",  // step 3: from right
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-10 md:py-40 relative min-h-[auto] md:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-2 md:mb-4">
          How It <span className="text-white  ">Works</span>
        </h2>
        <p className="text-muted-foreground text-center mb-6 md:mb-16 text-xs md:text-lg">
          Three simple steps to spread Eid joy
        </p>

        <div className="grid grid-cols-3 gap-2 md:gap-8 max-w-4xl mx-auto relative">
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/30 via-lavender/50 to-primary/30" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl md:rounded-2xl p-2 md:p-8 text-center hover:scale-105 transition-all duration-700 
                         hover:shadow-xl relative group
                         ${visible ? "translate-x-0 translate-y-0 opacity-100" : animationClasses[i]}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-soft-yellow/60 
                              rounded-sm rotate-[-2deg] shadow-sm" />
              <div className="text-xl md:text-5xl mb-1 md:mb-4 mt-0 md:mt-2 flex items-center justify-center text-[#ed4ab1]">{step.icon}</div>
              <div className="text-[10px] md:text-sm font-semibold text-primary mb-1 md:mb-2">Step {i + 1}</div>
              <h3 className="text-xs md:text-xl font-bold mb-1 md:mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-[10px] md:text-sm hidden md:block">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


