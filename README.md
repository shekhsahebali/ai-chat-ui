# AI Chat Application

A modern, feature-rich AI chat application built with Next.js 16, React 19, and [assistant-ui](https://github.com/Yonom/assistant-ui). This application provides a clean interface for interacting with OpenAI-compatible APIs with support for multiple models, themes, and agent tools.

## Features

- 🤖 **Multi-Model Support** - Connect to any OpenAI-compatible API endpoint
- 🎨 **Theme Switching** - Light, dark, and system theme support
- 🛠️ **Agent Tools** - Built-in weather, calculator, and web search tools
- 🎤 **Speech-to-Text** - Voice input using Web Speech API
- 🧠 **Chain of Thought** - Visualize reasoning steps for compatible models
- ⚙️ **Configurable Settings** - All settings stored in browser localStorage
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🚀 **Edge Runtime** - Fast API responses using Vercel Edge Runtime

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm, npm, yarn, or bun package manager
- An OpenAI-compatible API endpoint and key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd aichat
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Configuration

On first launch, click the **Settings** icon (⚙️) in the header to configure:

- **API Endpoint**: Your OpenAI-compatible API endpoint (e.g., `https://api.openai.com/v1`)
- **API Key**: Your API authentication key
- **Default Model**: Preferred model to use (e.g., `gpt-4`, `claude-3-opus`)
- **Theme**: Choose between Light, Dark, or System theme

All settings are stored securely in your browser's localStorage and persist across sessions.

## Usage

### Starting a Chat

1. Configure your API settings (see Configuration above)
2. Select a model from the model dropdown
3. Type your message in the input box or use the microphone icon for voice input
4. Press Enter or click Send

### New Chat Session

Click the **New Chat** button in the sidebar to start a fresh conversation. Note: Messages are session-based and will be cleared on page reload.

### Using Agent Tools

The application includes three built-in tools that work with compatible models (GPT-4, Claude, Gemini):

- **Weather Tool**: Get current weather information for any location
- **Calculator**: Perform mathematical calculations
- **Web Search**: Search the web for information

Simply ask the AI to use these tools in your conversation.

### Voice Input

Click the microphone icon in the message input to use speech-to-text. The application uses the Web Speech API for voice recognition.

## Tech Stack

- **Framework**: Next.js 16.1.6 with Turbopack
- **UI Library**: React 19.2.4
- **AI Integration**: assistant-ui + Vercel AI SDK
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Theme**: next-themes
- **Icons**: Lucide React

## Project Structure

```
aichat/
├── app/
│   ├── api/
│   │   ├── chat/          # Chat API endpoint
│   │   └── models/        # Models list endpoint
│   ├── assistant.tsx      # Main chat component
│   └── page.tsx          # Home page
├── components/
│   ├── assistant-ui/     # Chat UI components
│   ├── tools/            # Agent tool UI components
│   ├── ui/               # shadcn/ui components
│   ├── model-selector.tsx
│   ├── settings-dialog.tsx
│   └── theme-toggle.tsx
├── lib/
│   ├── model-store.ts    # Model selection state
│   └── settings-store.ts # Settings state
└── hooks/
    └── use-chat-persistence.ts
```

## API Routes

### POST /api/chat

Handles chat completions with streaming support.

**Request Body:**
```json
{
  "messages": [...],
  "model": "gpt-4",
  "apiKey": "sk-...",
  "endpoint": "https://api.openai.com/v1"
}
```

### POST /api/models

Fetches available models from the configured endpoint.

**Request Body:**
```json
{
  "apiKey": "sk-...",
  "endpoint": "https://api.openai.com/v1"
}
```

## Development

### Building for Production

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

## Customization

### Adding New Tools

1. Define the tool in `app/api/chat/route.ts`:
```typescript
const backendTools = {
  yourTool: {
    description: "Tool description",
    inputSchema: z.object({
      param: z.string().describe("Parameter description"),
    }),
    execute: async ({ param }) => {
      // Tool implementation
      return { result: "..." };
    },
  },
};
```

2. Create a UI component in `components/tools/`:
```typescript
export const YourToolUI = makeAssistantToolUI({
  toolName: "yourTool",
  render: ({ result }) => <div>{result}</div>,
});
```

3. Add the tool UI to `app/assistant.tsx`

### Changing Default Settings

Edit `lib/settings-store.ts` to change default values:
```typescript
defaultModel: 'your-preferred-model',
```

## License

MIT

## Acknowledgments

- Built with [assistant-ui](https://github.com/Yonom/assistant-ui)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by [Vercel AI SDK](https://sdk.vercel.ai/)
