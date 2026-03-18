const testimonials = [
  {
    text: "Sent this to my best friend and she loved it! So cute! 🌸",
    author: "Sana",
  },
  {
    text: "Way better than a normal Eid text message. Beautiful design!",
    author: "Omar",
  },
  {
    text: "Made my Eid surprise extra special. My wife was so happy 💕",
    author: "Fahad",
  },
];

const Testimonials = () => {
  return (
    <section className="py-32 md:py-40 relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          People <span className="text-gradient-pink">Love</span> It
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300"
            >
              {/* Speech bubble tail */}
              <div className="absolute -bottom-3 left-8 w-6 h-6 bg-card/70 rotate-45 border-r border-b border-border/50" />

              <p className="text-foreground mb-4 italic leading-relaxed">"{t.text}"</p>
              <p className="text-sm font-semibold text-primary">— {t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
