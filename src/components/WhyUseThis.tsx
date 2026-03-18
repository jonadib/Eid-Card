const reasons = [
  { emoji: "⚡", text: "Instant delivery" },
  { emoji: "💝", text: "Personalized message" },
  { emoji: "✨", text: "Beautiful animated design" },
  { emoji: "🆓", text: "Free & easy to use" },
  { emoji: "🔓", text: "No login required" },
];

const WhyUseThis = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Why Send a <span className="text-gradient-pink">Digital</span> Eid Card?
        </h2>
        <p className="text-muted-foreground mb-16 text-lg">
          Because your loved ones deserve more than a plain text
        </p>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="glass-card rounded-full px-6 py-3 flex items-center gap-2 
                         hover:scale-105 transition-transform duration-300"
            >
              <span className="text-xl">{r.emoji}</span>
              <span className="font-medium text-sm">{r.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUseThis;
