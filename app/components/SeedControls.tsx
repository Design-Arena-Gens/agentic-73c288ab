"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SeedControlsProps {
  seed: string;
  onSeedChange: (seed: string) => void;
}

const randomSeed = () => Math.random().toString(36).slice(2, 10);

export default function SeedControls({ seed, onSeedChange }: SeedControlsProps) {
  const [localSeed, setLocalSeed] = useState(seed);

  const handleBlur = () => {
    if (!localSeed.trim()) {
      const generated = randomSeed();
      setLocalSeed(generated);
      onSeedChange(generated);
      return;
    }
    onSeedChange(localSeed.trim());
  };

  const applyRandomSeed = () => {
    const generated = randomSeed();
    setLocalSeed(generated);
    onSeedChange(generated);
  };

  return (
    <div className="seed-controls">
      <label className="seed-controls__label" htmlFor="seed-input">
        Graine de tirage
      </label>
      <div className="seed-controls__field">
        <input
          id="seed-input"
          value={localSeed}
          onChange={(e) => setLocalSeed(e.target.value)}
          onBlur={handleBlur}
          placeholder="ex: equinoxe"
          spellCheck={false}
        />
        <motion.button
          type="button"
          onClick={applyRandomSeed}
          whileTap={{ scale: 0.96 }}
          className="seed-controls__random"
        >
          Aléatoire
        </motion.button>
      </div>
      <p className="seed-controls__hint">
        Utilisez une graine (seed) pour rejouer exactement un tirage ou partager une session avec un proche.
      </p>
    </div>
  );
}
