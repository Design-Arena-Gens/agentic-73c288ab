"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SpreadDefinition, SpreadPosition } from "../lib/spreads";
import type { TarotCardData, TarotOrientation } from "../lib/tarot";
import TarotCard from "./TarotCard";

export interface DrawnCard {
  card: TarotCardData;
  orientation: TarotOrientation;
  position: SpreadPosition;
}

interface TarotBoardProps {
  spread: SpreadDefinition;
  cards: DrawnCard[];
}

export default function TarotBoard({ spread, cards }: TarotBoardProps) {
  return (
    <div className="tarot-board">
      <div className="tarot-board__aura" />
      <div className="tarot-board__grid">
        <AnimatePresence>
          {cards.map((item, index) => (
            <TarotCard
              key={item.position.id}
              card={item.card}
              position={item.position}
              orientation={item.orientation}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        className="tarot-board__legend"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      >
        <h3>{spread.name}</h3>
        <p>{spread.description}</p>
      </motion.div>
    </div>
  );
}
