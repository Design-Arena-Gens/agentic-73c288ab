"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./components/ThemeToggle";
import SpreadSelector from "./components/SpreadSelector";
import TarotBoard, { DrawnCard } from "./components/TarotBoard";
import SeedControls from "./components/SeedControls";
import { SPREADS } from "./lib/spreads";
import { TAROT_CARDS } from "./lib/tarot";
import { createSeededRng, randomOrientation, shuffleWithSeed } from "./lib/random";

const defaultSeed = () => Math.random().toString(36).slice(2, 10);

export default function HomePage() {
  const [seed, setSeed] = useState(() => defaultSeed());
  const [activeSpreadId, setActiveSpreadId] = useState<(typeof SPREADS)[number]["id"]>("single");
  const [cards, setCards] = useState<DrawnCard[]>([]);

  const activeSpread = useMemo(() => SPREADS.find((spread) => spread.id === activeSpreadId) ?? SPREADS[0], [activeSpreadId]);

  useEffect(() => {
    performDraw(activeSpreadId, seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSpreadId, seed]);

  const performDraw = (spreadId: (typeof SPREADS)[number]["id"], currentSeed: string) => {
    const spread = SPREADS.find((item) => item.id === spreadId) ?? SPREADS[0];
    const baseSeed = `${currentSeed}-${spread.id}`;
    const deck = shuffleWithSeed(TAROT_CARDS, baseSeed);
    const orientationRng = createSeededRng(`${baseSeed}-orientation`);

    const drawn = spread.cards.map((position, index) => ({
      card: deck[index],
      orientation: randomOrientation(orientationRng),
      position
    }));

    setCards(drawn);
  };

  return (
    <main className="page">
      <div className="light-mist" />
      <header className="page__header">
        <div className="page__branding">
          <motion.span
            className="page__eyebrow"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Tarot de Marseille immersif
          </motion.span>
          <motion.h1
            className="page__title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          >
            Sentez, tirez, vibrez.
          </motion.h1>
          <motion.p
            className="page__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Un espace délicat pour explorer le Tarot de Marseille avec élégance, en mode clair ou nocturne, et une graine de tirage pour revivre vos tirages à l’identique.
          </motion.p>
        </div>
        <ThemeToggle />
      </header>

      <section className="page__controls">
        <SpreadSelector spreads={SPREADS} activeId={activeSpreadId} onSelect={(id) => setActiveSpreadId(id)} />
        <div className="page__actions">
          <SeedControls seed={seed} onSeedChange={setSeed} />
          <motion.button
            type="button"
            className="page__draw-button"
            onClick={() => performDraw(activeSpreadId, seed)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Procéder au tirage
          </motion.button>
        </div>
      </section>

      <section className="page__board">
        <TarotBoard spread={activeSpread} cards={cards} />
        <aside className="ai-module" aria-live="polite">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Interprétation augmentée (bientôt)
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Ce module accueillera prochainement une IA dédiée à l’interprétation personnalisée de vos tirages. Conservez vos graines pour revisiter vos tirages quand l’oracle conversera avec vous.
          </motion.p>
          <motion.div
            className="ai-module__placeholder"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <span>Connexion à l’astral en préparation...</span>
          </motion.div>
        </aside>
      </section>

      <footer className="page__footer">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Semblance & Co · Tarot de Marseille · {new Date().getFullYear()}
        </motion.span>
      </footer>
    </main>
  );
}
