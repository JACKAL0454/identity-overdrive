"use client";

import { useGameStore } from "@/stores/game-store";
import { useToast } from "@/components/ui/toast";
import { GlobalProtocol } from "./global-protocol";
import { StatusBars } from "./status-bar";
import { QuestCard } from "./quest-card";
import { RankDisplay } from "./rank-display";
import { useEffect, useRef } from "react";

const GIFT_FEEDBACK_MESSAGES = [
  "Task Interference Prevented. Synaptic Bonds Strengthened.",
  "Neural Pathways Optimized. Cognitive Load Reduced.",
  "Reward Signal Amplified. Intrinsic Motivation Enhanced.",
  "Constraint Satisfaction Achieved. Global Protocol Maintained.",
  "Learning Efficiency Maximized. Flow State Activated.",
  "Task Completion Registered. Neural Plasticity Increased.",
];

export function GameScreen() {
  const { quests, currentTitle, flowExp } = useGameStore();
  const { addToast } = useToast();
  const prevTitleRef = useRef(currentTitle);
  const prevFlowExpRef = useRef(flowExp);

  // Check for title changes
  useEffect(() => {
    if (prevTitleRef.current !== currentTitle) {
      addToast(
        `Title Upgraded: ${currentTitle}`,
        "success",
        4000
      );
      prevTitleRef.current = currentTitle;
    }
  }, [currentTitle, addToast]);

  // Enhanced quest completion handler
  const handleQuestComplete = (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest || quest.status !== "in-progress") return;

    // Show GIFT-themed feedback
    const randomMessage =
      GIFT_FEEDBACK_MESSAGES[
        Math.floor(Math.random() * GIFT_FEEDBACK_MESSAGES.length)
      ];
    addToast(randomMessage, "success", 4000);

    // Complete the quest (this will trigger state updates and animations)
    // The actual completion is handled in QuestCard, but we show the toast here
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Status Bars */}
        <div className="space-y-4">
          <StatusBars />
          <RankDisplay />
        </div>

        {/* Global Protocol */}
        <GlobalProtocol />

        {/* Quests */}
        <div className="space-y-4">
          <h2 className="font-mono text-lg font-semibold uppercase tracking-wider text-foreground">
            Active Quests
          </h2>
          <div className="space-y-3">
            {quests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onComplete={handleQuestComplete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
