import { useState, useEffect } from "react";

const Navbar = ({ onCreateClick }: { onCreateClick: () => void }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[92%] md:w-[45%] rounded-full border border-pink-100/50 shadow-lg ${scrolled
                ? "py-2 bg-white/80 backdrop-blur-md"
                : "py-2.5 bg-white/40 backdrop-blur-sm"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-1.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <span className="text-lg animate-pulse-gentle">🌙</span>
                    <span className="text-base font-bold tracking-tight text-[#ed4ab1]" style={{ fontFamily: "serif" }}>
                        EidCard
                    </span>
                </div>

                {/* CTA Button */}
                <button
                    onClick={onCreateClick}
                    className="bg-gradient-to-r from-[#ed4ab1] to-[#fab9e2] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
                >
                    Create
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
