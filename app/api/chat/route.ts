import { createOpenAI } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { z } from "zod";

export const runtime = "edge";

const backendTools = {
  getWeather: {
    description: "Get the current weather for a location",
    inputSchema: z.object({
      location: z.string().describe("The city and country, e.g. San Francisco, CA"),
    }),
    execute: async ({ location }: { location: string }) => {
      return {
        location,
        temperature: 72,
        condition: "Sunny",
        humidity: 65,
      };
    },
  },

  calculate: {
    description: "Perform mathematical calculations",
    inputSchema: z.object({
      expression: z.string().describe("The mathematical expression to evaluate"),
    }),
    execute: async ({ expression }: { expression: string }) => {
      try {
        
        const result = Function(`"use strict"; return (${expression})`)();
        return { expression, result };
      } catch (error) {
        return { expression, error: "Invalid expression" };
      }
    },
  },

  searchWeb: {
    description: "Search the web for information",
    inputSchema: z.object({
      query: z.string().describe("The search query"),
    }),
    execute: async ({ query }: { query: string }) => {
      return {
        query,
        results: [
          { title: "Result 1", snippet: "Sample result for " + query },
          { title: "Result 2", snippet: "Another result for " + query },
        ],
      };
    },
  },
};

export async function POST(req: Request) {
  try {
    const {
      messages,
      system,
      tools,
      model,
      apiKey,
      endpoint,
    }: {
      messages: UIMessage[];
      system?: string;
      tools?: Record<string, any>;
      model?: string;
      apiKey?: string;
      endpoint?: string;
    } = await req.json();

    if (!apiKey || !endpoint) {
      return new Response(
        JSON.stringify({ error: "API key and endpoint are required. Please configure them in Settings." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const openai = createOpenAI({
      baseURL: endpoint,
      apiKey: apiKey,
    });

    const convertedMessages = await convertToModelMessages(messages);
    const selectedModel = model || "if/deepseek-r1";

    const toolSupportedModels = ["gpt-4", "gpt-3.5", "claude", "gemini"];
    const supportsTools = toolSupportedModels.some(m => selectedModel.includes(m));

    const result = streamText({
      model: openai.chat(selectedModel),
      messages: convertedMessages,
      system,
      ...(supportsTools && {
        tools: {
          ...backendTools,
          ...frontendTools(tools ?? {}),
        },
      }),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
