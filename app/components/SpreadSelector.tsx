"use client";

import { motion } from "framer-motion";
import type { SpreadDefinition } from "../lib/spreads";

interface SpreadSelectorProps {
  spreads: SpreadDefinition[];
  activeId: SpreadDefinition["id"];
  onSelect: (id: SpreadDefinition["id"]) => void;
}

export default function SpreadSelector({ spreads, activeId, onSelect }: SpreadSelectorProps) {
  return (
    <div className="spread-selector">
      {spreads.map((spread, index) => {
        const isActive = spread.id === activeId;
        return (
          <motion.button
            key={spread.id}
            onClick={() => onSelect(spread.id)}
            className={`spread-selector__item ${isActive ? "is-active" : ""}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, type: "spring", stiffness: 260, damping: 22 }}
          >
            <span className="spread-selector__title">{spread.name}</span>
            <span className="spread-selector__description">{spread.description}</span>
            {isActive && <motion.span layoutId="spread-active" className="spread-selector__glow" />}
          </motion.button>
        );
      })}
    </div>
  );
}
