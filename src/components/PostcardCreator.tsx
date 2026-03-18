import React, { useState, useRef, forwardRef } from "react";
import useConfetti from "@/hooks/useConfetti";
import { useToast } from "@/hooks/use-toast";
import bgCouple from "@/assets/bg-couple.jpg";
import bgBoy from "@/assets/bg-boy.jpg";
import bgGirl from "@/assets/bg-girl.jpg";
import bgFriends from "@/assets/bg-friends.jpg";
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
  patihash: "", // Handled dynamically
};

const fonts = [
  { id: "playfair", label: "Elegant", className: "font-display" },
  { id: "quicksand", label: "Modern", className: "font-body" },
  { id: "serif", label: "Classic", className: "font-serif" },
  { id: "cursive", label: "Fancy", className: "font-cursive" },
];

const categoryGroups = [
  {
    label: "Exclusive",
    items: [
      { key: "patihash" as Category, label: " PatiHash Edition" },
    ],
  },
  {
    label: "Legends",
    items: [
      { key: "godfather" as Category, label: "Godfather" },
      { key: "johnwick" as Category, label: "John Wick" },
      { key: "got" as Category, label: "GOT" },
    ],
  },
  {
    label: "Classic",
    items: [
      { key: "couple" as Category, label: " Couple" },
      { key: "boy" as Category, label: "Boy" },
      { key: "girl" as Category, label: " Girl" },
    ],
  },
  {
    label: "Superhero",
    items: [
      { key: "batman" as Category, label: " Batman" },
      { key: "superman" as Category, label: " Superman" },
      { key: "spiderman" as Category, label: " Spider-Man" },
      { key: "ironman" as Category, label: " Iron Man" },
      { key: "captain" as Category, label: " Captain" },
    ],
  },
  {
    label: "Princess",
    items: [
      { key: "jasmine" as Category, label: " Jasmine" },
      { key: "rapunzel" as Category, label: " Rapunzel" },
      { key: "elsa" as Category, label: " Elsa" },
      { key: "belle" as Category, label: " Belle" },
      { key: "tiana" as Category, label: " Tiana" },
    ],
  },
];

