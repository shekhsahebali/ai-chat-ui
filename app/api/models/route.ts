import { NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { apiKey, endpoint }: { apiKey?: string; endpoint?: string } = await req.json();

    if (!apiKey || !endpoint) {
      return NextResponse.json(
        { error: "API key and endpoint are required. Please configure them in Settings." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${endpoint}/models`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch models");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    );
  }
}
