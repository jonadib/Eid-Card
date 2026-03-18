import bgCouple from "@/assets/bg-couple.jpg";
import bgBoy from "@/assets/bg-boy.jpg";
import bgGirl from "@/assets/bg-girl.jpg";
import { useEffect, useRef, useState, useCallback } from "react";

const demos = [
  {
    bg: bgCouple,
    label: "Couple",
    message: "Eid Mubarak, my love. Every moment with you is a blessing. 💕",
    sender: "Arham",
    receiver: "Hira",
  },
  {
    bg: bgBoy,
    label: "Boy Friend",
    message: "Bro, Eid Mubarak! May this day bring you tons of biryani and joy 🔥",
    sender: "Ahmed",
    receiver: "Zain",
  },
  {
    bg: bgGirl,
    label: "Girl Friend",
    message: "Happy Eid bestie! 🌸 You make every celebration brighter!",
    sender: "Ayesha",
    receiver: "Fatima",
  },
];

const DemoCard = ({ demo }: { demo: typeof demos[0] }) => (
  <div className="w-full max-w-[260px] mx-auto glass-card-light rounded-2xl p-2 shadow-xl">
    <div
      className="relative rounded-xl overflow-hidden aspect-video bg-cover bg-center"
      style={{ backgroundImage: `url(${demo.bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="relative z-10 flex flex-col justify-end h-full p-4">
        <p className="text-primary-foreground/80 text-xs mb-1 font-display">Dear {demo.receiver},</p>
        <p className="text-primary-foreground text-sm leading-relaxed font-display">{demo.message}</p>
        <p className="text-primary-foreground/60 text-xs mt-2 font-display">— {demo.sender}</p>
      </div>
    </div>
    <div className="text-center mt-3 mb-1">
      <span className="text-sm font-semibold text-muted-foreground">{demo.label}</span>
    </div>
  </div>
);

const DemoGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const rafId = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafId.current) return; // skip if already scheduled
    rafId.current = requestAnimationFrame(() => {
      if (!sectionRef.current) { rafId.current = 0; return; }
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const raw = (windowH - rect.top) / (windowH + rect.height);
      setScrollProgress(Math.max(0, Math.min(1, raw)));
      rafId.current = 0;
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    // Only add scroll listener on desktop (mobile doesn't use scroll animation)
    if (!isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll, isMobile]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaX.current < -50 && activeIndex < demos.length - 1) {
      setActiveIndex((p) => p + 1);
    } else if (touchDeltaX.current > 50 && activeIndex > 0) {
      setActiveIndex((p) => p - 1);
    }
    touchDeltaX.current = 0;
  };

  // Desktop scroll animation
  const coupleScale = 1 + scrollProgress * 0.15;
  const sideProgress = Math.min(1, Math.max(0, (scrollProgress - 0.2) / 0.3));
  const spreadX = sideProgress * 110;
  const sideOpacity = Math.min(1, sideProgress * 1.5);
  const sideScale = 0.9 + sideProgress * 0.1;

  const cardConfigs = [
    { demo: demos[1], x: -spreadX, z: 10, opacity: sideOpacity, scale: sideScale },
    { demo: demos[0], x: 0, z: 20, opacity: 1, scale: coupleScale },
    { demo: demos[2], x: spreadX, z: 10, opacity: sideOpacity, scale: sideScale },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-40 relative min-h-[auto] md:min-h-screen flex items-center justify-center overflow-hidden font-sans"
      id="demo"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-2 md:mb-4">
          Sample <span className="text-gradient-pink">Eid Cards</span>
        </h2>
        <p className="text-muted-foreground text-center mb-6 md:mb-16 text-xs md:text-lg">
          Here's what your Eid cards could look like
        </p>

        {isMobile ? (
          /* Mobile: Swipeable carousel */
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {demos.map((demo, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <DemoCard demo={demo} />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {demos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-primary scale-125" : "bg-muted-foreground/30"
                    }`}
                />
              ))}
            </div>
            <p className="text-center text-muted-foreground/50 text-xs mt-2">Swipe to see more</p>
          </div>
        ) : (
          /* Desktop: Scroll-driven spread */
          <div className="relative flex items-center justify-center min-h-[340px]">
            {cardConfigs.map(({ demo, x, z, opacity, scale }, i) => (
              <div
                key={i}
                className="absolute w-full max-w-[360px] group glass-card rounded-2xl p-3 hover:shadow-2xl cursor-pointer will-change-transform"
                style={{
                  transform: `translateX(${x}%) scale(${scale})`,
                  zIndex: z,
                  opacity,
                  transition: "box-shadow 0.3s, transform 0.5s ease-out",
                }}
              >
                <div
                  className="relative rounded-xl overflow-hidden aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(${demo.bg})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-end h-full p-5">
                    <p className="text-primary-foreground/80 text-xs mb-1 font-display">Dear {demo.receiver},</p>
                    <p className="text-primary-foreground text-sm leading-relaxed font-display">{demo.message}</p>
                    <p className="text-primary-foreground/60 text-xs mt-2 font-display">— {demo.sender}</p>
                  </div>
                </div>
                <div className="text-center mt-3 mb-1">
                  <span className="text-sm font-semibold text-muted-foreground">{demo.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DemoGallery;
