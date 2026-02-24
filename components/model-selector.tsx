"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useModelStore } from "@/lib/model-store";
import { useSettingsStore } from "@/lib/settings-store";

interface Model {
  id: string;
  name: string;
}

export function ModelSelector() {
  const [open, setOpen] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { selectedModel, setSelectedModel } = useModelStore();
  const { apiKey, endpoint } = useSettingsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchModels() {
      if (!apiKey || !endpoint) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/models", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKey, endpoint }),
        });
        const data = await response.json();

        if (data.data) {
          const modelList = data.data.map((model: any) => ({
            id: model.id,
            name: model.id,
          }));
          setModels(modelList);
          if (modelList.length > 0 && !selectedModel) {
            setSelectedModel(modelList[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch models:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, [apiKey, endpoint]);

  if (!mounted) {
    return (
      <Button variant="outline" className="w-50 justify-between" disabled>
        Loading...
      </Button>
    );
  }

  if (!apiKey || !endpoint) {
    return (
      <Button variant="outline" className="w-50 justify-between" disabled>
        Configure Settings
      </Button>
    );
  }

  const selectedModelName = models.find((m) => m.id === selectedModel)?.name || "Select model";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-50 justify-between"
        >
          {loading ? "Loading..." : selectedModelName}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder="Search model..." />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.id}
                  onSelect={(currentValue) => {
                    setSelectedModel(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedModel === model.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {model.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
