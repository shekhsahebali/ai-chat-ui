import { ChainOfThoughtPrimitive } from "@assistant-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { Reasoning } from "./reasoning";
import { ToolFallback } from "./tool-fallback";
import type { FC } from "react";

export const ChainOfThought: FC = () => {
  return (
    <ChainOfThoughtPrimitive.Root className="my-2">
      <ChainOfThoughtPrimitive.AccordionTrigger className="flex w-full items-center gap-2 rounded-lg border bg-muted/50 px-4 py-2 text-left text-sm font-medium transition-colors hover:bg-muted">
        <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
        <span>View reasoning steps</span>
      </ChainOfThoughtPrimitive.AccordionTrigger>
      <div className="mt-2 space-y-2 rounded-lg border bg-muted/30 p-4">
        <ChainOfThoughtPrimitive.Parts
          components={{
            Reasoning,
            tools: { Fallback: ToolFallback },
          }}
        />
      </div>
    </ChainOfThoughtPrimitive.Root>
  );
};
