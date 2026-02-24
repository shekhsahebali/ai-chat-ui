"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { Calculator } from "lucide-react";

type CalculateArgs = {
  expression: string;
};

type CalculateResult = {
  expression: string;
  result?: number;
  error?: string;
};

export const CalculatorToolUI = makeAssistantToolUI<CalculateArgs, CalculateResult>({
  toolName: "calculate",
  render: ({ args, result }) => {
    if (!result) {
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calculator className="h-4 w-4" />
          Calculating {args.expression}...
        </div>
      );
    }

    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <Calculator className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <div className="font-mono text-sm text-muted-foreground">
              {result.expression}
            </div>
            {result.error ? (
              <div className="text-destructive font-semibold mt-1">
                Error: {result.error}
              </div>
            ) : (
              <div className="text-2xl font-bold mt-1">
                = {result.result}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
});
