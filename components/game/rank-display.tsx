"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/game-store";
import { Trophy } from "lucide-react";

export function RankDisplay() {
  const { currentTitle, flowExp, titleProgress } = useGameStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-400" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Rank
          </span>
        </div>
        <span className="font-mono text-sm font-semibold text-amber-400">
          {currentTitle}
        </span>
      </div>
      <div className="space-y-1">
        <Progress
          value={titleProgress}
          className="h-1.5 bg-amber-500/20 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-amber-600"
        />
        <div className="flex justify-between text-xs font-mono text-muted-foreground">
          <span>Flow EXP: {Math.round(flowExp)}%</span>
          <span>Next Rank: {100 - Math.round(flowExp)}%</span>
        </div>
      </div>
    </div>
  );
}
