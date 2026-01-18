"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGameStore } from "@/stores/game-store";
import { Shield } from "lucide-react";

export function GlobalProtocol() {
  const { globalProtocol, protocolDate } = useGameStore();
  const isToday = new Date().toDateString() === protocolDate;

  return (
    <Card className="border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-full bg-cyan-500/20 p-2">
            <Shield className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
                GLOBAL PROTOCOL
              </h3>
              {!isToday && (
                <span className="text-xs text-muted-foreground">
                  (Updated: {protocolDate})
                </span>
              )}
            </div>
            <p className="font-mono text-sm leading-relaxed text-foreground">
              {globalProtocol}
            </p>
            <p className="text-xs text-muted-foreground">
              Maintain this constraint throughout all quests today.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
