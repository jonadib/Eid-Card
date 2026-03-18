import { useState } from "react";

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  delay: string;
  duration: string;
  size: string;
}

const useConfetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [active, setActive] = useState(false);

  const burst = () => {
    const colors = [
      "bg-primary", "bg-lavender", "bg-peach", "bg-mint", 
      "bg-soft-yellow", "bg-pink-glow", "bg-pink-deep"
    ];
    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 0.5}s`,
      duration: `${1.5 + Math.random() * 2}s`,
      size: `${4 + Math.random() * 8}px`,
    }));
    setPieces(newPieces);
    setActive(true);
    setTimeout(() => setActive(false), 4000);
  };

  const ConfettiOverlay = () =>
    active ? (
      <div className="fixed inset-0 pointer-events-none z-50">
        {pieces.map((p) => (
          <div
            key={p.id}
            className={`absolute ${p.color} rounded-sm`}
            style={{
              left: p.left,
              top: "-10px",
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              animation: `confetti-fall ${p.duration} ${p.delay} ease-in forwards`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>
    ) : null;

  return { burst, ConfettiOverlay };
};

export default useConfetti;
