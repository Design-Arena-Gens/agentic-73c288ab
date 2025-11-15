"use client";

import { motion } from "framer-motion";
import type { TarotCardData, TarotOrientation } from "../lib/tarot";
import type { SpreadPosition } from "../lib/spreads";

interface TarotCardProps {
  card: TarotCardData;
  position: SpreadPosition;
  index: number;
  orientation: TarotOrientation;
}

const suitGradients: Record<string, { from: string; to: string; accent: string }> = {
  Major: { from: "rgba(214, 203, 238, 0.92)", to: "rgba(142, 118, 198, 0.82)", accent: "#d3c4ff" },
  Bâtons: { from: "rgba(255, 223, 192, 0.9)", to: "rgba(225, 166, 89, 0.78)", accent: "#f3aa59" },
  Coupes: { from: "rgba(192, 233, 255, 0.9)", to: "rgba(84, 173, 214, 0.78)", accent: "#7ecdf1" },
  Épées: { from: "rgba(206, 216, 255, 0.9)", to: "rgba(112, 136, 232, 0.78)", accent: "#99a8ff" },
  Deniers: { from: "rgba(224, 243, 207, 0.9)", to: "rgba(136, 175, 98, 0.78)", accent: "#a7d27b" }
};

function getCardGradient(card: TarotCardData) {
  if (card.arcana === "major") {
    return suitGradients.Major;
  }
  return suitGradients[card.suit ?? "Bâtons"];
}

export default function TarotCard({ card, position, index, orientation }: TarotCardProps) {
  const gradient = getCardGradient(card);
  const isReversed = orientation === "reversed";

  return (
    <motion.div
      className="tarot-card-wrapper"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${position.rotation ?? 0}deg)`
      }}
      initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: index * 0.12, type: "spring", stiffness: 180, damping: 16 }}
    >
      <motion.div
        className={`tarot-card ${isReversed ? "is-reversed" : ""}`}
        initial={{ rotateY: 180, rotateZ: 0 }}
        animate={{ rotateY: 0, rotateZ: isReversed ? 180 : 0 }}
        transition={{ delay: index * 0.12 + 0.25, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <div
          className="tarot-card__face tarot-card__face--front"
          style={{
            background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
            boxShadow: `0 14px 28px rgba(0, 0, 0, 0.16), inset 0 0 0 1px rgba(255, 255, 255, 0.18)`
          }}
        >
          <div className="tarot-card__halo" />
          <div className="tarot-card__header">
            <span className="tarot-card__roman">{card.roman}</span>
            <span className="tarot-card__orientation">{isReversed ? "Renversée" : "Dressée"}</span>
          </div>
          <div className="tarot-card__name">{card.name}</div>
          <div className="tarot-card__keywords">
            {card.keywords.slice(0, 3).map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
          <p className="tarot-card__description">{card.description}</p>
          {card.suit && (
            <span className="tarot-card__suit" style={{ color: gradient.accent }}>
              {card.suit} · {card.element}
            </span>
          )}
          {card.arcana === "major" && <span className="tarot-card__suit">Arcane majeur</span>}
        </div>
        <div className="tarot-card__face tarot-card__face--back">
          <div className="tarot-card__pattern">
            <span className="tarot-card__sigil">✶</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="tarot-card__caption"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.12 + 0.6, duration: 0.4 }}
      >
        <strong>{position.label}</strong>
        <span>{position.hint}</span>
      </motion.div>
    </motion.div>
  );
}
