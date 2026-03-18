import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const categories = [
  { src: "/avatar-boy.png", label: "Boy", category: "boy" },
  { src: "/avatar-couple.png", label: "Couple", category: "couple" },
  { src: "/avatar-girl.png", label: "Girl", category: "girl" },
];

const superheroCards = [
  { src: "/avatar-batman.png", label: "Batman", category: "batman", color: "from-gray-800 via-gray-600 to-gray-800" },
  { src: "/avatar-superman.png", label: "Superman", category: "superman", color: "from-blue-600 via-red-500 to-blue-600" },
  { src: "/avatar-spiderman.png", label: "Spider-Man", category: "spiderman", color: "from-red-600 via-blue-500 to-red-600" },
  { src: "/avatar-ironman.png", label: "Iron Man", category: "ironman", color: "from-red-700 via-yellow-500 to-red-700" },
  { src: "/avatar-captain.png", label: "Captain", category: "captain", color: "from-blue-700 via-red-500 to-blue-700" },
];

const disneyCards = [
  { src: "/avatar-jasmine.png", label: "Jasmine", category: "jasmine", color: "from-teal-500 via-amber-400 to-teal-500" },
  { src: "/avatar-rapunzel.png", label: "Rapunzel", category: "rapunzel", color: "from-purple-500 via-amber-300 to-purple-500" },
  { src: "/avatar-elsa.png", label: "Elsa", category: "elsa", color: "from-blue-300 via-cyan-200 to-blue-300" },
  { src: "/avatar-belle.png", label: "Belle", category: "belle", color: "from-yellow-500 via-amber-300 to-yellow-500" },
  { src: "/avatar-tiana.png", label: "Tiana", category: "tiana", color: "from-green-500 via-amber-400 to-green-500" },
];

const legendCards = [
  { src: "/avatar-godfather.png", label: "Godfather", category: "godfather", color: "from-gray-900 via-gray-700 to-gray-900" },
  { src: "/avatar-johnwick.png", label: "John Wick", category: "johnwick", color: "from-blue-900 via-purple-900 to-black" },
  { src: "/avatar-got.png", label: "GOT ", category: "got", color: "from-amber-700 via-orange-900 to-amber-900" },
];