const suggestedMessages: Record<string, string[]> = {
  godfather: [
    "I'm gonna make you an offer you can't refuse... an Eid Mubarak filled with respect and love! 🌹🌙",
    "To my family and friends — may this Eid bring you the honor and joy of a true legend. Eid Mubarak! 🏮✨",
    "In the world of Eid, respect is everything. Wishing you a powerful and blessed celebration! 💫🥃",
  ],
  johnwick: [
    "Eid Mubarak! To the one who never stops until the job is done — may your Eid be as legendary as Baba Yaga! 🔫🌙",
    "People keep asking if I'm back. Yeah, I'm back... to wish you a killer Eid filled with peace! ✨👊",
    "Wishing you an Eid that hits with the precision and style of John Wick! Stay legendary! 💫💥",
  ],
  got: [
    "Eid Mubarak! Winter is over, but the blessings of the Seven Kingdoms are just beginning! ⚔️🌙",
    "To the true heir of Eid joy — may your kingdom be filled with prosperity and light! 🐲✨",
    "All men must celebrate! Wishing you an epic Eid worthy of the Iron Throne! 💫❄️",
  ],
  couple: [
    "Eid Mubarak to the love of my life! May this day bring us closer and fill our hearts with eternal joy. 🌙💕",
    "To my better half, wishing you an Eid filled with laughter, love, and countless blessings. I'm so lucky to have you. ✨❤️",
    "Counting my blessings this Eid, and you're at the top of the list. Mubarak to my beautiful partner! 🌸💖",
  ],
  boy: [
    "Eid Mubarak, brother! Wishing you a day full of fun, food, and great memories. Stay blessed! 🌙✨",
    "To my best buddy, hope this Eid brings you all the success and happiness you deserve. Let's celebrate! 🥂🕌",
    "Mubarak to the coolest guy I know! May your day be as awesome as you are. Enjoy the festivities! 🌟🎉",
  ],
  girl: [
    "Eid Mubarak to my dearest friend! May your day be as beautiful and bright as your smile. 🌸✨",
    "Wishing a wonderful Eid to an amazing soul. May Allah guide you and bless you with endless happiness. 💕🌙",
    "Happy Eid! May this special day bring peace to your heart and fulfillment to all your dreams. 💖🌟",
  ],
  batman: [
    "Eid Mubarak! Even the Dark Knight takes a break to celebrate. May your Eid be legendary! 🦇🌙",
    "From Gotham with love — wishing you an Eid filled with justice, joy, and plenty of biryani! 🌃✨",
    "Not the hero Eid deserves, but the one it needs. Have an epic Eid Mubarak! 🦇💫",
  ],
  superman: [
    "Eid Mubarak! May you have the strength of Superman and the blessings of a thousand moons! 🦸🌙",
    "Up, up, and away into an amazing Eid! Wishing you super happiness and super blessings! ✨💪",
    "Even Krypton celebrates Eid! Wishing you a day that's truly out of this world! 🌍🌙",
  ],
  spiderman: [
    "With great Eid comes great celebration! Eid Mubarak, web-slinger! 🕷️🌙",
    "Swinging by to wish you the most amazing Eid ever! May your day be as spectacular as Spider-Man! 🕸️✨",
    "Your friendly neighborhood greeting: Eid Mubarak! May joy stick to you like a web! 🕷️💫",
  ],
  ironman: [
    "Eid Mubarak! I am Iron Man, and I approve this celebration! 🤖🌙",
    "Arc reactor powered Eid wishes! May your day shine brighter than my suit! ✨🔴",
    "Genius, billionaire, philanthropist... and Eid celebrator! Have a Stark-level amazing Eid! 💛🌙",
  ],
  captain: [
    "Eid Mubarak! I can do this all day — especially celebrating Eid with you! 🛡️🌙",
    "Avengers assemble... for Eid! Wishing you a day worthy of a super soldier! ⭐✨",
    "Shield up for blessings! May this Eid bring you the courage and joy of Captain America! 🛡️💫",
  ],
  jasmine: [
    "Eid Mubarak! May your night be as magical as a moonlit ride over the palace domes! 🌙👸",
    "A whole new world of blessings awaits you this Eid! Wishing you joy as vast as the Arabian sky! ✨🏰",
    "Princess vibes only this Eid! May your heart shine brighter than every lantern tonight! 💫🌟",
  ],
  rapunzel: [
    "Eid Mubarak! May your dreams float high like golden lanterns in a starry sky! 🏮✨",
    "Let your light shine this Eid — you're the brightest star in every room! 💛🌙",
    "This Eid, may every wish you've dreamed of finally come true! 🌸💫",
  ],
  elsa: [
    "Eid Mubarak! Let it glow, let it glow — may your Eid sparkle like ice crystals under moonlight! ❄️🌙",
    "The cold never bothered you, but warm Eid wishes always feel magical! Wishing you a frozen-fabulous celebration! ✨💙",
    "May this Eid fill your heart with the magic of a thousand snowflakes! ❄️💫",
  ],
  anna: [
    "Eid Mubarak! Some celebrations are worth melting for — and this is one of them! 🌸🌙",
    "Wishing my favorite person an Eid filled with warm hugs, chocolate, and endless joy! 💕✨",
    "Do you want to build an Eid card? Because this one's made with love, just for you! 🎉💛",
  ],
  belle: [
    "Eid Mubarak! May your story this Eid be as beautiful as a tale as old as time! 🌹🌙",
    "Wishing you an enchanted Eid filled with golden light, roses, and endless wonder! ✨📖",
    "Beauty, grace, and blessings — may this Eid bring you all three! 💛🌟",
  ],
  moana: [
    "Eid Mubarak! May the ocean of blessings carry you to beautiful shores this Eid! 🌊🌙",
    "You're a voyager of the heart — may this Eid guide you to joy beyond the reef! ✨🌺",
    "The crescent moon is calling — it's time to celebrate Eid with adventure and love! 🌙💕",
  ],
  mulan: [
    "Eid Mubarak! May you shine as brightly as a warrior princess under the crescent moon! ⚔️🌙",
    "Be true to your heart this Eid — and may it lead you to blessings and joy! 🏮✨",
    "Strength, honor, and Eid blessings! Wishing you a celebration fit for a legend! 💫🎆",
  ],
  ariel: [
    "Eid Mubarak! May your world be full of wonder — above and below the waves! 🧜🌙",
    "Under the sea or under the stars, Eid is magical wherever you are! ✨🌊",
    "Wishing you an ocean of blessings and a sky full of Eid stars tonight! 💜🌟",
  ],
  tiana: [
    "Eid Mubarak! Dreams do come true — especially on a night as magical as this! 🐸🌙",
    "Wishing you an Eid filled with golden fireflies, warm wishes, and delicious food! ✨💚",
    "Work hard, dream big, and celebrate even bigger this Eid! You deserve every blessing! 🌟💛",
  ],
  mirabel: [
    "Eid Mubarak! You don't need magic to make this Eid special — you ARE the magic! 🦋🌙",
    "Every butterfly, every flower, every blessing is for you this Eid! Have a colorful celebration! ✨🌸",
    "The miracle is you! Wishing you a vibrant, joyful, and unforgettable Eid! 💜💫",
  ],
  patihash: [
    "Eid Mubarak, brother! Wishing you a day full of fun, food, and great memories. Stay blessed! 🌙✨", // Boy
    "Eid Mubarak to my dearest friend! May your day be as beautiful and bright as your smile. 🌸✨", // Girl
    "Eid Mubarak to the love of my life! May this day bring us closer and fill our hearts with eternal joy. 🌙💕", // Couple
  ],
};

