const Footer = () => {
  return (
    <footer className="relative py-16 gradient-pink-dark overflow-hidden">
      {/* Decorative patterns could go here if needed */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 text-primary-foreground mb-12">
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4 tracking-tight flex items-center gap-3" style={{ fontFamily: "serif" }}>
              <img
                src="/footer-logo.png"
                alt="EidCard Logo"
                className="w-20 h-20 object-contain scale-110"
                style={{ mixBlendMode: 'screen' }}
              />
              <span className="bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                EidCard
              </span>
            </h3>
            <p className="text-primary-foreground/90 text-xl leading-relaxed max-w-xs" style={{ fontFamily: "'Cookie', cursive" }}>
              Wrap your Eid wishes in love. More than a message — it's a memory.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-white/90">Quick Links</h4>
            <ul className="space-y-4 text-primary-foreground/80 font-medium">
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Home</a></li>
              <li><a href="#how-it-works" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">How It Works</a></li>
              <li><a href="#demo" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Sample Eid Cards</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center flex flex-col items-center gap-2">
          <p className="text-white/60 text-sm font-medium tracking-wide">
            © 2026 EidCard • Made with 💖 for a Blessed Eid
          </p>
          <div className="flex items-center justify-center gap-1.5 text-white/50 text-xs mt-2">
            <span>Powered by</span>
            <a href="https://www.patihash.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
              <img src="/icons/patihash.png" alt="PatiHash Logo" className="w-10 h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              <span className="font-semibold tracking-wider">PatiHash</span>
            </a>
            <span className="ml-1">• All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;