const CharacterRow = ({
  title,
  cards,
  onCreateClick,
  isMobile
}: {
  title: string;
  cards: typeof superheroCards;
  onCreateClick: (cat: string) => void;
  isMobile: boolean;
}) => (
  <div className={isMobile ? "w-full" : "w-full mt-16"}>
    <p className={`text-center font-bold uppercase tracking-[0.2em] text-muted-foreground/60 ${isMobile ? "text-[10px] mb-4" : "text-sm tracking-widest mb-6"}`}>
      {title}
    </p>
    {isMobile ? (
      <div className="flex items-center justify-center gap-3 w-full flex-wrap">
        {cards.map((hero) => (
          <div
            key={hero.category}
            onClick={() => onCreateClick(hero.category)}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className={`p-0.5 rounded-full bg-gradient-to-br ${hero.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
              <div className="w-[68px] h-[68px] rounded-full overflow-hidden bg-white border-[0.5px] border-white/50 relative">
                 <img src={hero.src} alt={hero.label} loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="text-[10px] font-bold text-foreground/70 group-hover:text-primary transition-colors whitespace-nowrap">{hero.label}</span>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex items-end justify-center gap-6 px-4 flex-wrap">
        {cards.map((hero) => (
          <div
            key={hero.category}
            onClick={() => onCreateClick(hero.category)}
            className="cursor-pointer group flex-shrink-0 transform transition-all duration-500 hover:scale-[1.08] hover:-translate-y-4"
            style={{ width: "160px" }}
          >
            <PatiHashFrame className="transition-shadow duration-500 group-hover:shadow-pink-200/50">
               <div className="flex flex-col items-center gap-3 p-4 bg-gradient-to-b from-white/90 to-gray-50">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src={hero.src} alt={hero.label} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors">
                    {hero.label}
                  </span>
               </div>
            </PatiHashFrame>
          </div>
        ))}
      </div>
    )}
  </div>
);

const PatiHashFrame = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div
    className={`relative rounded-3xl shadow-2xl ${className}`}
    style={{
      padding: '4px',
      background: 'linear-gradient(180deg, #fcfcfcff, #ec9fdfff, #f588c2ff)',
      borderRadius: '20px',
    }}
  >
    <div
      className="absolute left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none"
      style={{
        top: '-20px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #f6eef2ff, #fbb3efff, #c94fb1ff)',
        border: '2px solid white',
      }}
    >
      <img
        src="/icons/eidpatihash.png"
        alt="PatiHash"
        className="w-8 h-8 object-contain drop-shadow-xl"
      />
    </div>
    <div className="relative rounded-[16px] overflow-hidden border border-white/20 bg-slate-100/50">
      {children}
    </div>
  </div>
);

const HeroSection = ({ onCreateClick }: { onCreateClick: (category: string) => void }) => {
  const isMobile = useIsMobile();
  const [showPresets, setShowPresets] = useState(false);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen pt-28 md:pt-28 pb-4 overflow-hidden grainy font-sans flex flex-col items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('/landing.jpeg')" }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-pink-50/20 to-rose-100/20 opacity-60 mix-blend-overlay" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center mt-8 md:mt-4">
        {/* Header Text */}
        <div className="animate-card-slide-up text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-[#3b2d2f] tracking-tight leading-tight" style={{ fontFamily: "serif" }}>
            Send Your Eid Love<br />in a Beautiful Way
          </h1>
          <p className="text-xl sm:text-2xl md:text-4xl text-[#ed7bc3] max-w-2xl mx-auto font-medium" style={{ fontFamily: "'Cookie', cursive" }}>
            Create a personalized digital eid card and share it instantly with someone special this Eid
          </p>
        </div>

        {/* ── Mobile: Avatar Row + CTA Button ── */}
        <div className="flex md:hidden flex-col items-center gap-6 mt-10 px-2 w-full">
        </div>

        {/* ── Desktop: Full Character Images ── */}
        <div className="hidden md:flex w-full flex-row items-end justify-center gap-8 mt-16 px-4">
          {/* Boy — Left */}
          <div className="group flex-shrink-0 w-[28%] max-w-[360px] -translate-y-2 transform transition-all duration-500 hover:scale-[1.04] hover:-translate-y-6">
            <PatiHashFrame>
              <img src="/boy.jpg" alt="Boy Character" loading="lazy" className="w-full h-auto block" />
            </PatiHashFrame>
          </div>

          {/* Couple — Center (featured) */}
          <div className="group flex-shrink-0 w-[36%] max-w-[420px] -translate-y-14 transform transition-all duration-500 hover:scale-[1.04] z-10 relative">
            <PatiHashFrame>
              <img src="/couple.jpg" alt="Couple Character" loading="lazy" className="w-full h-auto block" />
            </PatiHashFrame>
          </div>

          {/* Girl — Right */}
          <div className="group flex-shrink-0 w-[28%] max-w-[360px] -translate-y-2 transform transition-all duration-500 hover:scale-[1.04] hover:-translate-y-6">
            <PatiHashFrame>
              <img src="/girl.jpg" alt="Girl Character" loading="lazy" className="w-full h-auto block" />
            </PatiHashFrame>
          </div>
        </div>

        {/* ── Two Options: Custom Card and Preset ── */}
        <div className="w-full flex flex-row items-stretch justify-center gap-3 md:gap-12 mt-10 md:mt-16 pb-8 px-2 md:px-0">
          {/* Option 1: Custom Card (PatiHash) */}
          <div
            onClick={() => onCreateClick("patihash-custom")}
            className="cursor-pointer group flex-1 md:flex-shrink-0 w-1/2 md:w-[40%] max-w-[420px] transform transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-4 hover:scale-[1.02]"
          >
            <div className="relative h-full">
              {/* Gradient Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 rounded-2xl md:rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
              
              <div className="relative h-full p-[2px] md:p-[3px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#c94fb1ff] via-[#fbb3efff] to-[#f588c2ff] shadow-lg md:shadow-xl group-hover:shadow-[0_10px_20px_rgba(201,79,177,0.3)] md:group-hover:shadow-[0_20px_40px_rgba(201,79,177,0.4)] transition-all duration-500">
                <div className="bg-white/90 backdrop-blur-sm rounded-[20px] md:rounded-[22px] p-3 py-5 md:p-8 flex flex-col items-center justify-between text-center h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-50/80 pointer-events-none" />
                  <div className="flex flex-col items-center flex-1">
                    <img
                      src="/icons/eidpatihash.png"
                      alt="Custom Card"
                      className="w-12 h-12 md:w-28 md:h-28 object-contain drop-shadow-md md:drop-shadow-xl mb-2 md:mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110"
                    />
                    <h3 className="text-sm md:text-3xl font-bold text-[#b43b9c] mb-1 md:mb-3 relative z-10 leading-tight">
                      Custom Edition
                    </h3>
                    <p className="text-muted-foreground font-medium relative z-10 text-[10px] md:text-base hidden md:block">
                      Upload your own custom image and create a unique PatiHash edition Eid card.
                    </p>
                  </div>
                  <div className="mt-2 md:mt-8 relative z-10 w-full">
                    <span className="inline-block w-full md:w-auto bg-gradient-to-r from-pink-500 to-pink-400 text-white font-bold px-2 py-1.5 md:px-6 md:py-2.5 rounded-full shadow-md md:shadow-lg text-[10px] md:text-sm whitespace-nowrap">
                      PatiHash ✨
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: Preset */}
          <div
            onClick={() => {
              setShowPresets(true);
              setTimeout(() => {
                document.getElementById('preset-editions')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="cursor-pointer group flex-1 md:flex-shrink-0 w-1/2 md:w-[40%] max-w-[420px] transform transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-4 hover:scale-[1.02]"
          >
            <div className={`h-full p-[2px] md:p-[3px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-400 via-indigo-300 to-purple-400 shadow-lg md:shadow-xl transition-all duration-500 ${showPresets ? 'shadow-[0_10px_20px_rgba(99,102,241,0.2)] md:shadow-[0_20px_40px_rgba(99,102,241,0.3)] ring-2 md:ring-4 ring-indigo-300' : 'group-hover:shadow-[0_10px_20px_rgba(99,102,241,0.2)] md:group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]'}`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-[20px] md:rounded-[22px] p-3 py-5 md:p-8 flex flex-col items-center justify-between text-center h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/80 pointer-events-none" />
                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 md:w-28 md:h-28 rounded-full overflow-hidden border-2 md:border-4 border-indigo-200 shadow-md md:shadow-lg mb-2 md:mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110">
                     <img
                       src="/couple.jpg"
                       alt="Preset Card"
                       className="w-full h-full object-cover"
                     />
                  </div>
                  <h3 className="text-sm md:text-3xl font-bold text-indigo-600 mb-1 md:mb-3 relative z-10 leading-tight">
                    Preset Edition
                  </h3>
                  <p className="text-muted-foreground font-medium relative z-10 text-[10px] md:text-base hidden md:block">
                    Choose from our beautifully crafted character templates, legends, and superheroes!
                  </p>
                </div>
                <div className="mt-2 md:mt-8 relative z-10 w-full">
                  <span className="inline-block w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-2 py-1.5 md:px-6 md:py-2.5 rounded-full shadow-md md:shadow-lg text-[10px] md:text-sm whitespace-nowrap">
                    Presets 🎨
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Preset Categories Expandable Area ── */}
        {showPresets && (
          <div id="preset-editions" className="w-full animate-in slide-in-from-top-4 fade-in duration-500 pt-8 pb-16">
            <div className="flex flex-col items-center max-w-5xl mx-auto border-t border-pink-200 pt-12">
              <h2 className="text-3xl font-bold text-center text-[#953e87] mb-8 font-serif">Choose Your Preset</h2>
              <div className="w-full space-y-12">
                <CharacterRow title="💖 Classic Edition" cards={categories as any} onCreateClick={(cat) => onCreateClick(cat)} isMobile={isMobile} />
                <CharacterRow title="🎬 Legend Edition" cards={legendCards} onCreateClick={(cat) => onCreateClick(cat)} isMobile={isMobile} />
                <CharacterRow title="⚡ Superhero Edition" cards={superheroCards} onCreateClick={(cat) => onCreateClick(cat)} isMobile={isMobile} />
                <CharacterRow title="👸 Princess Edition" cards={disneyCards} onCreateClick={(cat) => onCreateClick(cat)} isMobile={isMobile} />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default HeroSection;