interface PostcardCreatorProps {
  initialCategory?: Category | string;
}

const PostcardCreator = forwardRef<HTMLDivElement, PostcardCreatorProps>(({ initialCategory }, ref) => {
  const [mode, setMode] = useState<"custom" | "preset">(() => {
    if (initialCategory === "patihash-custom") return "custom";
    if (initialCategory === "preset") return "preset";
    return "preset";
  });

  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<Category>(() => {
    if (initialCategory === "patihash-custom") return "patihash";
    if (initialCategory === "preset") return "couple";
    return (initialCategory as Category) || "couple";
  });
  const [selectedFont, setSelectedFont] = useState("playfair");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedSalami, setSelectedSalami] = useState<number | null>(null);
  const [showSalamiPopup, setShowSalamiPopup] = useState(false);
  const [showCardRain, setShowCardRain] = useState(false);
  const [customImage, setCustomImage] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>("");
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const CLOUDINARY_CLOUD = "dwpspb5qw";
  const CLOUDINARY_PRESET = "Jon Snow";

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Image too large!",
        description: "Please upload an image under 10MB.",
        variant: "destructive",
      });
      return;
    }

    // Show local preview immediately (100% quality)
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary in background
    setIsUploadingImage(true);
    setCloudinaryUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Cloudinary upload failed");

      const data = await res.json();
      setCloudinaryUrl(data.secure_url);
      toast({ title: "Image uploaded! ✅", description: "Your photo is ready to share with full quality." });
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast({
        title: "Upload failed",
        description: "Couldn't upload to cloud. Check your Cloudinary settings.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const { burst, ConfettiOverlay } = useConfetti();
  const { toast } = useToast();

  React.useEffect(() => {
    if (initialCategory === "patihash-custom") {
      setMode("custom");
      setCategory("patihash");
    } else if (initialCategory === "preset") {
      setMode("preset");
      setCategory("couple");
    } else if (initialCategory) {
      setMode("preset");
      setCategory(initialCategory as Category);
    }
  }, [initialCategory]);

  const fontClass = fonts.find((f) => f.id === selectedFont)?.className || "font-display";

  const generateLink = () => {
    if (!senderName.trim()) {
      toast({ title: "Who is sending this?", description: "Please enter your name.", variant: "destructive" });
      return;
    }
    if (!receiverName.trim()) {
      toast({ title: "Who is this for?", description: "Please enter the receiver's name.", variant: "destructive" });
      return;
    }
    if (!message.trim()) {
      toast({ title: "Message missing", description: "Please write a heartfelt Eid wish!", variant: "destructive" });
      return;
    }
    if (category === "patihash" && !cloudinaryUrl) {
      toast({
        title: isUploadingImage ? "Uploading image..." : "No image uploaded",
        description: isUploadingImage
          ? "Please wait for your image to finish uploading."
          : "Please upload an image for the PatiHash Edition.",
        variant: "destructive",
      });
      return;
    }

    setGeneratedLink("");
    setCopied(false);
    setIsGenerating(true);

    setTimeout(() => {
      const dataString = [
        senderName.trim(),
        receiverName.trim(),
        message.trim(),
        category,
        selectedFont,
        selectedSalami || 0,
        category === "patihash" ? cloudinaryUrl : ""
      ].join("~~");

      // Compress to very short string
      try {
        const encoded = LZString.compressToEncodedURIComponent(dataString);

        const link = `${window.location.origin}/eid-card/${encoded}`;
        setGeneratedLink(link);
        setIsGenerating(false);
        setShowCardRain(true);
        setTimeout(() => setShowCardRain(false), 3500);
        setShowSalamiPopup(true);
        burst();
      } catch (error) {
        console.error("Link generation failed:", error);
        toast({ title: "Generation failed", description: "Something went wrong. Please try again.", variant: "destructive" });
        setIsGenerating(false);
      }
    }, 1000);
  };

  const copyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(generatedLink);
      } else {
        // Fallback for non-secure contexts or older mobile browsers
        const textArea = document.createElement("textarea");
        textArea.value = generatedLink;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      toast({ title: "Link copied!", description: "Share it with your loved ones! 🌙" });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast({ title: "Copy failed", description: "Please copy the link manually.", variant: "destructive" });
    }
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`Eid Mubarak! 🌙 Here's a special Eid postcard for you: ${generatedLink}`)}`, "_blank");
  };

  const currentSuggestions = suggestedMessages[category] || suggestedMessages.couple;

  return (
    <section ref={ref} className="py-16 md:py-40 relative min-h-screen flex items-center justify-center" id="create">
      <ConfettiOverlay />

      {/* Card Rain */}
      {showCardRain && (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => {
            const emojis = ["🌙", "🌸", "✨", "💕", "🎉", "🌟", "💌", "🕌"];
            const emoji = emojis[i % emojis.length];
            const left = Math.random() * 95;
            const delay = Math.random() * 1.5;
            const duration = 1.8 + Math.random() * 1.2;
            const rotate = -20 + Math.random() * 40;
            const scale = 0.6 + Math.random() * 0.7;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${left}%`,
                  top: "-120px",
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  animation: `cardFall ${duration}s ease-in ${delay}s forwards`,
                  transform: `rotate(${rotate}deg) scale(${scale})`,
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "80px",
                    background: "linear-gradient(135deg, #fce4ec, #f48fb1)",
                    borderRadius: "8px",
                    border: "2px solid #f06292",
                    boxShadow: "0 4px 12px rgba(240,98,146,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    gap: "4px",
                  }}
                >
                  <span>{emoji}</span>
                  <span style={{ fontSize: "7px", color: "#c2185b", fontWeight: 700, letterSpacing: 0.5 }}>EID MUBARAK</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="container mx-auto px-3 md:px-4">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-2 md:mb-4">
          Create Your <span className="text-gradient-pink">Eid Card</span>
        </h2>
        <p className="text-muted-foreground text-center mb-8 md:mb-16 text-sm md:text-lg">
          Customize every detail to make it special
        </p>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="space-y-6">
            {/* Category Selector - Grouped */}
            <div>
              <label className="block text-sm font-semibold mb-3">Card Theme</label>
              <div className="space-y-3">
                {categoryGroups.filter(g => mode === "custom" ? g.label === "Exclusive" : g.label !== "Exclusive").map((group) => (
                  <div key={group.label}>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1.5">{group.label}</p>
                    <div className="flex gap-2 flex-wrap">
                      {group.items.map((cat) => (
                        <button
                          key={cat.key}
                          onClick={() => setCategory(cat.key)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                            ${category === cat.key
                              ? "gradient-pink text-primary-foreground shadow-md"
                              : "bg-card border border-border hover:border-primary/30"
                            }`}
                        >
                          {cat.key === "patihash" && (
                            <img src="/icons/patihash.png" alt="PatiHash logo" className="w-4 h-4 rounded-full object-cover" />
                          )}
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {category === "patihash" && (
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3 animate-in fade-in zoom-in-95">
                <label className="block text-sm font-bold text-amber-900">Upload Custom Image</label>
                
                {isUploadingImage ? (
                  <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-amber-300 rounded-xl bg-amber-50 animate-pulse">
                    <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-2" />
                    <p className="text-amber-700 font-medium text-sm">Uploading high-quality image...</p>
                  </div>
                ) : cloudinaryUrl ? (
                  <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-xl bg-green-50 relative group">
                    <p className="text-2xl mb-1">✅</p>
                    <p className="text-green-700 font-medium text-sm">Image ready for sharing!</p>
                    <label className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                      <span className="text-white text-sm font-semibold">Click to change</span>
                      <input 
                        type="file" 
                        accept="image/jpeg, image/png, image/webp" 
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/jpeg, image/png, image/webp" 
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-amber-100 file:text-amber-700
                        hover:file:bg-amber-200 transition-all
                        cursor-pointer"
                    />
                    <p className="text-[10px] text-amber-700 italic mt-2">
                      Image will be uploaded to the cloud for full quality sharing.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Your Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:ring-2 
                           focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Receiver Name</label>
              <input
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                placeholder="Who's this for?"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:ring-2 
                           focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Your Message <span className="text-muted-foreground font-normal">({message.length}/300)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => e.target.value.length <= 300 && setMessage(e.target.value)}
                placeholder="Write your heartfelt Eid wish..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:ring-2 
                           focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none mb-3"
              />

              {/* Message Suggestions */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground ml-1">Suggested Messages</p>
                <div className="flex flex-col gap-2">
                  {currentSuggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => setMessage(sug)}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/30 transition-all text-left whitespace-normal break-words"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Font Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3">Font Style</label>
              <div className="flex gap-2 flex-wrap">
                {fonts.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setSelectedFont(font.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${font.className}
                      ${selectedFont === font.id
                        ? "gradient-pink text-primary-foreground"
                        : "bg-card border border-border hover:border-primary/30"
                      }`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Digital Salami Selection */}
            <div className="p-5 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-pink-700 flex items-center gap-2">
                  <span>🧧</span> Digital Salami
                </label>
                {selectedSalami && (
                  <span className="text-[10px] font-bold bg-pink-200 text-pink-700 px-2 py-0.5 rounded-full animate-in zoom-in">
                    ATTACHED
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[5, 10, 20, 50, 100, 200, 500, 1000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedSalami(selectedSalami === amount ? null : amount)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all
                      ${selectedSalami === amount
                        ? "bg-white border-pink-500 shadow-md scale-105"
                        : "bg-white/50 border-transparent hover:border-pink-200"
                      }`}
                  >
                    <span className="text-xs font-bold text-pink-600">৳{amount}</span>
                  </button>
                ))}
              </div>

              <p className="text-[10px] text-pink-400 italic">
                Recipient can "reveal" their surprise after viewing the card! ✨
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateLink}
              disabled={isGenerating}
              className="w-full gradient-pink text-primary-foreground py-4 rounded-xl text-lg font-semibold
                         hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 
                         disabled:hover:scale-100 shadow-xl animate-pulse-glow"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">📄</span> Crafting your postcard...
                </span>
              ) : (
                "✨ Generate EidCard"
              )}
            </button>

            {/* Generated Link */}
            {generatedLink && (
              <div className="glass-card rounded-xl p-6 space-y-4 animate-card-slide-up">
                <p className="text-center font-semibold text-lg">
                  Your Eid love is ready to be delivered 💌
                </p>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={generatedLink}
                    className="flex-1 px-3 py-2 rounded-lg bg-muted text-sm truncate border border-border"
                  />
                  <button
                    onClick={copyLink}
                    className="px-4 py-2 gradient-pink text-primary-foreground rounded-lg text-sm font-medium
                               hover:scale-105 transition-transform"
                  >
                    {copied ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
                <div className="flex gap-3 justify-center">
                  <button onClick={shareWhatsApp}
                    className="px-4 py-2 bg-[hsl(142,70%,45%)] text-primary-foreground rounded-lg text-sm 
                               hover:scale-105 transition-transform">
                    WhatsApp
                  </button>
                  <button
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink)}`, "_blank")}
                    className="px-4 py-2 bg-[hsl(220,60%,50%)] text-primary-foreground rounded-lg text-sm 
                               hover:scale-105 transition-transform">
                    Facebook
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Preview */}
          <div className="relative">
            <div className="sticky top-8 pt-10">
              <div
                className="relative rounded-3xl shadow-2xl"
                style={{
                  padding: '8px',
                  background: 'linear-gradient(180deg, #fcfcfcff, #ec9fdfff, #f588c2ff)',
                  borderRadius: '20px',
                }}
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none"
                  style={{
                    top: '-40px',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f6eef2ff, #fbb3efff, #c94fb1ff)',
                    border: '3px solid white',
                  }}
                >
                  <img
                    src="/icons/eidpatihash.png"
                    alt="PatiHash"
                    className="w-14 h-14 object-contain drop-shadow-xl"
                  />
                </div>
                {category === "patihash" ? (
                  <div
                    className="relative w-full rounded-[14px] overflow-hidden border border-white/20 bg-slate-100/50"
                  >
                    <img src={previewImage || bgMap[category]} className="w-full h-auto block object-cover" alt="Card Background" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-8">
                      {receiverName && (
                        <p className={`text-primary-foreground/80 text-[11px] md:text-sm mb-1 ${fontClass}`}>
                          Dear {receiverName},
                        </p>
                      )}
                      <p className={`text-primary-foreground text-sm md:text-lg leading-snug md:leading-relaxed ${fontClass} max-h-full overflow-y-auto hide-scrollbar`}>
                        {message || "Your beautiful Eid message will appear here..."}
                      </p>
                      {senderName && (
                        <p className={`text-primary-foreground/70 text-[11px] md:text-sm mt-3 md:mt-4 ${fontClass}`}>
                          — With love, {senderName}
                        </p>
                      )}
                      <p className="text-primary-foreground/40 text-[9px] md:text-xs mt-2">EidCard 🌙</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative rounded-[14px] overflow-hidden aspect-[4/5] bg-cover bg-center border border-white/20"
                    style={{ backgroundImage: `url(${bgMap[category]})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="relative z-10 flex flex-col justify-end h-full p-5 md:p-8">
                      {receiverName && (
                        <p className={`text-primary-foreground/80 text-[11px] md:text-sm mb-1 ${fontClass}`}>
                          Dear {receiverName},
                        </p>
                      )}
                      <p className={`text-primary-foreground text-sm md:text-lg leading-snug md:leading-relaxed ${fontClass} max-h-full overflow-y-auto hide-scrollbar`}>
                        {message || "Your beautiful Eid message will appear here..."}
                      </p>
                      {senderName && (
                        <p className={`text-primary-foreground/70 text-[11px] md:text-sm mt-3 md:mt-4 ${fontClass}`}>
                          — With love, {senderName}
                        </p>
                      )}
                      <p className="text-primary-foreground/40 text-[9px] md:text-xs mt-2">EidCard 🌙</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-center text-muted-foreground text-sm mt-4">
                ✨ Live Preview — This is how your postcard will look
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Salami Popup Modal */}
      {showSalamiPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowSalamiPopup(false)}
          />
          <div className="relative glass-card rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-pink-200 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-4">
              <div className="text-5xl mb-2">🎁</div>
              <h3 className="text-2xl font-bold text-pink-600">Salami Time!</h3>
              <p className="text-muted-foreground font-medium">
                Don't forget to give us Salami. 💖
              </p>
              <div className="bg-pink-50 rounded-2xl p-4 space-y-2 text-sm">
                <p className="flex justify-between items-center">
                  <span className="font-bold text-pink-700">Nagad:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded border border-pink-100">01627813480</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="font-bold text-pink-700">Bkash:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded border border-pink-100">01627813480</span>
                </p>
              </div>
              <button
                onClick={() => setShowSalamiPopup(false)}
                className="w-full gradient-pink text-primary-foreground py-3 rounded-xl font-bold 
                           hover:scale-105 transition-transform shadow-lg mt-4"
              >
                Close & View Link ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

PostcardCreator.displayName = "PostcardCreator";

export default PostcardCreator;
