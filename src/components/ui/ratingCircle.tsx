"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PercentageCircleProps {
  percentage: number | string;
  isBlur?: boolean;
  size?: number;
  className?: string;
}

export default function PercentageCircle({
  percentage,
  isBlur = false,
  size = 100,
  className,
}: PercentageCircleProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const percentageNumber = Number(percentage);
  if (isNaN(percentageNumber)) {
    return null;
  }
  const normalizedPercentage = Math.min(Math.max(percentageNumber, 0), 100);

  // Calculate circle properties
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = size * 0.08;
  const center = size / 2;

  const strokeDashoffset =
    circumference - (normalizedPercentage / 100) * circumference;

  const getColor = () => {
    if (isBlur) return "hsl(var(--muted-foreground))"; // Neutral color when blurred
    if (normalizedPercentage < 30) return "#ef4444"; // Red
    if (normalizedPercentage < 70) return "#f59e0b"; // Amber
    return "#22c55e"; // Green
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayPercentage(normalizedPercentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [normalizedPercentage]);

  return (
    <>
      {isBlur ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn(
                  "relative inline-flex items-center justify-center",
                  isBlur && "filter blur-md pointer-events-none select-none",
                  className
                )}
                style={{ width: size, height: size }}
              >
                <svg width={size} height={size} className="absolute">
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke="hsl(var(--muted))"
                    strokeWidth={strokeWidth}
                  />
                </svg>

                <svg width={size} height={size} className="absolute -rotate-90">
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="text-center z-10">
                  <span className="font-bold" style={{ fontSize: size * 0.25 }}>
                    {isBlur ? "?" : `${Math.round(displayPercentage)}%`}
                  </span>
                </div>

                {isBlur && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="bg-background/80 rounded-full p-2 shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={size * 0.3}
                        height={size * 0.3}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <rect
                          width="18"
                          height="11"
                          x="3"
                          y="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Purchase a Pro plan to unlock this feature.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div
          className={cn(
            "relative inline-flex items-center justify-center",
            isBlur && "filter blur-md pointer-events-none select-none",
            className
          )}
          style={{ width: size, height: size }}
        >
          <svg width={size} height={size} className="absolute">
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="hsl(var(--muted))"
              strokeWidth={strokeWidth}
            />
          </svg>

          <svg width={size} height={size} className="absolute -rotate-90">
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={getColor()}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="text-center z-10">
            <span className="font-bold" style={{ fontSize: size * 0.25 }}>
              {isBlur ? "?" : `${Math.round(displayPercentage)}%`}
            </span>
          </div>

          {isBlur && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="bg-background/80 rounded-full p-2 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={size * 0.3}
                  height={size * 0.3}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
