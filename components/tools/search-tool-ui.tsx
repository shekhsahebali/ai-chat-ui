"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { Search, ExternalLink } from "lucide-react";

type SearchArgs = {
  query: string;
};

type SearchResult = {
  query: string;
  results: Array<{
    title: string;
    snippet: string;
  }>;
};

export const SearchToolUI = makeAssistantToolUI<SearchArgs, SearchResult>({
  toolName: "searchWeb",
  render: ({ args, result }) => {
    if (!result) {
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4 animate-pulse" />
          Searching for "{args.query}"...
        </div>
      );
    }

    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Search className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Search Results for "{result.query}"</h3>
        </div>
        <div className="space-y-3">
          {result.results.map((item, index) => (
            <div key={index} className="border-l-2 border-primary/20 pl-3">
              <div className="flex items-start gap-2">
                <h4 className="font-medium text-sm flex-1">{item.title}</h4>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{item.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
