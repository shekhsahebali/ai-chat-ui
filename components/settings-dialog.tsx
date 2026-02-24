"use client";

import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { useSettingsStore } from "@/lib/settings-store";

export function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { apiKey, endpoint, defaultModel, setApiKey, setEndpoint, setDefaultModel } = useSettingsStore();

  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localEndpoint, setLocalEndpoint] = useState(endpoint);
  const [localDefaultModel, setLocalDefaultModel] = useState(defaultModel);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setLocalApiKey(apiKey);
      setLocalEndpoint(endpoint);
      setLocalDefaultModel(defaultModel);
    }
  }, [open, apiKey, endpoint, defaultModel]);

  const handleSave = () => {
    setApiKey(localApiKey);
    setEndpoint(localEndpoint);
    setDefaultModel(localDefaultModel);
    setOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your AI chat preferences
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* API Endpoint */}
          <div className="grid gap-2">
            <Label htmlFor="endpoint">API Endpoint</Label>
            <Input
              id="endpoint"
              placeholder="https://api.example.com/v1"
              value={localEndpoint}
              onChange={(e) => setLocalEndpoint(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              OpenAI-compatible API endpoint
            </p>
          </div>

          {/* API Key */}
          <div className="grid gap-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Your API key for authentication
            </p>
          </div>

          {/* Default Model */}
          <div className="grid gap-2">
            <Label htmlFor="defaultModel">Default Model</Label>
            <Input
              id="defaultModel"
              placeholder="gpt-4"
              value={localDefaultModel}
              onChange={(e) => setLocalDefaultModel(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Model to use by default (e.g., gpt-4, claude-3-opus)
            </p>
          </div>

          {/* Theme */}
          <div className="grid gap-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose your preferred color theme
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
