import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import bgCouple from "@/assets/bg-couple.jpg";
import bgBoy from "@/assets/bg-boy.jpg";
import bgGirl from "@/assets/bg-girl.jpg";
import bgBatman from "@/assets/bg-batman.jpg";
import bgSuperman from "@/assets/bg-superman.jpg";
import bgSpiderman from "@/assets/bg-spiderman.jpg";
import bgIronman from "@/assets/bg-ironman.jpg";
import bgCaptain from "@/assets/bg-captain.jpg";
import bgJasmine from "@/assets/bg-jasmine.jpg";
import bgRapunzel from "@/assets/bg-rapunzel.jpg";
import bgElsa from "@/assets/bg-elsa.jpg";
import bgAnna from "@/assets/bg-anna.jpg";
import bgBelle from "@/assets/bg-belle.jpg";
import bgMoana from "@/assets/bg-moana.jpg";
import bgMulan from "@/assets/bg-mulan.jpg";
import bgAriel from "@/assets/bg-ariel.jpg";
import bgTiana from "@/assets/bg-tiana.jpg";
import bgMirabel from "@/assets/bg-mirabel.jpg";
import bgGodfather from "@/assets/bg-godfather.png";
import bgJohnwick from "@/assets/bg-johnwick.png";
import bgGot from "@/assets/bg-got.png";
import FloatingPapers from "@/components/FloatingPapers";
import LZString from "lz-string";

type Category = "couple" | "boy" | "girl" | "batman" | "superman" | "spiderman" | "ironman" | "captain" | "jasmine" | "rapunzel" | "elsa" | "anna" | "belle" | "moana" | "mulan" | "ariel" | "tiana" | "mirabel" | "godfather" | "johnwick" | "got" | "patihash";

const bgMap: Record<Category, string> = {
  couple: bgCouple,
  boy: bgBoy,
  girl: bgGirl,
  batman: bgBatman,
  superman: bgSuperman,
  spiderman: bgSpiderman,
  ironman: bgIronman,
  captain: bgCaptain,
  jasmine: bgJasmine,
  rapunzel: bgRapunzel,
  elsa: bgElsa,
  anna: bgAnna,
  belle: bgBelle,
  moana: bgMoana,
  mulan: bgMulan,
  ariel: bgAriel,
  tiana: bgTiana,
  mirabel: bgMirabel,
  godfather: bgGodfather,
  johnwick: bgJohnwick,
  got: bgGot,
  patihash: "", // Handled dynamically via URL
};

const fontMap: Record<string, string> = {
  playfair: "font-display",
  quicksand: "font-body",
  serif: "font-serif",
  cursive: "font-cursive",
};

