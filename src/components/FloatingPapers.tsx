import { useIsMobile } from "@/hooks/use-mobile";

const shapes = [
  { type: "circle", color: "bg-primary/20", size: "w-8 h-8" },
  { type: "heart", color: "text-primary/30", size: "text-2xl" },
  { type: "star", color: "text-soft-yellow/60", size: "text-xl" },
  { type: "circle", color: "bg-lavender/30", size: "w-6 h-6" },
  { type: "circle", color: "bg-peach/30", size: "w-10 h-10" },
  { type: "heart", color: "text-pink-glow/20", size: "text-3xl" },
  { type: "star", color: "text-mint/40", size: "text-2xl" },
  { type: "circle", color: "bg-primary/10", size: "w-5 h-5" },
  { type: "circle", color: "bg-soft-yellow/40", size: "w-7 h-7" },
  { type: "heart", color: "text-lavender/30", size: "text-xl" },
  { type: "star", color: "text-peach/50", size: "text-lg" },
  { type: "circle", color: "bg-mint/20", size: "w-4 h-4" },
];

const FloatingPapers = () => {
  const isMobile = useIsMobile();

  // On mobile, show only 4 shapes to reduce animation load
  const visibleShapes = isMobile ? shapes.slice(0, 4) : shapes;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {visibleShapes.map((shape, i) => {
        const left = `${(i * 8.3) % 100}%`;
        const delay = `${i * 0.5}s`;
        const duration = `${6 + (i % 4) * 2}s`;
        const top = `${(i * 13) % 90}%`;

        return (
          <div
            key={i}
            className="absolute animate-float-paper"
            style={{
              left,
              top,
              animationDelay: delay,
              animationDuration: duration,
            }}
          >
            {shape.type === "circle" && (
              <div className={`${shape.size} ${shape.color} rounded-full`} />
            )}
            {shape.type === "heart" && (
              <span className={`${shape.size} ${shape.color}`}>♥</span>
            )}
            {shape.type === "star" && (
              <span className={`${shape.size} ${shape.color}`}>✦</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingPapers;
