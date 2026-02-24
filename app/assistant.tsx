"use client";

import { AssistantRuntimeProvider, WebSpeechDictationAdapter, WebSpeechSynthesisAdapter } from "@assistant-ui/react";
import {
  useChatRuntime,
  AssistantChatTransport,
} from "@assistant-ui/react-ai-sdk";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { Thread } from "@/components/assistant-ui/thread";
import { useModelStore } from "@/lib/model-store";
import { useSettingsStore } from "@/lib/settings-store";
import { WeatherToolUI } from "@/components/tools/weather-tool-ui";
import { CalculatorToolUI } from "@/components/tools/calculator-tool-ui";
import { SearchToolUI } from "@/components/tools/search-tool-ui";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThreadListSidebar } from "@/components/assistant-ui/threadlist-sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { ModelSelector } from "@/components/model-selector";
import { SettingsDialog } from "@/components/settings-dialog";

export const Assistant = () => {
  const { selectedModel } = useModelStore();
  const { apiKey, endpoint } = useSettingsStore();

  const runtime = useChatRuntime({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    transport: new AssistantChatTransport({
      api: "/api/chat",
      body: {
        model: selectedModel,
        apiKey: apiKey,
        endpoint: endpoint,
      },
    }),
    adapters: {
      speech: new WebSpeechSynthesisAdapter(),
      dictation: WebSpeechDictationAdapter.isSupported()
        ? new WebSpeechDictationAdapter({
            continuous: true,
            interimResults: true,
          })
        : undefined,
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <WeatherToolUI />
      <CalculatorToolUI />
      <SearchToolUI />
      <SidebarProvider>
        <div className="flex h-dvh w-full pr-0.5">
          <ThreadListSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <ModelSelector />
              <div className="ml-auto flex items-center gap-2">
                <SettingsDialog />
                <ThemeToggle />
              </div>
            </header>
            <div className="flex-1 overflow-hidden">
              <Thread />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
};
