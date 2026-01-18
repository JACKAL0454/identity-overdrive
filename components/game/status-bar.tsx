"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/game-store";
import { useEffect, useState } from "react";

interface StatusBarProps {
  label: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
}

export function StatusBar({ label, value, color, icon }: StatusBarProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      const diff = value - displayValue;
      const steps = 20;
      const stepSize = diff / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        setDisplayValue((prev) => {
          const newValue = prev + stepSize;
          if (currentStep >= steps) {
            setIsAnimating(false);
            return value;
          }
          return newValue;
        });
      }, 16); // ~60fps

      return () => clearInterval(interval);
    }
  }, [value, displayValue]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-muted-foreground">{label}</span>
        </div>
        <span className={cn("font-semibold", color)}>
          {Math.round(displayValue)}%
        </span>
      </div>
      <Progress
        value={displayValue}
        className={cn(
          "h-2 transition-all duration-500",
          isAnimating && "animate-pulse"
        )}
      />
    </div>
  );
}

export function StatusBars() {
  const { energy, willpower } = useGameStore();

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatusBar
        label="ENERGY"
        value={energy}
        color="text-cyan-400"
        icon={
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        }
      />
      <StatusBar
        label="WILLPOWER"
        value={willpower}
        color="text-purple-400"
        icon={
          <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
        }
      />
    </div>
  );
}