const PostcardView = () => {
  const { data } = useParams<{ data: string }>();
  const [revealed, setRevealed] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [salamiRevealed, setSalamiRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      scale: 4,
      backgroundColor: null,
      logging: false
    });
    const link = document.createElement("a");
    link.download = `eid-postcard-${postcard.r || "friend"}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  };

  let postcard = { s: "", r: "", m: "", c: "couple" as Category, f: "playfair", salami: 0, customImage: "", storageKey: "", fallbackImage: "" };

  try {
    if (data) {
      // First attempt to decompress using LZString
      let decodedData = LZString.decompressFromEncodedURIComponent(data);

      // Fallback for older links (Base64 encoded)
      if (!decodedData) {
        // Fix potential missing base64 padding and URL-safe characters
        let base64 = data
          .replace(/-/g, '+')
          .replace(/_/g, '/');
        
        const pad = base64.length % 4;
        if (pad) {
          base64 += '='.repeat(4 - pad);
        }

        decodedData = decodeURIComponent(
          Array.prototype.map.call(atob(base64), (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join('')
        );
      }

      const parts = decodedData.split("~~");
      const cloudinaryImageUrl = parts[6] || "";

      postcard = {
        s: parts[0] || "",
        r: parts[1] || "",
        m: parts[2] || "",
        c: (parts[3] as Category) || "couple",
        f: parts[4] || "playfair",
        salami: parseInt(parts[5]) || 0,
        customImage: cloudinaryImageUrl,
        storageKey: "",
        fallbackImage: "",
      };
    }
  } catch (err) {
    console.error("Failed to decode postcard data:", err);
  }

  const fontClass = fontMap[postcard.f] || "font-display";
  const bg = bgMap[postcard.c] || bgCouple;

  useEffect(() => {
    const timer1 = setTimeout(() => setEnvelopeOpen(true), 800);
    const timer2 = setTimeout(() => setRevealed(true), 2000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <FloatingPapers />

      {/* Envelope animation */}
      {!revealed && (
        <div className="relative z-20 flex flex-col items-center">
          <div className={`transition-all duration-1000 ${envelopeOpen ? "scale-110 opacity-0" : "scale-100"}`}>
            <div className="text-8xl mb-4">💌</div>
            <p className="text-muted-foreground animate-pulse text-center">Opening your Eid surprise...</p>
          </div>
        </div>
      )}

      {/* Card */}
      {revealed && (
        <div className="relative z-10 w-full max-w-2xl px-4 animate-card-slide-up">
          <div ref={cardRef} className="pt-12">
            <div
              className="relative rounded-3xl shadow-2xl"
              style={{
                padding: '10px',
                background: 'linear-gradient(180deg, #fcfcfcff, #ec9fdfff, #f588c2ff)',
                borderRadius: '22px',
              }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 z-30 flex items-center justify-center"
                style={{
                  top: '-48px',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f6eef2ff, #fbb3efff, #c94fb1ff)',
                  border: '4px solid white',
                }}
              >
                <img
                  src="/icons/eidpatihash.png"
                  alt="PatiHash"
                  className="w-16 h-16 object-contain drop-shadow-xl"
                />
              </div>

              {postcard.c === "patihash" ? (
                <div
                  className="relative w-full bg-slate-100/50"
                  style={{
                    borderRadius: '13px',
                    overflow: 'hidden',
                  }}
                >
                  <img src={postcard.customImage || bg} className="w-full h-auto block object-cover" alt="Card Background" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-soft-yellow animate-sparkle pointer-events-none"
                      style={{
                        top: `${15 + (i * 12)}%`,
                        left: `${10 + (i * 15)}%`,
                        animationDelay: `${i * 0.4}s`,
                        fontSize: `${10 + (i % 3) * 4}px`,
                      }}
                    >✦</div>
                  ))}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 pb-8 md:p-10 md:pb-12">
                    <div className="space-y-2 md:space-y-3">
                      <p className={`text-primary-foreground/90 text-sm md:text-base ${fontClass}`}>
                        Dear {postcard.r || "Friend"},
                      </p>
                      <p className={`text-primary-foreground text-lg md:text-2xl leading-relaxed ${fontClass}`}>
                        {postcard.m || "Eid Mubarak! 🌙"}
                      </p>
                      <p className={`text-primary-foreground/80 text-sm md:text-base mt-4 md:mt-6 ${fontClass}`}>
                        — With love, {postcard.s || "Someone special"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="relative bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${bg})`,
                    aspectRatio: '4 / 5',
                    borderRadius: '13px',
                    overflow: 'hidden',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-soft-yellow animate-sparkle"
                      style={{
                        top: `${15 + (i * 12)}%`,
                        left: `${10 + (i * 15)}%`,
                        animationDelay: `${i * 0.4}s`,
                        fontSize: `${10 + (i % 3) * 4}px`,
                      }}
                    >✦</div>
                  ))}
                  <div className="relative z-10 flex flex-col justify-end h-full p-6 pb-8 md:p-10 md:pb-12">
                    <div className="space-y-2 md:space-y-3">
                      <p className={`text-primary-foreground/90 text-sm md:text-base ${fontClass}`}>
                        Dear {postcard.r || "Friend"},
                      </p>
                      <p className={`text-primary-foreground text-lg md:text-2xl leading-relaxed ${fontClass}`}>
                        {postcard.m || "Eid Mubarak! 🌙"}
                      </p>
                      <p className={`text-primary-foreground/80 text-sm md:text-base mt-4 md:mt-6 ${fontClass}`}>
                        — With love, {postcard.s || "Someone special"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Salami Reveal Section */}
          {postcard.salami > 0 && !salamiRevealed && (
            <div className="mt-8 animate-bounce-gentle text-center">
              <button
                onClick={() => setSalamiRevealed(true)}
                className="group relative px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold rounded-2xl shadow-[0_8px_0_rgb(161,98,7)] active:shadow-none active:translate-y-1 transition-all flex items-center gap-3 mx-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="text-2xl">🎁</span>
                <span>REVEAL YOUR SALAMI!</span>
                <span className="text-2xl">৳</span>
              </button>
            </div>
          )}

          {/* Salami View Card */}
          {salamiRevealed && (
            <div className="mt-8 space-y-6 animate-in zoom-in-95 fade-in duration-500">
              <div className="glass-card rounded-3xl p-4 md:p-6 shadow-2xl bg-gradient-to-br from-green-50 to-white border-green-200 border-4 border-dashed relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500" />
                
                <div className="text-center space-y-4">
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3].map(i => (
                      <span key={i} className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>🎊</span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-ariel-black text-green-700 uppercase tracking-tighter">YOUR DIGITAL SALAMI IS HERE!</h3>
                  
                  <div className="relative group perspective-1000 py-4">
                    <div className="relative transform transition-transform duration-700 hover:rotate-2">
                       {/* Taka Note Placeholder */}
                      <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white mx-auto max-w-sm sm:max-w-md">
                        <img 
                          src={postcard.salami === 1000 ? '/salami/thousand.jpg' : `/salami/${postcard.salami}.jpg`} 
                          alt={`${postcard.salami} Taka Note`}
                          className="w-full h-auto cursor-help transition-transform hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://placehold.co/800x400/e8f5e9/2e7d32?text=${postcard.salami}+TAKA+NOTE`;
                          }}
                        />


                      </div>
                      
                      {/* Interactive Seals */}
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-400 rounded-full border-4 border-pink shadow-lg flex items-center justify-center rotate-12">
                        <span className="text-xs font-black text-yellow-950">
                          <img src="/icons/patihash.png" alt="PatiHash" className="w-15 h-15 object-contain drop-shadow-xl" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 p-4 rounded-2xl border border-green-100">
                    <p className="text-sm font-medium text-green-800 italic">
                       "To receive your real salami, show this to {postcard.s || 'the sender'}! 🌙"
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={() => setSalamiRevealed(false)}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  ← Back to Card
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-6 space-y-3">
            <p className="text-muted-foreground text-sm">🌙 EidCard — Send Eid. Send Smiles.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 gradient-pink-dark text-primary-foreground px-6 py-3 rounded-full 
                           text-sm font-semibold hover:scale-105 transition-transform"
              >
                <Download size={16} />
                Download Eid Card
              </button>
              <a
                href="/"
                className="inline-block gradient-pink text-primary-foreground px-6 py-3 rounded-full 
                           text-sm font-semibold hover:scale-105 transition-transform"
              >
                Create Your Own 💌
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostcardView;
