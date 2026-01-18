"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGameStore, Quest } from "@/stores/game-store";
import { CheckCircle2, PlayCircle, Zap } from "lucide-react";

interface QuestCardProps {
  quest: Quest;
  onComplete?: (questId: string) => void;
}

export function QuestCard({ quest, onComplete }: QuestCardProps) {
  const { completeQuest, startQuest, energy } = useGameStore();
  const canStart = quest.status === "pending" && energy >= quest.energyCost;
  const canComplete = quest.status === "in-progress";

  const handleStart = () => {
    if (canStart) {
      startQuest(quest.id);
    }
  };

  const handleComplete = () => {
    if (canComplete) {
      // Call the custom handler first (for toast notifications)
      if (onComplete) {
        onComplete(quest.id);
      }
      // Then complete the quest (this updates state and triggers animations)
      completeQuest(quest.id);
    }
  };

  return (
    <Card
      className={cn(
        "border transition-all",
        quest.status === "completed" && "border-emerald-500/30 bg-emerald-500/5",
        quest.status === "in-progress" && "border-cyan-500/30 bg-cyan-500/5",
        quest.status === "pending" && "border-border"
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="font-mono text-base">{quest.title}</CardTitle>
            <CardDescription className="mt-2 font-sans">
              {quest.description}
            </CardDescription>
          </div>
          {quest.status === "completed" && (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-cyan-400" />
            <span>Energy: -{quest.energyCost}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-purple-400">Willpower: +{quest.willpowerGain}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-emerald-400">Flow EXP: +{quest.flowExpGain}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {quest.status === "pending" && (
          <Button
            onClick={handleStart}
            disabled={!canStart}
            variant="outline"
            className="w-full font-mono"
          >
            <PlayCircle className="h-4 w-4" />
            Start Quest
          </Button>
        )}
        {quest.status === "in-progress" && (
          <Button
            onClick={handleComplete}
            className="w-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 font-mono border-emerald-500/50"
          >
            <CheckCircle2 className="h-4 w-4" />
            Complete Quest
          </Button>
        )}
        {quest.status === "completed" && (
          <div className="w-full text-center text-sm font-mono text-emerald-400">
            ✓ Completed
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
